import { Rate, Tooltip } from "antd";

import { Section, SectionTitle } from "./ui/Section";
import Slider from "./ui/Slider";
import Button from "./ui/Button";
import useReviews from "../hooks/useReviews";
import { auth, db, provider } from "../config/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { setDoc, doc } from "firebase/firestore";
import AddReview from "./AddReview";
import { formatDistanceToNow } from "date-fns";
import MyReviews from "../components/ReviewsItems/MyReviews";

const ReviewSection = () => {
  const { reviews } = useReviews();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there is a user in sessionStorage on component mount
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Set up a listener for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        // User is signed out
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

      // Set user information in the state
      setUser(user);

      // Add user to Firebase Firestore
      await setDoc(doc(db, "Reviewers", user.uid), {
        email: user.email,
        userId: user.uid,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const signOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      firebaseSignOut(auth);
      // onAuthStateChanged will handle setting the user state
    }
  };

  return (
    <Section sectionClass="bg-white text-black text-center flex flex-col items-center gap-3">
      <SectionTitle label="Review" />

      {reviews?.length > 0 ? (
        <Slider>
          {reviews?.map((review, index) => (
            <div key={index} className="h-64 my-10 mb-10 text-center">
              <div className="mx-5 h-full px-3 md:px-8 py-6 flex flex-col gap-2 items-center justify-between rounded-xl shadow-md bg-gray-50">
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
        "No reviews yet."
      )}
      {user ? (
        <div className="mt-10 flex gap-5 items-center justify-center">
          <AddReview
            displayName={user.displayName}
            userId={user.uid}
            userEmail={user.email}
          />

          <MyReviews key={user.uid} userId={user.uid} />

          <Tooltip title="Log Out" placement="top" onClick={signOut}>
            <button className="!w-12 h-12 bg-orange-500 text-white rounded-full">
              {" "}
              <PowerSettingsNewIcon />{" "}
            </button>
          </Tooltip>
        </div>
      ) : (
        <Button onClick={showSignIn}>Sign in with google</Button>
      )}
    </Section>
  );
};

export default ReviewSection;
