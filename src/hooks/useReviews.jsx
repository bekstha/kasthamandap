import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";


const useReviews = () => {
    const reviewsRef = collection(db, "Reviews");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const getReviews = async () => {
        try {
          const data = await getDocs(reviewsRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setReviews(filteredData);
          console.log(reviews)
        } catch (error) {
          console.error(error);
        }
      };
      getReviews();
    }, []);

    return {reviews}
  };

  export default useReviews;