import Footer from "./components/Footer";
import About from "./components/About";
import AboutMenu from "./components/AboutMenu";
import HeroSection from "./components/HeroSection";
import TopNavBar from "./components/TopNavBar";
import { ReviewSection } from "./components/ReviewSection";
import AdminSidebar from "./components/AdminSidebar";
import AdminMenu from "./components/AdminMenu";

const App = () => {
  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <AdminMenu />
      </div>
    </>
  );
};

export default App;
