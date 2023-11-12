
const CardHeader = ({ dish, price }) => {
  return (
    <div className="flex justify-between">
      <div><h2 className="basis-1/2 text-md font-semibold">{dish}</h2></div>
      <div><h2 className="basis-1/2 text-md font-semibold">{price}</h2></div>
    </div>
  );
};

export default CardHeader;
