import { Modal, Rate, Tooltip, message } from "antd";
import { useContext, useState } from "react";
import { InputLabel, Textarea } from "../ui/Input";
import ButtonGroup from "../ui/ButtonGroup";
import InfoIcon from "@mui/icons-material/Info";
import RateReviewIcon from "@mui/icons-material/RateReview";
import useReviews from "../../hooks/useReviews";
import { MainContext } from "../../context/MainContext";
import iso6391 from "iso-639-1";
import Button from "../ui/Button";

const AddReview = ({ displayName, userId, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [positiveScore, setPositiveScore] = useState(null);
  const [manualRating, setManualRating] = useState(0);
  const { addReview } = useReviews();
  const [detectedLanguage, setDetectedLanguage] = useState(null);

  const resetForm = () => {
    setManualRating(0);
    setReview("");
    setDetectedLanguage(null);
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
    const newReview = event.target.value;

    // Reset detected language if the review is empty
    if (newReview.trim() === "") {
      setDetectedLanguage(null);
      setManualRating(null);
    }

    setReview(newReview);
  };

  const handleClassifyClick = async () => {
    if (review === "") {
      message.warning("Please fill the review section.");
      return;
    }
    if (!textClassifier || !languageDetector) {
      return;
    }
    try {
      // Using the language detector to detect the language of the review
      const languageResult = await languageDetector.detect(review);
      const detectedLanguage =
        languageResult.languages && languageResult.languages[0]?.languageCode;

      if (detectedLanguage) {
        const languageName = iso6391.getName(detectedLanguage);
        setDetectedLanguage(languageName);
      }
      const result = await textClassifier.classify(review, {
        displayNamesLocale: detectedLanguage,
      });

      // Find the category with the name "positive"
      const positiveCategory = result.classifications[0].categories.find(
        (category) => category.categoryName === "positive"
      );

      if (positiveCategory) {
        const rawScore = positiveCategory.score.toFixed(2);
        const outOfFive = (parseFloat(rawScore) * 5) / 1.0;
        const roundedScore = Math.round(outOfFive * 2) / 2;
        setPositiveScore(roundedScore);
        setManualRating(positiveScore);
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
      message.success("Review successfully added!");
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
          <ButtonGroup className="flex-col md:flex-row">
            <Button
              size="small"
              outlined
              color="gray"
              className="flex-1 md:mr-2 !text-black border-black"
              onClick={handleClassifyClick}
              hover="green"
            >
              Auto Rate
            </Button>

            <Button
              size="small"
              outlined
              color="gray"
              hover="green"
              className="flex-1 !text-black border-gray-600"
              onClick={handleSubmit}
              disabled={isSubmitDisabled()}
            >
              Submit Review
            </Button>
          </ButtonGroup>
        )}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <InputLabel label="Write a Review" />

          <div className="flex justify-center items-center gap-3">
            <Rate
              allowHalf
              value={manualRating}
              onChange={handleManualRatingChange}
            />{" "}
            <Tooltip
              title="You have the choice to set a rating manually or use our AI model below for a quick suggestion. Keep in mind that the AI-generated rating may not capture all nuances. Feel free to rearrange the rating based on your true evaluation, even after using the AI model."
              placement="bottom"
            >
              <InfoIcon className="hover:cursor-pointer" />
            </Tooltip>
          </div>

          <Textarea value={review} onChange={handleReviewChange} />

          <div className="h-5">
            {detectedLanguage && (
              <p className="h-full text-sm text-gray-500 p-0 m-0">
                Detected Language: {detectedLanguage}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddReview;
