const CardTitle = ({ dishName }) => {
  return (
    <h2 className="text-md font-nanum font-bold underline underline-offset-8 leading-relaxed text-3xl text-center mb-5">
      {dishName}
    </h2>
  );
};

export default CardTitle;
