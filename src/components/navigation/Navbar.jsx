import MobileNavigation from "./MobileNavigation";
import Navs from "./Navs";

const Navbar = () => {
  return (
    <header className="bg-black sticky top-0 max-h-20 flex justify-between items-center py-5 px-3 lg:px-24 z-50">
      <a href="/" className="text-white gap-1 flex justify-center items-center">
        <img
          src="/public/resturantlogo.png"
          alt="Kasthamandap Logo"
          className="object-contain w-20 h-28 md:w-32 p-3" 
        />
        <h1 className="hidden md:block md:text-3xl font-extrabold font-cursive leading-tight">Kasthamandap</h1>
      </a>
      {/* Mobile navigation */}
      <MobileNavigation />
      {/* Desktop navigation */}
      <Navs className="hidden md:flex" />
    </header>
  );
};

export default Navbar;
