import React from 'react'
import CardHeader from './ui/CardHeader';
import Divider from './ui/Divider';

const SpecialMenu = ({dishName}) => {

    const DishItems = ({itemName}) => {
        return (
            <React.Fragment>
                <div className="bg-slate-100 p-3 mb-5 shadow-md rounded-lg">
                <CardHeader dish={itemName} />
                <Divider />
                <div style={{ display: 'flex' }}>
                {dishName[itemName].map((item, index) => (
                    <React.Fragment key={index}>
                    <p className='capitalize mb-3'>{item}</p>
                    {index < dishName[itemName].length - 1 && <span>,&nbsp; </span>}
                    </React.Fragment>
                ))}
                </div>
            </div>
            </React.Fragment>
        )
    };
    return (
        <div className='p-3'>
            <div className='flex justify-center text-2xl mb-5'>
                <h1 className="font-bold capitalize">{dishName.title}</h1>
            </div>
            <div className='flex justify-center text-md mb-6'>
                <h3>hinta {dishName.price[0] } {`\u20AC`}, {dishName.price[1]} {`\u20AC`} lapset(6-12v), {dishName.price[2]} {`\u20AC`} lapset(3-5v) </h3>
            </div>

            <DishItems itemName={"starters"} />
            <DishItems itemName={"lightbites"} />
            <DishItems itemName={"maincourse"} />
            <DishItems itemName={"desserts"} />
            <DishItems itemName={"beverage"} />

        </div>
    )
};

export default SpecialMenu
