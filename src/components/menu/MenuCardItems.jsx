import React from "react";
import useFoodMenu from "../../hooks/useFoodMenu";
import { CardBody } from "../ui/Card";
import { CardHeader } from "../ui/Card";
import Divider from "../ui/Divider";

const MenuCardItems = ({ itemName }) => {
  const { alaCarte } = useFoodMenu();

  const checkGLP = (itemName) => {
    const components = [];
  
    if (itemName.gluten_free) components.push("G");
    if (itemName.lactose_free) components.push("L");
    if (itemName.nut_free) components.push("P");
  
    return `(${components.join(', ')})`;
  };

  const DishItems = ({ dishName, index }) => {
    const valueGLP = checkGLP(dishName);
    return (
      <React.Fragment key={index}>
        <div className="bg-slate-100 p-3 mt-6 border shadow-md rounded-lg">
          <CardHeader dish={dishName.title + " " + valueGLP} price={dishName.price + `\u20AC`} />
          <Divider />
          <CardBody desc={dishName.description} />
        </div>
      </React.Fragment>
    );
  };

  const itemFilters = {
    Starters: "starter",
    Vegetarian: "veg_dish",
    Lamb: "lamb_dish",
    Chicken: "chicken_dish",
    Tandoor: "tandoor_dish",
    Vegan: "vegan",
    Drinks: "drinks",
  };

  const filteredItems = alaCarte
    .filter((item) => item[itemFilters[itemName]])
    .map((filteredItem, index) => (
      <DishItems dishName={filteredItem} key={index} />
    ));

  return (
    <div className="w-full p-3 transform slide-in-down">
      {filteredItems.length > 0 ? (
        filteredItems
      ) : (
        <p className="flex justify-center font-bold text-2xl text-orange-400">
          No menu found for {itemName}.
        </p>
      )}
      <hr className="mt-10" />
    </div>
  );
};

export default MenuCardItems;
