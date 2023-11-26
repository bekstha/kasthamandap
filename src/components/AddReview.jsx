import { Modal, Rate, Tooltip, message } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  LanguageDetector,
  TextClassifier,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0";
import { InputLabel, Textarea } from "./ui/Input";
import ButtonGroup from "./ui/ButtonGroup";
import Button from "./ui/Button";
import InfoIcon from "@mui/icons-material/Info";
import RateReviewIcon from "@mui/icons-material/RateReview";
import useReviews from "../hooks/useReviews";
import { MainContext } from "../context/MainContext";

const AddReview = ({ displayName, userId, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [positiveScore, setPositiveScore] = useState(null);
  const [manualRating, setManualRating] = useState(0);
  const { addReview } = useReviews();

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

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
      alert("Please fill the review section.");
      return;
    }
    if (!textClassifier || !languageDetector) {
      // Handle the case where textClassifier or languageDetector is not initialized yet
      console.error("Text classifier or language detector is not initialized");
      return;
    }
    try {
      // Use the language detector to detect the language of the review
      const languageResult = await languageDetector.detect(review);
      const detectedLanguage =
        languageResult.languages && languageResult.languages[0]?.languageCode;

      console.log("Detected Language:", detectedLanguage);
      const result = await textClassifier.classify(review, {
        displayNamesLocale: detectedLanguage,
      });

      console.log("Detected result:", result.classifications[0].categories);

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
      message.warning("Please fill the review section and provide a valid rating.");
      return;
    }

    try {
      // Use the addReview function from the useReviews hook
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
          <ButtonGroup className="!mt-6">
            <Button className="flex-1" onClick={handleClassifyClick}>
              Auto rate
            </Button>
            <Button
              className={`flex-1 ${
                isSubmitDisabled()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
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
              value={manualRating} // Set the manual rating as the initial value
              onChange={handleManualRatingChange} // Handle manual rating changes
            />{" "}
            <Tooltip title="You can either manually set a rating or use our AI model below to generate a rating based on your review.">
              <InfoIcon className="hover:cursor-pointer" />
            </Tooltip>
          </div>

          <Textarea value={review} onChange={handleReviewChange} />
        </div>

        {/* <div>{positiveScore !== null && <Rate value={positiveScore} />}</div> */}
      </Modal>
    </>
  );
};

export default AddReview;
