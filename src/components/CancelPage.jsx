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
            <Section id="reservation" sectionClass="bg-reservation-section">
              <Overlay color="bg-black/80" />
              <div className="relative max-w-md mx-auto p-6 rounded-2xl bg-white/20 shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur">
                <p className="font-bold text-xl mb-6 text-center">
                  Are you sure you want to cancel?
                </p>
                <div className="flex items-center justify-between gap-4">
                  <Button onClick={handleCancel}>Yes</Button>
                  <Button onClick={handleNo}>No</Button>
                </div>
              </div>
            </Section>
          )}
        </div>
      ) : (
        <p>Cancellation in progress...</p>
      )}
    </div>
  );
};

export default CancelPage;
