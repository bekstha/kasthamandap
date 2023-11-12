const HeroSection = () => {
  return (
    <section
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundImage: `url($../../public/assets/images/spices2.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-60"
        style={{ zIndex: 1 }}
      ></div>
      <div className="flex-1 flex items-center relative z-10 px-2">
        <div className="text-center mx-auto text-white">
          <h1 className="font-cursive text-7xl lg:text-9xl font-extrabold my-4 ">
            Welcome to Kasthamandap{" "}
          </h1>
          <p className="text-3xl font-medium lg:text-4xl font-cursive">
            Experience the Flavors of Nepal in the Heart of Kotka
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
            <a
              className="px-10 py-2 inline-block bg-cyan-500 text-white font-bold text-xl hover:bg-cyan-700 transition-colors mt-10 rounded"
              href="https://wolt.com/en/fin/kotka/restaurant/ravintola-kasthamandap"
              target="_blank"
              rel="noopener noreferrer" 
              style={{ maxWidth: "200px" }} 
            >
              {" "}
              Wolt{" "}
            </a>
            <a
              className="px-10 py-2 inline-block bg-pink-500 text-white font-bold text-xl hover:bg-pink-700 transition-colors mt-10 rounded"
              href="https://www.foodora.fi/restaurant/ydzj/ravintola-kasthamandap"
              target="_blank"
              rel="noopener noreferrer"
              style={{ maxWidth: "200px" }} 
            >
              {" "}
              Foodora{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
