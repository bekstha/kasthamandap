import { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import useReviews from "../../hooks/useReviews";
import { Modal, Rate, Tooltip, message } from "antd";
import ButtonGroup from "../ui/ButtonGroup";
import Button from "../ui/Button";
import { InputLabel, Textarea } from "../ui/Input";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";

const EditReview = ({ oldReview, oldRating, reviewId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedReview, setReview] = useState(oldReview);
  const [updatedPositiveScore, setPositiveScore] = useState(oldRating);
  const [updatedRating, setManualRating] = useState(oldRating);
  const { updateReview } = useReviews();

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  const { textClassifier, languageDetector } = useContext(MainContext);

  const isSubmitDisabled = () => {
    return !(updatedReview !== "" && updatedRating > 0 && updatedRating <= 5);
  };

  // Update the manual rating when the user changes it manually
  const handleManualRatingChange = (value) => {
    setManualRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleClassifyClick = async () => {
    if (updatedReview === "") {
      message.warning("Please fill the review section.");
      return;
    }
    if (!textClassifier || !languageDetector) {
      // Handle the case where textClassifier or languageDetector is not initialized yet
      console.error("Text classifier or language detector is not initialized");
      return;
    }
    try {
      // Use the language detector to detect the language of the review
      const languageResult = await languageDetector.detect(updatedReview);
      const detectedLanguage =
        languageResult.languages && languageResult.languages[0]?.languageCode;
      const result = await textClassifier.classify(updatedReview, {
        displayNamesLocale: detectedLanguage,
      });

      const positiveCategory = result.classifications[0].categories.find(
        (category) => category.categoryName === "positive"
      );

      if (positiveCategory) {
        const rawScore = positiveCategory.score.toFixed(2);
        const outOfFive = (parseFloat(rawScore) * 5) / 1.0; // Convert to a scale out of 5
        const roundedScore = Math.round(outOfFive * 2) / 2; // Round to the nearest 0.5
        setPositiveScore(roundedScore);
        setManualRating(roundedScore);
      } else {
        console.error("Positive category not found");
      }
    } catch (error) {
      console.error("Error during classification:", { error });
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        updatedReview.trim() === "" ||
        !(updatedRating > 0 && updatedRating <= 5)
      ) {
        message.warning(
          "Please fill the review section and provide a valid rating."
        );
        return;
      }

      // Prepare the updated data
      const newData = {
        review: updatedReview,
        rating: updatedRating,
      };

      // Call the updateReview function
      await updateReview(reviewId, newData);
      message.success("Review updated successfully!");
      hideModal();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <>
      <Tooltip title="Edit review" placement="top">
        <button className="hover:cursor" onClick={showModal}>
          <EditIcon />
        </button>
      </Tooltip>
      <Modal
        open={isOpen}
        onOk={hideModal}
        onCancel={hideModal}
        width={350}
        footer={() => (
          <ButtonGroup className="!mt-6">
            <Button
              size="small"
              outlined
              color="gray"
              className="flex-1 md:mr-2 !text-black border-black"
              onClick={handleClassifyClick}
              hover="green"
            >
              Auto rate
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
              Update
            </Button>
          </ButtonGroup>
        )}
      >
        <div className="mb-2 flex flex-col justify-center items-center gap-5">
          <InputLabel label="Edit your review" />

          <div className="flex justify-center items-center gap-3">
            <Rate
              allowHalf
              value={updatedRating}
              onChange={handleManualRatingChange}
            />{" "}
            <Tooltip title="You can either manually set a rating or use our AI model below to generate a rating based on your review.">
              <InfoIcon className="hover:cursor-pointer" />
            </Tooltip>
          </div>

          <Textarea value={updatedReview} onChange={handleReviewChange} />
        </div>
      </Modal>
    </>
  );
};

export default EditReview;
