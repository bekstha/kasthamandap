import { Popconfirm, Rate, Tooltip, message } from "antd";

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
import { setDoc, doc, getDoc } from "firebase/firestore";
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

      // Check if the user already exists in Firebase Firestore
      const userDocRef = doc(db, "Reviewers", user.email);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // Add user to Firebase Firestore with email as the document ID
        await setDoc(userDocRef, {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Additional logic after successful sign-out if needed
      console.log("User signed out successfully");
    } catch (error) {
      console.error(error.message);
      // Handle any error that occurs during sign-out
      // You might want to show an error message to the user
      message.error("An error occurred during sign-out. Please try again.");
    }
  };


  const cancel = (e) => {
    console.log(e); 
    message.error("Signing out cancelled"); 
    };

  return (
    <Section sectionClass="bg-white text-black text-center flex flex-col items-center gap-3">
      <SectionTitle label="Review" />

      <div className="h-64 flex justify-center items-center my-10">
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
                  style: { background: 'green', color: 'white' },
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
        <Button onClick={showSignIn}>Sign in with google</Button>
      )}
    </Section>
  );
};

export default ReviewSection;
