import React from "react";
import ButtonGroup from "./ui/ButtonGroup";
import Button from "./ui/Button";
import { Section } from "./ui/Section";
import Overlay from "./ui/Overlay";

const HeroSection = () => {
  return (
    <Section sectionClass="h-[65vh] lg:h-[90vh] max-w-screen flex items-center justify-center bg-hero-section bg-cover bg-center">
      <Overlay />
      <div className="relative z-40 text-center">
        <h1 className="text-5xl md:text-8xl font-bold font-cursive leading-tight">
          Welcome to Kasthamandap
        </h1>
        <p className="mt-4 text-lg md:text-4xl font-cursive">
          Experience the Flavors of Nepal in the Heart of Kotka
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
    </Section>
  );
};

export default HeroSection;
