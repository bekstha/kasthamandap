const Card = ({ children }) => {
  let cardClasses =
    "block flex-1 basis-1/4 h-96 w-full overflow-auto p-4 m-10 rounded-md bg-gray-300 ";

  return <div className={cardClasses}>{children}</div>;
};

export default Card;
