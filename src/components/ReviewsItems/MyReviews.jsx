import { Button, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import useReviews from "../../hooks/useReviews";
import ReviewItems from "./ReviewItems";
import { ButtonGroup } from "@mui/material";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";

const MyReviews = ({ userId }) => {
  const { reviews, deleteAllReviewsForUser } = useReviews();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isDeleteAllReviewsDisabled, setIsDeleteAllReviewsDisabled] =
    useState(true);

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  useEffect(() => {
    // Filter reviews based on the user ID
    const userReviews = reviews.filter((review) => review.userId === userId);
    setFilteredReviews(userReviews);
    setIsDeleteAllReviewsDisabled(userReviews.length === 0); // Disable if no reviews
  }, [reviews, userId]);

  const handleDeleteMyAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;


    if (user) {
      // Hardcoded valid password for testing
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        ""
      );

      reauthenticateWithCredential(user, credential)
        .then(() => {
          deleteUser(user);

          // Clear session storage
          sessionStorage.clear();

          // Logout the user
          auth.signOut();

          // Close the modal
          hideModal();
        })
        .catch((error) => {
          console.error("Error reauthenticating or deleting account:", error.code, error.message, error);
        });
        
        
    } else {
      console.error("User not signed in.");
    }
  };

  const handleDeleteAllReviews = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete all your reviews?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteAllReviewsForUser(userId);
        hideModal();
      },
      onCancel: () => {
        // Optional: Handle cancellation if needed
      },
    });
  };

  return (
    <div>
      <Tooltip title="My reviews" placement="top">
        <button
          className="!w-12 h-12 font-orange bg-orange-500 text-white rounded-full"
          onClick={showModal}
        >
          {" "}
          <PersonIcon />
        </button>
      </Tooltip>

      <Modal
        visible={isOpen}
        onCancel={hideModal}
        footer={() => (
          <ButtonGroup>
            <Button
              outlined="true"
              className="!text-black flex-1 border-gray-600 !mt-6"
              onClick={handleDeleteAllReviews}
              disabled={isDeleteAllReviewsDisabled}
            >
              Delete All Reviews
            </Button>
            <Button
              outlined="true"
              className="!text-white flex-1 border-red-600 bg-rose-600 !mt-6"
              onClick={handleDeleteMyAccount}
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
