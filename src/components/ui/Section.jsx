import React from "react";

const SectionTitle = ({ label }) => (
  <h2 className="mb-8 text-4xl md:text-6xl font-bold">{label}</h2>
);

const Section = ({ children, id, sectionClass }) => {
  return (
    <section
      id={id}
      className={`relative max-container py-6 md:py-20 bg-no-repeat bg-cover bg-center ${sectionClass}`}
    >
      {children}
    </section>
  );
};

export { Section, SectionTitle };
