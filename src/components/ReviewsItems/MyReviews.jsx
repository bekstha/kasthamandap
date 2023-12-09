import { Modal, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import useReviews from "../../hooks/useReviews";
import ReviewItems from "./ReviewItems";
import ButtonGroup from "../ui/ButtonGroup";
import Button from "../ui/Button";
import {
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import useUsers from "../../hooks/useUser";

const MyReviews = ({ userId, email }) => {
  const { reviews, deleteAllReviewsForUser } = useReviews();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isDeleteAllReviewsDisabled, setIsDeleteAllReviewsDisabled] =
    useState(true);
  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);
  const { deleteUser } = useUsers();

  useEffect(() => {
    // Filter reviews based on the user ID
    const userReviews = reviews.filter((review) => review.userId === userId);
    setFilteredReviews(userReviews);
    setIsDeleteAllReviewsDisabled(userReviews.length === 0); // Disable if no reviews
  }, [reviews, userId]);

  const reauthenticate = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const handleDeleteMyAccount = async () => {
    try {
      // Reauthenticate the user
      const isReauthenticated = await reauthenticate();

      if (!isReauthenticated) {
        message.error("Reauthentication failed. Please try again.");
        return;
      }

      // If reauthentication is successful, proceeding to delete the account
      Modal.confirm({
        title: "Confirm Delete",
        content:
          "This action will not delete your reviews, If you want please be sure to delete them beforehand. Are you sure you want to continue deleting your account?",
        okButtonProps: { className: "bg-rose-600 text-white" },
        onOk: async () => {
          try {
            deleteAllReviewsForUser(userId);

            // Delete auth
            await auth.currentUser.delete();

            // Delete user account from firestore
            await deleteUser(email);

            // Clear session storage
            sessionStorage.clear();

            // Logout the user
            auth.signOut();

            // Close the modal
            hideModal();
            message.success("Your account is deleted successfully!");
          } catch (error) {
            console.error("Error deleting account:", error);
          }
        },
        onCancel: () => {},
      });
    } catch (error) {
      message.error("Error during reauthentication:", error);
    }
  };

  const handleDeleteAllReviews = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete all your reviews?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteAllReviewsForUser(userId);
        message.success("Your reviews are deleted successfully!");
        hideModal();
      },
      onCancel: () => {},
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
        open={isOpen}
        onCancel={hideModal}
        footer={() => (
          <ButtonGroup className="flex-col md:flex-row mt-10">
            <Button
              size="small"
              outlined
              color="gray"
              hover="red"
              className="flex-1 !text-black border-gray-600"
              onClick={handleDeleteAllReviews}
              disabled={isDeleteAllReviewsDisabled}
            >
              Delete All Reviews
            </Button>
            <Button
              size="small"
              outlined
              color="red"
              hover="red"
              className="flex-1 !text-white border-gray-600"
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
