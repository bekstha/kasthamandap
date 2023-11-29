import Navbar from "./components/navigation/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import routes from "./routes";

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <main className="overflow-x-hidden">{routes}</main>
      <Footer />
    </>
  );
};

export default App;
