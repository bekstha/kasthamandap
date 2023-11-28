import OpeningHours from "./OpeningHours";
import Contact from "./Contact";

import logo from "../assets/images/temple_n_fork_n_spoon_II.svg";

const FooterItemTitle = ({ label }) => (
  <h3 className="py-4 text-xl font-semibold">{label}</h3>
);

const Footer = () => {
  const googleMapsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=60.4666° N, 26.9442° E";
  return (
    <footer id="contact-us" className="max-container bg-black/80 md:pt-10">
      <div className="lg:flex justify-between gap-8 pb-6 md:pb-10">
        <div className="flex justify-center md:block md:w-40">
          <img
            src={logo}
            alt="Kasthamandap logo"
            className="w-20 object-contain"
          />
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <FooterItemTitle label="Address" />

          <div className="rounded-md overflow-hidden bg-red-400 h-60 md:h-72">
            <iframe
              title="Google Map"
              style={{ border: 0 }}
              className="h-full w-full"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCwegKtCIqjsEt0yIRi8RUgfWiW-08B7-8&q=60.4666° N, 26.9442° E`}
              allowFullScreen
            ></iframe>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md overflow-hidden  h-10 md:h-7 block text-sm"
          >
            Get Directions on Google Maps
          </a>
        </div>
        <div className="mt-6 md:mt-0">
          <FooterItemTitle label="Opening hours" />
          <OpeningHours />

          <div className="mt-6">
            <FooterItemTitle title="Contact us" />
            <span className="block font-light">
              <Contact />
            </span>
          </div>
        </div>
      </div>
      <hr className="border-white/30" />
      <p className="py-6 md:py-10 text-center">
        &copy; 2023. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
