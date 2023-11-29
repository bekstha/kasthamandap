import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import ReservationDecision from "./components/ReservationDecision";

export default (
  <Routes>
    <Route index element={<HomePage />} />
    <Route
      path="/reservation/:reservationID/:decision"
      element={<ReservationDecision />}
    />
    <Route path="/cancel/:reservationId" element={<CancelPage />} />
  </Routes>
);
