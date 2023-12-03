import Navbar from "./components/navigation/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import routes from "./routes";

import "./App.css";
import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import ReviewSection from "./components/ReviewSection";
import ReservationSection from "./components/ReservationSection";
import CancelPage from "./components/CancelPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ReviewSection />
      <ReservationSection />
      <main className="overflow-x-hidden">{routes}</main>
      <Footer />
    </>
  );
};

export default App;
