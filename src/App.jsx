import Footer from "./components/Footer";
import About from "./components/About";
import AboutMenu from "./components/AboutMenu";
import HeroSection from "./components/HeroSection";
import TopNavBar from "./components/TopNavBar";

const App = () => {
  return (
    <>
      <TopNavBar />
      <HeroSection />
      <About />
      <AboutMenu />
      <Footer />
    </>
  );
};

export default App;
