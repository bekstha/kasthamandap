import { updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ReservationDecision = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/decline-booking-request")) {
      updateDoc("Reservations", {
        id: "lskjfd",
        firstname: "decline",
      });
    } else if (location.pathname.includes("/approve-booking-request")) {
      updateDoc("Reservations", {
        id: "lskjfd",
        firstname: "Approve",
      });
    }
  }, []);
  return Navigate("/");
};

export default ReservationDecision;
