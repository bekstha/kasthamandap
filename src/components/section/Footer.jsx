import OpeningHours from "../utils/OpeningHours";
import Contact from "../utils/Contact";
import logo from "../../assets/images/resturantlogo.png";
import DirectionsIcon from "@mui/icons-material/Directions";

const FooterItemTitle = ({ label }) => (
  <h3 className="py-4 text-xl font-semibold text-black">{label}</h3>
);

const Footer = () => {
  const googleMapsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=60.4668625° N, 26.9422409° E";
  return (
    <footer id="contact-us" className="max-container bg-white md:pt-10">
      <div className="lg:flex justify-between gap-8 pb-6 md:pb-10">
        <div className="flex justify-center lg:block lg:w-80">
          <img
            src={logo}
            alt="Kasthamandap logo"
            className="w-45 md:h-80 object-contain mt-20"
          />
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <FooterItemTitle label="Address" />

          <div className="rounded-md overflow-hidden bg-red-400 h-60 md:h-72">
            <iframe
              title="Google Map"
              style={{ border: 0 }}
              className="h-full w-full"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCwegKtCIqjsEt0yIRi8RUgfWiW-08B7-8&q=60.466613144922654° N, 26.944228606294285° E`}
              allowFullScreen
            ></iframe>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-md  h-10 md:h-7  text-sm text-black w-fit border border-gray-300 py-4 px-1 my-2"
          >
            <DirectionsIcon style={{ color: "#8ab4f8" }} />
            Directions
          </a>
        </div>

        <div className="mt-6 lg:mt-0 md:flex gap-12 justify-between lg:block">
          <div className="mt-6 lg:mt-0">
            <FooterItemTitle label="Opening hours" />
            <OpeningHours />
          </div>
          <div className="mt-6">
            <FooterItemTitle label="Contact us" />
            <Contact />
          </div>
        </div>
      </div>
      <hr className="border-black/30" />
      <p className="py-6 md:py-10 text-center text-black">
        &copy; 2023. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
