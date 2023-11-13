import React from "react";
import useFoodMenu from "../hooks/useFoodMenu";
import CardBody from "../components/ui/CardBody";
import CardHeader from "../components/ui/CardHeader";
import CardTitle from "../components/ui/CardTitle";
import Divider from "../components/ui/Divider";

const MenuCardItems = ({name}) => {
    const { starters, chickenDish, lambDish, vegDish, tandoorDish, veganFood } = useFoodMenu();

    const DishItems = ({dishName, index}) => {
        return (
            <React.Fragment key={index}>
                <div className="bg-slate-100 p-2 mt-3 shadow-md rounded-lg">
                    <CardHeader dish={dishName.title} price={dishName.price} />
                    <Divider />
                    <CardBody desc={dishName.description} />
                </div>
            </React.Fragment>
        )
    }
    return(
      <div className="w-full p-3">
        <CardTitle dishName={name}></CardTitle>
        {name === "Starters" &&
            starters.map((starter, index) => (
            <DishItems dishName={starter} key={index} />
        ))}

        {name === "Vegetarian" &&
            vegDish.map((veg, index) => (
            <DishItems dishName={veg} key={index} />
        ))}

        {name === "Lamb" &&
            lambDish.map((lamb, index) => (
                <DishItems dishName={lamb} key={index} />
        ))}

        {name === "Chicken" &&
            chickenDish.map((chicken, index) => (
                <DishItems dishName={chicken} key={index} />
        ))}

        {name === "Tandoor" &&
            tandoorDish.map((tandoor, index) => (
                <DishItems dishName={tandoor} key={index} />
        ))}

        {name === "Vegan" &&
            veganFood.map((veganfood, index) => (
                <DishItems dishName={veganfood} key={index} />
        ))}
      </div>
    )
};

export default MenuCardItems