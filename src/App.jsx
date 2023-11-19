import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import ReviewSection from "./components/ReviewSection";
import Footer from "./components/Footer";
import ReservationSection from "./components/ReservationSection";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ReviewSection />
        <ReservationSection />
      </main>
      <Footer />
    </>
  );
};

export default App;
