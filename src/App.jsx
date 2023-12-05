import Navbar from "./components/navigation/Navbar";
import Footer from "./components/section/Footer";
import "./App.css";
import Banner from "./components/ui/Banner";
import HeroSection from "./components/section/HeroSection";
import AboutSection from "./components/section/AboutSection";
import MenuSection from "./components/section/MenuSection";
import ReservationSection from "./components/section/ReservationSection";
import ReviewSection from "./components/section/ReviewSection";

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
