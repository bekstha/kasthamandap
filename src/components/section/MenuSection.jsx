import { Section, SectionTitle } from "../ui/Section";
import Overlay from "../ui/Overlay";
import { useEffect, useState } from "react";
import useSpecialMenu from "../../hooks/useSpecialMenu";
import MenuModal from "../menu/MenuModal";

const MenuSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dishType, setDishType] = useState("");
  const { specialMenu } = useSpecialMenu();
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [isToday, setIsToday] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const showModal = (type) => {
    setDishType(type);
    setIsOpen(true);
  };

  const hideModal = () => setIsOpen(false);

  useEffect(() => {
    for (let i = 0; i < specialMenu.length; i++) {
      const startDate = new Date(specialMenu[i].start_date);
      const endDate = new Date(specialMenu[i].end_date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0,0,0,0);

      if (startDate <= today && today <= endDate) {
        setIsToday(true)
        setTodaysSpecial(specialMenu[0])
      } else  {
        console.log("Fetched date is not within range");
      }
    }
  }, [today]);

  return (
    <Section id="menu" sectionClass="h-[65vh] h-screen flex items-center justify-center max-w-screen bg-hero-section bg-cover bg-center">
      <Overlay color="bg-black/80" />
      <div className="relative text-center max-w-4xl mx-auto">
        <SectionTitle label="Our Menu" />
        <p className="text-lg">
          All dishes include basmati rice, naan bread and a dash of sauce. The
          food can be increased if heat is needed. Remember to inform the staff
          about allergies. l= Lactose-free (the raita sauce and naan bread
          included in the portions contain lactose.) g= Lactose-free (the naan
          bread included in the portions contains gluten.) v= Vegan (It is
          possible to get the serving as vegan.)
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
          <a
            onClick={() => showModal("Lunch")}
            className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
            target="_blank"
            rel="noopener noreferrer"
            style={{ maxWidth: "200px" }}
          >
            {" "}
            Lunch Menu{" "}
          </a>
          <a
            onClick={() => showModal("Alacarte")}
            className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
            target="_blank"
            rel="noopener noreferrer"
            style={{ maxWidth: "200px" }}
          >
            {" "}
            A La Carte{" "}
          </a>
          {isToday && (
            <a
              onClick={() => showModal("Special Menu")}
              className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
              target="_blank"
              rel="noopener noreferrer"
              style={{ maxWidth: "250px" }}
            >
              {" "}
              Special Menu{" "}
          </a>
          )}
        </div>
      </div>
      <div>
        <MenuModal
          isOpen={isOpen} 
          hideModal={hideModal}
          dishType={dishType}
          special={todaysSpecial}
        />
      </div>
    </Section>
  );
};

export default MenuSection;
