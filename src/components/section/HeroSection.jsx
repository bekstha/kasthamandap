import ButtonGroup from "../ui/ButtonGroup";
import Button from "../ui/Button";
import { Section } from "../ui/Section";
import Overlay from "../ui/Overlay";
import Slider from "../ui/Slider";
import useContact from "../../hooks/useContact";
import Banner from "../ui/Banner";
import useSpecialMenu from "../../hooks/useSpecialMenu";
import { useEffect, useState } from "react";


const HeroSection = () => {
  const { contact } = useContact();
  const { specialMenu } = useSpecialMenu();
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [isToday, setIsToday] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  console.log(isToday);

  useEffect(() => {
    for (let i = 0; i < specialMenu.length; i++) {
      const startDate = new Date(specialMenu[i].start_date);
      const endDate = new Date(specialMenu[i].end_date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0,0,0,0);

      if (startDate <= today && today <= endDate) {
        setIsToday(true)
      } else  {
        console.log("Fetched date is not within range");
      }
    }
  }, [today]);

  return (
    <Section sectionClass="h-[65vh] lg:h-screen flex items-center justify-center max-w-screen bg-hero-section bg-cover bg-center">
      <Overlay />
      <Banner />
      <Slider sliderType="heroSection">
        {/* Slide 1 */}
        <div className="relative z-40 text-center my-6 text-white">
          <h1 className="text-2xl md:text-8xl font-extrabold font-cursive leading-tight">
            Welcome to Kasthamandap
          </h1>
          <p className="mt-4 text-base md:text-3xl font-cursive">
            Experience the Flavors of Nepal in the Heart of Kotka
          </p>
        </div>

        {/* Slide 2 */}
        <div className="relative z-40 text-center text-white">
          <h1 className="text-4xl md:text-8xl font-extrabold font-cursive leading-tight">
            Order Delicious Food
          </h1>
          <p className="mt-4 text-lg md:text-4xl font-cursive">
            Make an order at
            <a
              href={`tel:+${contact[0]?.phoneNumber}`}
              className="hover:text-blue-400"
            >
              {""} + {contact[0]?.phoneNumber}
            </a>
          </p>
          <p className="mt-4 text-lg md:text-4xl font-cursive">
            Or you can use one of our partners below
          </p>
          <ButtonGroup>
            <Button
              color="blue"
              className="md:text-lg"
              href="https://wolt.com/en/fin/kotka/restaurant/ravintola-kasthamandap"
              isExternal
            >
              Wolt
            </Button>
            <Button
              color="pink"
              className="md:text-lg"
              href="https://www.foodora.fi/restaurant/ydzj/ravintola-kasthamandap"
              isExternal
            >
              Foodora
            </Button>
          </ButtonGroup>
        </div>
        {/* Slide 3 */}
        {isToday && (
          <div className="relative z-40 text-center my-6 text-white">
            <h1 className="text-3xl md:text-8xl font-extrabold font-cursive leading-tight">
                {todaysSpecial.title}
            </h1>
            <p className="mt-4 text-base md:text-4xl font-cursive">
              Special Menu available today. Check menu to see the available dishes.
            </p>
          </div>
        )}
      </Slider>
    </Section>
  );
};

export default HeroSection;
