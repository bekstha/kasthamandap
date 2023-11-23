import { Button, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';import useReviews from "../../hooks/useReviews";
import ReviewItems from "./ReviewItems";
import { ButtonGroup } from "@mui/material";

const MyReviews = ({ userId }) => {
  const { reviews, deleteAllReviewsForUser } = useReviews();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  useEffect(() => {
    // Filter reviews based on the user ID
    const userReviews = reviews.filter((review) => review.userId === userId);
    setFilteredReviews(userReviews);
  }, [reviews, userId]);

  const handleDeleteAllReviews = () => {
    deleteAllReviewsForUser(userId);
    hideModal;
  };

  return (
    <div>
      <Tooltip title="My reviews" placement="top">
        <button
          className="!w-12 h-12 font-orange bg-orange-500 text-white rounded-full"
          onClick={showModal}
        >
          {" "}
          <PersonIcon />{" "}
        </button>
      </Tooltip>

      <Modal
        outlined="true"
        open={isOpen}
        onCancel={hideModal}
        width={500}
        footer={() => (
          <ButtonGroup>
            <Button
              outlined="true"
              className="!text-black flex-1 border-gray-600 !mt-6"
              onClick={handleDeleteAllReviews}
            >
              Delete All Reviews
            </Button>
            <Button
              outlined="true"
              className="!text-black flex-1 border-gray-600 !mt-6"
              onClick={handleDeleteAllReviews}
            >
              Delete My Account
            </Button>
          </ButtonGroup>
        )}
      >
        <div key={userId} className="flex flex-col gap-5 items-center">
          <h1 className="font-extrabold text-xl">My Reviews</h1>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewItems
                key={review.id}
                {...review}
                reviewId={review.id}
                timestamp={review.timestamp}
                rating={review.rating}
              />
            ))
          ) : (
            <p>You have not made any reviews yet.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MyReviews;
