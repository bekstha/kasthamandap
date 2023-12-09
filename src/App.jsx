import Navbar from "./components/navigation/Navbar";
import Footer from "./components/section/Footer";
import routes from "./routes";
import "./App.css";
import Banner from "./components/ui/Banner";
import HomePage from "./components/HomePage";
const App = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <main className="overflow-x-hidden">
        {routes}
        <HomePage />
      </main>
      <Footer />
    </>
  );
};

export default App;
