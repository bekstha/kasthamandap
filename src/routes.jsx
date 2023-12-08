import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ReservationDecision from "./components/utils/ReservationDecision";
import CancelPage from "./components/CancelPage";

export default (
  <Routes>
    <Route index element={<HomePage />} />
    <Route
      path="/reservation/:reservationID/:decision"
      element={<ReservationDecision />}
    />
    <Route
      path="/cancel/confirmation/:reservationID"
      element={<CancelPage />}
    />
  </Routes>
);
