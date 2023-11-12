const About = () => {
  return (
    <div className="flex flex-row w-full bg-white">
{/*       <div className="flex basis-1/2 mt-20 ml-10 w-full">
        <img
          className=" object-cover h-100 w-1/2 mt-10 rounded-lg"
          src="../public/Images/nepali-food-2.jpg"
          alt="Image Description"
        ></img>

        <div className="flex-column ml-10 mt-10 ">
          <img
            className="object-cover h-64 w-96 rounded-lg"
            src="../public/Images/dhido.jpg"
            alt="Image Description"
          ></img>
          <img
            className="object-cover h-64 w-96 mt-10 rounded-lg"
            src="../public/Images/Dal_Bhat_Tarkari.jpeg"
            alt="Image Description"
          ></img>
        </div>
      </div> */}
      <div className="px-20 flex-col">
        <p className="mt-20 text-6xl italic font-bold font-dancing  underline-offset-4 leading-relaxed text-orange-600">
          About Us
        </p>
        <p className="mb-5 leading-relaxed text-xl text-justify me-4">
          Kasthamandap (Sanskrit: काष्ठमण्डप, Nepal Bhasa:मरु सत: Maru Satta:;
          literally &quot;Wood-Covered Shelter&quot;) was a three-storied public shelter
          that included a shrine consecrated to Gorakshanath situated at Maru,
          Kathmandu, Nepal.
        </p>
        
        <p className="mb-5 leading-relaxed text-xl text-justify me-4">
          Restaurant Kasthamandap is a popular Nepalese restautant, located in
          shopping center Pasaati, at kirkkokatu 7, kotka. It is the only Nepali
          restaurant in kotka and offers delicious food and versatile meal
          options. The restaurant is conveniently located in the city center, so
          it is easily accessible to both locals and the tourists.
        </p>

        <p className="mb-5 leading-relaxed text-xl text-justify me-4">
          Kasthamandap restaurant&apos;s lunch menu has many popular dishes like
          Chicken Korma, Chicken Rogan Josh, shahi Panir, Butter Chicken,
          Kasthamandap Chicken, Lamb Masala and many more. There are also
          gluten-free and vegeterian options. The resturant has a cozy
          atmosphere where you can enjoy delicious Nepalese food with friends
          and family.
        </p>


      </div>
    </div>
  );
};
export default About;
