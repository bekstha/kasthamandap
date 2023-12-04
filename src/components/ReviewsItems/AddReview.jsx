import { Button, ConfigProvider, Modal, Rate, Tooltip, message } from "antd";
import { useContext, useState } from "react";
import {
  LanguageDetector,
  TextClassifier,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0";
import { InputLabel, Textarea } from "../ui/Input";
import ButtonGroup from "../ui/ButtonGroup";
import InfoIcon from "@mui/icons-material/Info";
import RateReviewIcon from "@mui/icons-material/RateReview";
import useReviews from "../../hooks/useReviews";
import { MainContext } from "../../context/MainContext";
import CustomButton from "../ui/CustomButton";

const AddReview = ({ displayName, userId, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [positiveScore, setPositiveScore] = useState(null);
  const [manualRating, setManualRating] = useState(0);
  const { addReview } = useReviews();

  const resetForm = () => {
    setManualRating(0);
    setReview("");
  };

  const showModal = () => setIsOpen(true);
  const hideModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const { textClassifier, languageDetector } = useContext(MainContext);

  const isSubmitDisabled = () => {
    return !(review.trim() !== "" && manualRating > 0 && manualRating <= 5);
  };

  // Update the manual rating when the user changes it manually
  const handleManualRatingChange = (value) => {
    setManualRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleClassifyClick = async () => {
    if (review === "") {
      message.warning("Please fill the review section.");
      return;
    }
    if (!textClassifier || !languageDetector) {
      // console.error("Text classifier or language detector is not initialized");
      return;
    }
    try {
      // Using the language detector to detect the language of the review
      const languageResult = await languageDetector.detect(review);
      const detectedLanguage =
        languageResult.languages && languageResult.languages[0]?.languageCode;

      console.log("Detected Language:", detectedLanguage);
      const result = await textClassifier.classify(review, {
        displayNamesLocale: detectedLanguage,
      });

      // Find the category with the name "positive"
      const positiveCategory = result.classifications[0].categories.find(
        (category) => category.categoryName === "positive"
      );

      if (positiveCategory) {
        const rawScore = positiveCategory.score.toFixed(2);
        const outOfFive = (parseFloat(rawScore) * 5) / 1.0; // Convert to a scale out of 5
        const roundedScore = Math.round(outOfFive * 2) / 2; // Round to the nearest 0.5
        setPositiveScore(roundedScore);
        setManualRating(roundedScore);
        console.log(roundedScore);
      } else {
        console.error("Positive category not found");
      }
    } catch (error) {
      console.error("Error during classification:", { error });
    }
  };

  const handleSubmit = async () => {
    if (review.trim() === "" || !(manualRating > 0 && manualRating <= 5)) {
      message.warning(
        "Please fill the review section and provide a valid rating."
      );
      return;
    }

    try {
      await addReview(
        userId,
        userEmail,
        review,
        displayName,
        manualRating,
        new Date()
      );
      hideModal();
      setManualRating(0);
      setReview("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  return (
    <>
      <Tooltip title="Add a review" placement="top">
        <button
          className="!w-12 h-12 font-orange bg-orange-500 text-white rounded-full"
          onClick={showModal}
        >
          {" "}
          <RateReviewIcon />{" "}
        </button>
      </Tooltip>

      <Modal
        open={isOpen}
        onOk={hideModal}
        onCancel={hideModal}
        width={350}
        footer={() => (
          <ButtonGroup className="flex-col md:flex-row mt-10">
            <Button
              outlined="true"
              className="flex-1 mt-6 md:mt-0 md:mr-2"
              onClick={handleClassifyClick}
              style={{
                "&:hover": {
                  color: "#c91212",
                },
              }}
            >
              Auto rate
            </Button>

            <Button
              className={`flex-1 ${
                isSubmitDisabled()
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
              onClick={handleSubmit}
              disabled={isSubmitDisabled()}
            >
              Submit Review
            </Button>
          </ButtonGroup>
        )}
      >
        <div className="mb-2 flex flex-col justify-center items-center gap-5">
          <InputLabel label="Write a Review" />

          <div className="flex justify-center items-center gap-3">
            <Rate
              allowHalf
              value={manualRating}
              onChange={handleManualRatingChange}
            />{" "}
            <Tooltip
              title="You can either manually set a rating or use our AI model below to generate a rating based on your review."
              placement="bottom"
            >
              <InfoIcon className="hover:cursor-pointer" />
            </Tooltip>
          </div>

          <Textarea value={review} onChange={handleReviewChange} />
        </div>
      </Modal>
    </>
  );
};

export default AddReview;
