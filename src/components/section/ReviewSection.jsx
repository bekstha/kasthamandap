import { Popconfirm, Rate, Tooltip, message } from "antd";

import { Section, SectionTitle } from "../ui/Section";
import Slider from "../ui/Slider";
import useReviews from "../../hooks/useReviews";
import { auth, db, provider } from "../../config/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import MyReviews from "../reviewsItems/MyReviews";
import PrivacyPolicyDrawer from "./PrivacyPolicyDrawer";
import AddReview from "../reviewsItems/AddReview";

const ReviewSection = () => {
  const { reviews } = useReviews();
  const [user, setUser] = useState(null);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);

  useEffect(() => {
    // Check if there is a user in sessionStorage on component mount
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Set up a listener for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const showSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);

      // Check if the user already exists in Firebase Firestore
      const userDocRef = doc(db, "Reviewers", user.email);
      const userDocSnapshot = await getDoc(userDocRef);

      const timestamp = new Date();

      if (!userDocSnapshot.exists()) {
        // Add user to Firebase Firestore with email as the document ID
        await setDoc(userDocRef, {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          acceptedTerms: true,
          termsAcceptedAt: timestamp,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      message.success("User signed out successfully");
    } catch (error) {
      message.error("An error occurred during sign-out. Please try again.");
    }
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Signing out cancelled");
  };

  return (
    <Section sectionClass="bg-white text-black text-center flex flex-col items-center gap-3 sm:mx-2">
      <SectionTitle label="Review" />

      <div className="h-64 flex justify-center flex-col items-center my-20 ">
        {reviews?.length > 0 ? (
          <Slider>
            {reviews?.map((review, index) => (
              <div key={index} className="h-64  my-10 mb-10 text-center">
                <div className="mx-10 h-full px-3 md:px-8 py-6 flex flex-col gap-2 items-center justify-between rounded-xl shadow-md bg-gray-50">
                  {review?.rating !== undefined && review?.rating !== null && (
                    <Rate allowHalf disabled value={review.rating} />
                  )}
                  <p className="text-lg md:text-xl leading-snug md:leading-normal">
                    {review.review}
                  </p>
                  <span>
                    <h4 className="my-4 font-semibold">-- {review.name}--</h4>
                    <p>
                      {formatDistanceToNow(review.timestamp.toDate(), {
                        addSuffix: true,
                      })}
                    </p>
                  </span>
                  <span></span>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          "No reviews yet. Be the first one to leave a review."
        )}
      </div>

      {user ? (
        <>
          <div className="mt-10 flex gap-5 items-center justify-center">
            <AddReview
              displayName={user.displayName}
              userId={user.uid}
              userEmail={user.email}
            />

            <MyReviews key={user.uid} userId={user.uid} email={user.email} />

            <Tooltip title="Log Out" placement="top">
              <Popconfirm
                title="Are you sure you want to log out?"
                onConfirm={signOut}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  style: { background: "green", color: "white" },
                }}
              >
                <button className="!w-12 h-12 bg-orange-500 text-white rounded-full">
                  {" "}
                  <PowerSettingsNewIcon />{" "}
                </button>
              </Popconfirm>
            </Tooltip>
          </div>
          <span>
            <p className="font-bold inline">Hello, </p>
            <p className="font-extrabold inline">{user.displayName}</p>
          </span>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={showSignIn}
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>{" "}
          <p>
            By signing in, you agree with our{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setPrivacyPolicyVisible(true);
              }}
            >
              {" "}
              Terms of Service and Privacy Policy
            </span>
          </p>
          {privacyPolicyVisible && (
            <PrivacyPolicyDrawer
              onClose={() => {
                setPrivacyPolicyVisible(false);
              }}
              open={privacyPolicyVisible}
            />
          )}
        </>
      )}
    </Section>
  );
};

export default ReviewSection;
