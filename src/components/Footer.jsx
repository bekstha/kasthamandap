import React from "react";

import OpeningHours from "./OpeningHours";

const FooterItemTitle = ({ title }) => (
  <p className="text-lg font-semibold">{title}</p>
);

const Footer = () => {
  return (
    <footer className="bottom-0 w-full h-80  md:flex bg-gray-300 text-black">
      <div className="bg-gray-300 md:w-1/2 h-full flex flex-col justify-center items-center gap-5">
        <FooterItemTitle title="Address" />
        <div className="h-60 w-2/3 bg-gray-200">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCwegKtCIqjsEt0yIRi8RUgfWiW-08B7-8&q=60.4666° N, 26.9442° E`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="bg-gray-300 md:w-1/2 h-full p-5 flex flex-col justify-center items-center gap-10">
        <div className="bg-gray-300 justify-center items-center">
          <FooterItemTitle title="Opening hours" />
          <OpeningHours />
        </div>
        <div>
          <FooterItemTitle title="Contact us" />
          <ul>
            <li>
              <span className="inline-block mr-4">
                <a href="tel:0442371195">Phone: +358442371195</a>
              </span>
            </li>
            <span className="inline-block mr-4">
              <a href="mailto:kasthamandap.fin@gmail.com">
                Email : kasthamandap.fin@gmail.com
              </a>
            </span>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
