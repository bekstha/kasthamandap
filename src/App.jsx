import Footer from "./components/Footer";
import About from "./components/About";
import AboutMenu from "./components/AboutMenu";
import HeroSection from "./components/HeroSection";
import TopNavBar from "./components/TopNavBar";
import { ReviewSection } from "./components/ReviewSection";
import LunchMenu from "./components/LunchMenu";

const App = () => {
  return (
    <>
      <TopNavBar />
      <HeroSection />
      <About />
      <AboutMenu />
      <ReviewSection />
      <Footer />
      <LunchMenu day="Lauantai" />
    </>
  );
};

export default App;
