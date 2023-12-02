
const CardHeader = ({ dish, price }) => {
  return (
    <div className="flex justify-between gap-10">
      <div><h2 className="text-lg font-semibold capitalize">{dish}</h2></div>
      <div><h2 className="text-lg font-semibold">{price}</h2></div>
    </div>
  );
};

export default CardHeader;
