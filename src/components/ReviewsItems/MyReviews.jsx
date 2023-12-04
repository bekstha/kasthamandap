import { Button, Modal, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import useReviews from "../../hooks/useReviews";
import ReviewItems from "./ReviewItems";
import { ButtonGroup } from "@mui/material";
import {
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
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
  const [authEmail, setAuthEmail] = useState("");

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
        const userEmail = user.email;
        setAuthEmail(userEmail);
        console.log(userEmail);
        return userEmail;
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error during reauthentication:", e);
      return null;
    }
  };

  const handleDeleteMyAccount = async () => {
    try {
      // Reauthenticate the user
      const authEmail = await reauthenticate();

      if (!authEmail) {
        message.error("Reauthentication failed. Please try again.");
        return;
      }

      Modal.confirm({
        title: "Confirm Delete",
        content:
          "Please note that deleting your account won't remove your reviews. Delete them manually before proceeding. Are you sure you want to delete your account?",
        okButtonProps: { className: "bg-rose-600 text-white" },
        onOk: async () => {
          // authEmail is already set by reauthenticate
          await handleDeleteReviewer();
          // Delete auth after successfully deleting the reviewer
          const authDeleted = await handleDeleteAuth();

          if (authDeleted) {
            sessionStorage.clear();
            message.success("Your account was successfully deleted.");
          } else {
            // Handle the case where deleting the auth fails
            message.error("Your account could not be deleted.");
          }
        },
        onCancel: () => {},
      });
    } catch (error) {
      message.error("Error during reauthentication:", error);
    }
  };

  const handleDeleteReviewer = async () => {
    try {
      await deleteUser(email);
      console.log("deleted useer");
    } catch (error) {
      console.error("Error deleting reviewer:", error);
    }
  };

  const handleDeleteAuth = async () => {
    try {
      await getAuth().currentUser.delete();
      return true;
    } catch (error) {
      console.error("Error deleting reviewer:", error);
      return false;
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
              outlined="true"
              className="flex-1 border-gray-600 mt-6 md:mt-0 md:mr-2"
              onClick={handleDeleteAllReviews}
              disabled={isDeleteAllReviewsDisabled}
            >
              Delete All Reviews
            </Button>
            <Button
              outlined="true"
              className="flex-1 border-red-600 bg-rose-600 mt-6 md:mt-0 text-white"
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
