import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

import useReservation from "../../hooks/useReservation";
import { POST } from "../../services/sendEmail";

const ReservationDecision = () => {
  const params = useParams();
  const { reservationID, decision } = params;
  const { reservationData, loading } = useReservation(reservationID);

  useEffect(() => {
    const reviewDecision = async () => {
      // Ensure reservationData is available and not null or undefined
      if (!reservationID || !decision || loading || !reservationData) {
        console.error(
          "Invalid parameters or reservationData is not available."
        );
        return;
      }

      try {
        if (decision === "approve") {
          await updateDoc(doc(db, "Reservations", reservationID), {
            status: "approved",
          });

          await POST("email/response", {
            useremail: reservationData.email,
            customerName: reservationData.firstname,
            reservationDate: reservationData.reservationDate,
            reservationTime: reservationData.reservationTime,
            phoneNumber: reservationData.phoneNumber,
            guestCount: reservationData.guestCount,
            reservationID,
            emailType: "booking-accept",
          });
        }

        if (decision === "decline") {
          await updateDoc(doc(db, "Reservations", reservationID), {
            status: "declined",
          });

          await POST("email/response", {
            useremail: reservationData.email,
            customerName: reservationData.firstname,
            reservationDate: reservationData.reservationDate,
            reservationTime: reservationData.reservationTime,
            phoneNumber: reservationData.phoneNumber,
            guestCount: reservationData.guestCount,
            emailType: "booking-reject",
          });
        }
      } catch (error) {
        console.error("Error processing reservation decision:", error);
      }
    };

    if (!loading) {
      reviewDecision(); // Only call reviewDecision when data is not loading
    }
  }, [params, reservationID, decision, reservationData, loading]); // Include dependencies in the dependency array

  if (loading) {
    return <p>Loading...</p>; // You can render a loading indicator while data is being fetched
  }

  return <Navigate to="https://kasthamandap.fi/" />;
};

export default ReservationDecision;
