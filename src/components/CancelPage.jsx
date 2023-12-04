import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import useReservation from "../hooks/useReservation";
import { db } from "../config/firebase";

const CancelPage = () => {
  const { reservationID } = useParams();
  const { reservations } = useReservation(reservationID);
  const [cancellationComplete, setCancellationComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      await updateDoc(doc(db, "Reservations", reservationID), {
        status: "canceled",
      });
      console.log({ sks: "this is it." });
      setCancellationComplete(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleNo = () => {
    setCancellationComplete(false);
    setShowConfirmation(false);
    navigate("/");
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
