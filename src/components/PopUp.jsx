import React, { useEffect, useState } from "react";
import LunchMenu from "./LunchMenu";
import MenuCardItems from "./MenuCardItems";
import SpecialMenu from "./SpecialMenu";

const PopUp = ({ openPopUp, closePopUp, dishType, special }) => {
  const d = new Date();
  const [showMenu, setShowMenu] = useState(true);
  const [dishName, setDishName] = useState("");
  const days = [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ];

  const handleclosePopUp = (e) => {
    if (e.target.id === "ModelContainer") {
      closePopUp();
    }
  };

  useEffect(() => {
    if (dishType === "Alacarte") {
      handleCardClick("Starters", 1);
    } else if (dishType === "Lunch") {
      const today = days[d.getDay()];
      handleCardClick(today);
    }
  }, [dishType]);

  const handleCardClick = (name) => {
    // Handle the card click event here
    setShowMenu(true);
    setDishName(name);
  };

  const Category = ({ item }) => {
    return (
      <div className="">
        <button
          onClick={() => handleCardClick(item)}
          type="button"
          className={`font-medium italic rounded-md text-sm px-1 py-1 border border-black ${
            dishName === item
              ? "bg-green-500 text-white animate-wiggle"
              : ""
          }`}
        >
          {item}
        </button>
      </div>
    );
  };

  if (openPopUp !== true) return null;

  return (
    <div
      id="ModelContainer"
      onClick={handleclosePopUp}
      className="fixed left-0 top-10 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    >
      <div className="pointer-events-none relative translate-y-[-50px] transition duration-500 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[750px]">
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-black shadow-lg outline-none">
          <div className="flex flex-shrink-0 min-[576px]:mt-5 mt-10 items-center justify-between rounded-t-md border-b-2 border-gray p-3">
            <h5 className="text-xl font-medium leading-normal text-black">
              {dishType}
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            ></button>
          </div>
          <div className="relative p-3 min-h-fit">
            {dishType === "Alacarte" && (
              <div className="flex-col">
                <div className="flex flex-wrap m-5 gap-3 justify-center items-center">
                  <Category item="Starters" />
                  <Category item="Vegetarian" />
                  <Category item="Lamb" />
                  <Category item="Chicken" />
                  <Category item="Tandoor" />
                  <Category item="Vegan" />
                  <Category item="Drinks" />
                </div>
                {showMenu && <MenuCardItems name={dishName} />}
              </div>
            )}

            {dishType === "Lunch" && (
              <div className="flex-col">
                <div className="flex flex-wrap m-5 gap-3 justify-center items-center">
                  <Category item="Maanantai" />
                  <Category item="Tiistai" />
                  <Category item="Keskiviikko" />
                  <Category item="Torstai" />
                  <Category item="Perjantai" />
                </div>
                {showMenu && <LunchMenu day={dishName} />}
              </div>
            )}

            {dishType === "Special" && <SpecialMenu dishName={special} />}
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-gray-200 p-4">
            <button
              id="ModelContainer"
              onClick={handleclosePopUp}
              type="button"
              className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
