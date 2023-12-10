const SectionTitle = ({ label }) => (
  <h2 className="text-3xl md:text-6xl font-extrabold font-cursive leading-tight">
    {label}
  </h2>
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
