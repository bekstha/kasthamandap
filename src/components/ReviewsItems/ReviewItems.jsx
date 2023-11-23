import { useState } from "react";
import { Rate, Tooltip } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import useReviews from "../../hooks/useReviews";

const ReviewItems = ({
  review,
  reviewId,
  userId,
  outlined,
  timestamp,
  rating,
}) => {
  const { deleteReview } = useReviews();
  const reviewDate = timestamp instanceof Date ? timestamp : timestamp.toDate();
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if reviewDate is valid before formatting
  const formattedDate =
    reviewDate instanceof Date ? reviewDate.toLocaleString() : "Invalid Date";

  const handleDeleteReview = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this review?"
      );

      if (confirmDelete) {
        setIsDeleting(true);
        await deleteReview(reviewId);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-100 p-2 mt-8 shadow-md rounded-lg justify-between gap-3 w-full">
      <Rate allowHalf value={rating} />
      <div className="flex justify-between gap-3">
        {review}
        <Tooltip title="Delete review" placement="top">
          <button
            className="hover:cursor"
            onClick={handleDeleteReview}
            disabled={isDeleting}
          >
            <DeleteIcon style={{ color: "#f50057" }} />
          </button>
        </Tooltip>
      </div>
      <p className="font-light italic text-end">{formattedDate}</p>
    </div>
  );
};

export default ReviewItems;
