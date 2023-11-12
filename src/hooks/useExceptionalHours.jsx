import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const useExceptionalHours = () => {
  const [exceptionalHours, setExceptionalHours] = useState([]);
  const exceptionalHourInfo = collection(db, "ExceptionalHours");

  useEffect(() => {
    const getExceptionalHours = async () => {
      try {
        const data = await getDocs(exceptionalHourInfo);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setExceptionalHours(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getExceptionalHours();
  }, []);

  return { exceptionalHours };
};

export default useExceptionalHours;
