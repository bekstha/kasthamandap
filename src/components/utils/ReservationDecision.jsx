import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";

import useReservation from "../../hooks/useReservation";
import { db } from "../../config/firebase";
import { POST } from "../../services/sendEmail";

const ReservationDecision = () => {
  const params = useParams();
  const { reservationID, decision } = params;
  const { reservations } = useReservation(reservationID);

  useEffect(() => {
    const reviewDecision = async () => {
      if (!reservationID || !decision) {
        return null;
      }

      // if (reservations?.status !== "pending") {
      //   return null;
      // }

      if (decision === "approve") {
        await updateDoc(doc(db, "Reservations", reservationID), {
          status: "approved",
        });
        await POST("email/response", {
          useremail: reservations?.email,
          customerName: reservations?.firstname,
          reservationDate: reservations?.reservationDate,
          reservationTime: reservations?.reservationTime,
          phoneNumber: reservations?.phoneNumber,
          guestCount: reservations?.guestCount,
          reservationID,
          emailType: "booking-accept",
        });
      }

      if (decision === "decline") {
        await updateDoc(doc(db, "Reservations", reservationID), {
          status: "declined",
        });

        await POST("email/response", {
          useremail: reservations?.email,
          customerName: reservations?.firstname,
          reservationDate: reservations?.reservationDate,
          reservationTime: reservations?.reservationTime,
          phoneNumber: reservations?.phoneNumber,
          guestCount: reservations?.guestCount,
          emailType: "booking-reject",
        });
      }
    };

    reviewDecision();
  }, [reservationID]);
  return Navigate("/");
};

export default ReservationDecision;
