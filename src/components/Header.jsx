const AboutHeader = ({ title }) => {
  return (
    <span className="inline-block md:text-6xl text-3xl text-white font-cursive">
      {title}
    </span>
  );
};

const Header = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex flex-col justify-center items-center font-lora text-gray-700">
        <AboutHeader title=" Authentic Nepali Food" />
        <AboutHeader title="at Kotka" />
      </div>
      <img
        className="w-full md:h-96 h-60 object-cover"
        src="https://media.istockphoto.com/id/1185440458/fi/valokuva/valikoitua-intialaista-ruokaa-tumman-maalaismaisella-taustalla-perinteinen-intialainen.jpg?s=2048x2048&w=is&k=20&c=IgTrQrx_YSbv6daIv7T1QEHnIcTbP7NBGA-khCdsAkY="
        alt="a cute cat"
      ></img>
    </div>
  );
};

export default Header;
