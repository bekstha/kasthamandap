const AboutAlaCarte = () => {
  return (
    <div className="mx-10 my-10">
      <div className="flex flex-col items-center">
        <span className="font-cursive absolute mt-5 text-4xl text-white ">
          All dishes includes basmati rice, naan bread and a dash of sause.
        </span>
        <span className="font-cursive absolute mt-20 text-4xl text-white shadow-2xl">
          Remember to inform staff about the allergies.
        </span>
        <span className="absolute mt-40">
          <button
            type="button"
            className="focus:outline-none text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            A La Carte
          </button>
        </span>
      </div>

      <img
        className="object-cover h-96 w-full rounded-lg"
        src="./assets/images/spices.jpg"
      ></img>
    </div>
  );
};

export default AboutAlaCarte;
