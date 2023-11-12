const AboutMenu = () => {
  return (
    <section
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundImage: `url($../../public/assets/images/nepali_spices.jpeg)`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-60"
        style={{ zIndex: 1 }}
      ></div>
      <div className="flex-1 flex items-center relative z-10 px-2">
        <div className="text-center mx-auto text-white">
          <h1 className="font-cursive text-7xl lg:text-9xl font-extrabold my-4">
            Our Menu{" "}
          </h1>
          <p className="text-xl font-medium lg:text-2xl  text-justify ">
            All dishes include basmati rice, naan bread and a dash of sauce. The
            food can be increased if heat is needed. Remember to inform the
            staff about allergies. l= Lactose-free (the raita sauce and naan
            bread included in the portions contain lactose.) g= Lactose-free
            (the naan bread included in the portions contains gluten.) v= Vegan
            (It is possible to get the serving as vegan.)
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
            <a
              className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
              target="_blank"
              rel="noopener noreferrer"
              style={{ maxWidth: "200px" }}
            >
              {" "}
              Lunch Menu{" "}
            </a>
            <a
              className="px-10 py-2 inline-block  bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
              target="_blank"
              rel="noopener noreferrer"
              style={{ maxWidth: "200px" }}
            >
              {" "}
              A La Carte{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMenu;
