import { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import useReviews from "../../hooks/useReviews";
import { Modal, Rate, Tooltip } from "antd";
import ButtonGroup from "../ui/ButtonGroup";
import Button from "../ui/Button";
import { InputLabel, Textarea } from "../ui/Input";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from '@mui/icons-material/Edit';

const EditReview = ({oldReview, oldRating, reviewId}) => {


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
        const languageResult = await languageDetector.detect(updatedReview);
        const detectedLanguage =
          languageResult.languages && languageResult.languages[0]?.languageCode;
          const result = await textClassifier.classify(updatedReview, {
          displayNamesLocale: detectedLanguage,
        });
  
        console.log("Detected result:", result.classifications[0].categories);
  
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
        try {
          if (updatedReview.trim() === "" || !(updatedRating > 0 && updatedRating <= 5)) {
            alert("Please fill the review section and provide a valid rating.");
            return;
          }
    
          // Prepare the updated data
          const newData = {
            review: updatedReview,
            rating: updatedRating,
            // Add other properties as needed
          };
    
          // Call the updateReview function
          await updateReview(reviewId, newData);
    
          // Optionally, you can close the modal or perform any other actions after the update
          hideModal();
        } catch (error) {
          console.error("Error updating review:", error);
          // Handle error as needed
        }
      };

    return (
      <>
        <Tooltip title="Edit review" placement="top">
            <button
              className="hover:cursor"
              onClick={showModal}
            >
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
                onChange={handleManualRatingChange} // Handle manual rating changes
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

export default EditReview