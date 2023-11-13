import Card from "./ui/Card";
import CardTitle from "./ui/CardTitle";

const MenuCard = ({ name }) => {

  return (
    <>
      <Card>
        <CardTitle dishName={name} ></CardTitle>
      </Card>
    </>
  );
};

export default MenuCard;