import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const useReservation = (reservationID) => {
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const docRef = doc(db, "Reservations", reservationID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setReservationData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    if (reservationID) {
      fetchReservation();
    }
  }, [reservationID]);

  return { reservationData, loading };
};

export default useReservation;
