const Card = ({ children }) => {
  let cardClasses =
    "block flex-1 basis-1/4 h-96 w-full overflow-auto p-4 m-10 rounded-md bg-gray-300 ";

  return <div className={cardClasses}>{children}</div>;
};

const CardBody = ({ desc }) => (
  <p className="text-sm italic tracking-wide mb-6">{desc}</p>
);

const CardHeader = ({ dish, price }) => {
  return (
    <div className="flex justify-between gap-10">
      <div><h2 className="text-lg font-semibold capitalize">{dish}</h2></div>
      <div><h2 className="text-lg font-semibold">{price}</h2></div>
    </div>
  );
};

const CardTitle = ({ dishName }) => {
  return (
    <h2 className="text-md font-nanum font-bold underline underline-offset-8 leading-relaxed text-3xl text-center mb-5">
      {dishName}
    </h2>
  );
};


export  { Card, CardBody, CardHeader, CardTitle };


