import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const useReservation = (reservationID) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getReservationById = async () => {
      const docRef = doc(db, "Reservations", reservationID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReservations(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getReservationById();
  }, []);

  return { reservations };
};

export default useReservation;
