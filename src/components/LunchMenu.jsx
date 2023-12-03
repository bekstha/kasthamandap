import { useState } from "react";
import useFoodMenu from "../hooks/useFoodMenu";
import useLunchItems from "../hooks/useLunchItems";
import CardBody from "./ui/CardBody";
import CardHeader from "./ui/CardHeader";
import CardTitle from "./ui/CardTitle";
import Divider from "./ui/Divider";
import LoadingScreen from "./LoadingScreen";

const LunchMenu = ({ day }) => {
  const { weeklyLunch, loading } = useLunchItems();
  const { lunchItem } = useFoodMenu();

  const filteredMenu = lunchItem.filter(item => item.day.includes(day));

  const filterDescription = (desc) => {
    const startIndex = desc.indexOf(day); // Find the index of the day
    const endIndex = desc.indexOf('<div class="lunchHeader', startIndex); // Find the index of the next day header
    let filteredDesc = desc.slice(startIndex, endIndex).trim(); // Extract the portion between the day and the next header

    // Remove numbers like 1), 2), etc.
    filteredDesc = filteredDesc.replace(/\d+\)/g, "").trim();

    // Filter out any lines that contain "lounaan Hinta" and "lounas tarjolla"
    const lines = filteredDesc.split("<br>");
    const filteredLines = lines
      .filter(
        (line) =>
          !line.includes("lounaan Hinta") &&
          !line.includes("lounas tarjolla") &&
          !line.includes("kello") &&
          line.includes(" ")
      )
      .map(line => line.replace(/<\/?[^>]+(>|$)/g, "")
      .trim());

    return filteredLines;
  };

  return (
    <div>
      <CardTitle dishName={day}></CardTitle>
      {loading ? (
        <LoadingScreen />
      ) : weeklyLunch ? (
        <div className="p-3">
           <CardHeader dish="Lounaan Hinta" price={"12.50 \u20AC"} />
           <Divider />
          {filterDescription(weeklyLunch.desc).map((line, index) => (
            <div key={index} className="w-full bg-slate-100 p-3 mt-6 h-16 border shadow-md rounded-lg">
              <CardBody desc={line} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3">
           <CardHeader dish="Lounaan Hinta" price={"12.50 \u20AC"} />
           <Divider />
           {filteredMenu.map((item, index) => (
            <div key={index} className="w-full bg-slate-100 p-3 mt-6 shadow-md rounded-lg">
              <CardBody desc={item.description} />
            </div>
          ))}    
        </div>
      )}
      <hr className="my-6" />
    </div>
  );
};

export default LunchMenu;
