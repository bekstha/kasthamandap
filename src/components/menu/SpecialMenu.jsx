import React from "react";
import { CardHeader } from "../ui/Card";
import Divider from "../ui/Divider";

const SpecialMenu = ({ dishName }) => {
  const DishItems = ({ itemName }) => {
    return (
      <React.Fragment>
        <div className="bg-slate-100 p-3 w-full mt-6 border shadow-md rounded-lg h-fit">
          <CardHeader dish={itemName} />
          <Divider />
          <div style={{ display: "flex", flexWrap: "wrap"}}>
            {dishName[itemName].map((item, index) => (
              <React.Fragment key={index}>
                <p className="capitalize">{item}</p>
                {index < dishName[itemName].length - 1 && <span>,&nbsp; </span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  };
  return (
    <div className="p-3">
      <div className="flex justify-center text-base sm:text-2xl mb-5">
        <h1 className="font-bold capitalize">{dishName.title}</h1>
      </div>
      <div className="flex justify-center text-sm sm:text-lg mb-6">
        <p>
          hinta {dishName.price[0]} {`\u20AC`}, lapset(6-12v){" "}
          {dishName.price[1]} {`\u20AC`}, lapset(3-5v) {dishName.price[2]}{" "}
          {`\u20AC`}{" "}
        </p>
      </div>
      <DishItems itemName={"starters"} />
      <DishItems itemName={"lightbites"} />
      <DishItems itemName={"maincourse"} />
      <DishItems itemName={"desserts"} />
      <DishItems itemName={"beverage"} />
      <hr className="mt-10" />
    </div>
  );
};

export default SpecialMenu;
