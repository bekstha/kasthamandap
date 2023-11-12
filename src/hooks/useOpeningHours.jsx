import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const useOpeningHours = () => {
  const [openingHours, setOpeningHours] = useState([]);
  const contactInfoRef = collection(db, "OpeningHours");

  useEffect(() => {
    const getOpeningHours = async () => {
      try {
        const data = await getDocs(contactInfoRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOpeningHours(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getOpeningHours();
  }, []);

  // Find opening hours
  const weekdayOpeningHours = openingHours.find(
    (info) => info.id === "weekday"
  );
  const saturdayOpeningHours = openingHours.find(
    (info) => info.id === "saturday"
  );
  const sundayOpeningHours = openingHours.find((info) => info.id === "sunday");

  const lunchHours = openingHours.find((info) => info.id === "LunchHour");

  return { weekdayOpeningHours, saturdayOpeningHours, sundayOpeningHours, lunchHours };
};

export default useOpeningHours;
