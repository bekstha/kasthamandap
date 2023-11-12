import { Routes, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import AlaCarteMenuPage from "./components/AlaCarteMenuPage";

export default (
  <Routes>
    <Route index element={<AboutPage />} />
    <Route path="/aLaCarteMenu" element={<AlaCarteMenuPage />} />
  </Routes>
);
