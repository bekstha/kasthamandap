import OpeningHours from "../utils/OpeningHours";
import { Section, SectionTitle } from "../ui/Section";

const AboutSection = () => {
  return (
    <Section id="about-us" sectionClass="bg-white text-black text-center ">
      <SectionTitle label="About us" />
      <p className="mt-4 text-lg">
        Kasthamandap (Sanskrit: काष्ठमण्डप, Nepal Bhasa:मरु सत: Maru Satta:;
        literally &quot;Wood-Covered Shelter&quot;) was a three-storied public
        shelter that included a shrine consecrated to Gorakshanath situated at
        Maru, Kathmandu, Nepal.
      </p>
      <p className="mt-6 text-lg">
        Restaurant Kasthamandap is a popular Nepalese restautant, located in
        shopping center Pasaati, at kirkkokatu 7, kotka. It is the only Nepali
        restaurant in kotka and offers delicious food and versatile meal
        options. The restaurant is conveniently located in the city center, so
        it is easily accessible to both locals and the tourists.
      </p>
      <p className="mt-6 text-lg">
        Kasthamandap restaurant&apos;s lunch menu has many popular dishes like
        Chicken Korma, Chicken Rogan Josh, shahi Panir, Butter Chicken,
        Kasthamandap Chicken, Lamb Masala and many more. There are also
        gluten-free and vegeterian options. The resturant has a cozy atmosphere
        where you can enjoy delicious Nepalese food with friends and family.
      </p>

      <div className="py-8 ">
        <h3 className="font-bold text-center text-2xl mb-5">Opening hours</h3>
        <OpeningHours />
      </div>
    </Section>
  );
};
export default AboutSection;
