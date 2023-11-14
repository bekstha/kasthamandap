import { Section, SectionTitle } from "./ui/Section";
import Overlay from "./ui/Overlay";
import ButtonGroup from "./ui/ButtonGroup";
import Button from "./ui/Button";

const MenuSection = () => {
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
        <ButtonGroup>
          <Button outlined className="w-48">
            A La Carte
          </Button>
          <Button className="w-48">Lunch Menu</Button>
        </ButtonGroup>
      </div>
    </Section>
  );
};

export default MenuSection;
