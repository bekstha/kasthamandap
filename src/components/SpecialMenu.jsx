import React from 'react'
import CardHeader from './ui/CardHeader';
import Divider from './ui/Divider';

const SpecialMenu = ({dishName}) => {

    const DishItems = ({itemName}) => {
        return (
            <React.Fragment>
                <div className="bg-slate-100 p-2 mt-5 shadow-md rounded-lg">
                <CardHeader dish={itemName} />
                <Divider />
                <div style={{ display: 'flex' }}>
                {dishName[itemName].map((item, index) => (
                    <React.Fragment key={index}>
                    <p className='capitalize'>{item}</p>
                    {index < dishName[itemName].length - 1 && <span>,&nbsp; </span>}
                    </React.Fragment>
                ))}
                </div>
            </div>
            </React.Fragment>
        )
    };
    return (
        <>
            <CardHeader dish={dishName.title} />
            <DishItems itemName={"starters"} />
            <DishItems itemName={"lightbites"} />
            <DishItems itemName={"maincourse"} />
            <DishItems itemName={"desserts"} />
            <DishItems itemName={"beverage"} />

        </>
    )
};

export default SpecialMenu
