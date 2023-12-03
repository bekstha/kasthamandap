import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import useReservation from "../hooks/useReservation";
import { db } from "../config/firebase";

const CancelPage = () => {
  const { reservationID } = useParams();
  const { reservations } = useReservation(reservationID);
  const [cancellationComplete, setCancellationComplete] = useState(false);

  const handleCancel = async () => {
    try {
      await deleteDoc(doc(db, "Reservations", reservationID));
      setCancellationComplete(true);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleNo = () => {
    setCancellationComplete(false);
    Navigate("/");
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
