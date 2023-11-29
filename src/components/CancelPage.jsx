import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import useReservation from "../hooks/useReservation";
import { db } from "../config/firebase";
import { POST } from "../services/sendEmail";

const CancelPage = () => {
  const { reservationID } = useParams();
  const { reservations } = useReservation(reservationID);
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleCancel = async () => {
    try {
      await updateDoc(doc(db, "reservations", reservationID), {
        status: "cancelled",
      });
      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleNo = () => {
    setShowConfirmation(false);
    history.push("/email");
  };
  return (
    <div>
      {showConfirmation ? (
        <div>
          {cancellationComplete ? (
            <p>Cancellation complete. Redirecting...</p>
          ) : (
            <>
              <p>Are you sure you want to cancel?</p>
              <button onClick={handleCancel}>Yes</button>
              <button onClick={handleNo}>No</button>
            </>
          )}
        </div>
      ) : (
        <p>Cancellation in progress...</p>
      )}
    </div>
  );
};

export default CancelPage;
