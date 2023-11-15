import { Section, SectionTitle } from "./ui/Section";
import Overlay from "./ui/Overlay";
import ButtonGroup from "./ui/ButtonGroup";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";

const MenuSection = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [dishType, setDishType] = useState("");

  const handleClick = (name) => {
    // Handle the card click event here
    console.log(name);
    setDishType(name);
    setOpenPopup(true);
  };

  const HandleRemovePopUp = () => setOpenPopup(false);

  return (
    <Section
      id="menu"
      sectionClass="bg-about-menu bg-cover bg-center leading-snug"
    >
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
        {/*         <ButtonGroup>
          <Button outlined className="w-48" onClick={handleClick("Alacarte")}>
            A La Carte
          </Button>
          <Button className="w-48" onClick={handleClick("Lunch")}>Lunch Menu</Button>
        </ButtonGroup> */}
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
          <a
            onClick={() => handleClick("Lunch")}
            className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
            target="_blank"
            rel="noopener noreferrer"
            style={{ maxWidth: "200px" }}
          >
            {" "}
            Lunch Menu{" "}
          </a>
          <a
            onClick={() => handleClick("Alacarte")}
            className="px-10 py-2 inline-block  bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
            target="_blank"
            rel="noopener noreferrer"
            style={{ maxWidth: "200px" }}
          >
            {" "}
            A La Carte{" "}
          </a>
          <a
            onClick={() => handleClick("Special")}
            className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
            target="_blank"
            rel="noopener noreferrer"
            style={{ maxWidth: "250px" }}
          >
            {" "}
            Today's Special{" "}
          </a>
        </div>
      </div>
      <div>
        <PopUp
          openPopUp={openPopup}
          closePopUp={HandleRemovePopUp}
          dishType={dishType}
        />
      </div>
    </Section>
  );
};

export default MenuSection;
