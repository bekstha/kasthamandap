import { useEffect, useState } from "react";
import LunchMenu from "./LunchMenu";
import MenuCardItems from "./MenuCardItems";
import SpecialMenu from "./SpecialMenu";
import Button from "../ui/Button";
import { Modal } from "antd";
import useLunchItems from "../../hooks/useLunchItems";

const MenuModal = ({ dishType, special, hideModal, isOpen }) => {

  const { weeklyLunch, loading } = useLunchItems();
  const dateRangeMatch = weeklyLunch?.header.match(/\d+\.\d+\.\s*-\s*\d+\.\d+/);
  const dateRange = dateRangeMatch ? dateRangeMatch[0] : null;

  const d = new Date();
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

  const categoryMapping = {
    Lunch: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"],
    Alacarte: [
      "Starters",
      "Vegetarian",
      "Lamb",
      "Chicken",
      "Tandoor",
      "Vegan",
      "Drinks",
    ],
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
    setDishName(name);
  };

  const Category = ({ item }) => {
    return (
      <div className="">
        <button
          onClick={() => handleCardClick(item)}
          type="button"
          className={`italic rounded-md md:text-lg text-base px-2 py-1 border ${
            dishName === item ? "bg-green-500 text-white animate-wiggle" : ""
          }`}
        >
          {item}
        </button>
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      onOk={hideModal}
      onCancel={hideModal}
      title={
        dishType === "Lunch"
          ? `${dishType} ( ${dateRange || "No Date"})`
          : dishType
      }
      width={700}
      footer={() => (
        <Button
          size="small"
          outlined
          color="transparent"
          className="!text-black flex-1 border-gray-200"
          onClick={hideModal}
          hover="red"
        >
          Close
        </Button>
      )}
    >
      <hr />

      {dishType === "Lunch" && (
        <div className="flex-col">
          <div className="flex flex-wrap m-5 gap-3 justify-center items-center">
          {categoryMapping[dishType].map((item, index) => (
              <Category key={index} item={item} />
            ))}
          </div>
          <LunchMenu day={dishName} />
        </div>
      )}

      {dishType === "Alacarte" && (
        <div className="flex-col">
          <div className="flex flex-wrap m-5 gap-3 justify-center items-center">
            {categoryMapping[dishType].map((item, index) => (
              <Category key={index} item={item} />
            ))}
          </div>
          <MenuCardItems itemName={dishName} />
        </div>
      )}

      {dishType === "Special Menu" && <SpecialMenu dishName={special} />}
    </Modal>
  );
};

export default MenuModal;
