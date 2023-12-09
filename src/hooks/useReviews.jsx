import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  query,
  onSnapshot,
  where,
  writeBatch,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Reviews"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let reviewArr = [];
      querySnapshot.forEach((doc) => {
        reviewArr.push({ ...doc.data(), id: doc.id });
      });
      setReviews(reviewArr);
    });
    return () => unsubscribe();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "Reviews", reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  };

  const addReview = async (userId, email, review, name, rating, timestamp) => {
    try {
      await addDoc(collection(db, "Reviews"), {
        userId,
        email,
        review,
        name,
        rating,
        timestamp,
      });
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  };

  const deleteAllReviewsForUser = async (userId) => {
    try {
      const reviewsToDeleteQuery = query(
        collection(db, "Reviews"),
        where("userId", "==", userId)
      );
      const reviewsToDeleteSnapshot = await getDocs(reviewsToDeleteQuery);

      const batch = writeBatch(db);

      reviewsToDeleteSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error deleting reviews for the user:", error);
      throw error;
    }
  };

  const updateReview = async (reviewId, newData) => {
    try {
      const reviewRef = doc(db, "Reviews", reviewId);
      await setDoc(reviewRef, newData, { merge: true });
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  };

  return {
    reviews,
    deleteReview,
    addReview,
    deleteAllReviewsForUser,
    updateReview,
  };
};

export default useReviews;
