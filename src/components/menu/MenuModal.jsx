import React, { useEffect, useState } from "react";
import LunchMenu from "./LunchMenu";
import MenuCardItems from "./MenuCardItems";
import SpecialMenu from "./SpecialMenu";
import Button from "../ui/Button";
import { Modal } from "antd";

const MenuModal = ({ dishType, special, hideModal, isOpen }) => {
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
          className={`font-medium italic rounded-md text-sm sm:text-base px-1 py-1 border border-black ${
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
      title={dishType}
      width={700}
      footer={() => (
        <Button
          size="small"
          outlined
          color="orange"
          className="!text-black flex-1 border-gray-600"
          onClick={hideModal}
        >
          Cancel
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
