import React from "react";
import Card from "./ui/Card";
import CardHeader from "./ui/CardHeader";
import CardBody from "./ui/CardBody";
import Divider from "./ui/Divider";
import CardTitle from "./ui/CardTitle";
import useFoodMenu from "../hooks/useFoodMenu";

const MenuCard = ({ name }) => {
  const { starters, chickenDish, lambDish, vegDish, tandoorDish, veganFood } =
    useFoodMenu();

  return (
    <Card>
      <CardTitle dishName={name}></CardTitle>
      {name === "Starters" &&
        starters.map((starter, index) => (
          <React.Fragment key={index}>
            <CardHeader dish={starter.title} price={starter.price} />
            <Divider />
            <CardBody desc={starter.description} />
          </React.Fragment>
        ))}

      {name === "Vegetarian Dishes" &&
        vegDish.map((veg, index) => (
          <React.Fragment key={index}>
            <CardHeader dish={veg.title} price={veg.price} />
            <Divider />
            <CardBody desc={veg.description} />
          </React.Fragment>
        ))}

      {name === "Lamb Dishes" &&
        lambDish.map((lamb, index) => (
          <React.Fragment key={index}>
            <CardHeader dish={lamb.title} price={lamb.price} />
            <Divider />
            <CardBody desc={lamb.description} />
          </React.Fragment>
        ))}

      {name === "Chicken Dishes" &&
        chickenDish.map((chicken, index) => (
          <React.Fragment key={index}>
            <CardHeader dish={chicken.title} price={chicken.price} />
            <Divider />
            <CardBody desc={chicken.description} />
          </React.Fragment>
        ))}

      {name === "Tandoor Dishes" &&
        tandoorDish.map((tandoor, index) => (
          <React.Fragment key={index}>
            <CardHeader dish={tandoor.title} price={tandoor.price} />
            <Divider />
            <CardBody desc={tandoor.description} />
          </React.Fragment>
        ))}

      {name === "Vegan Dishes" &&
        veganFood.map((veganfood, index) => (
          <React.Fragment key={index}>
            <CardHeader dish={veganfood.title} price={veganfood.price} />
            <Divider />
            <CardBody desc={veganfood.description} />
          </React.Fragment>
        ))}
    </Card>
  );
};

export default MenuCard;
