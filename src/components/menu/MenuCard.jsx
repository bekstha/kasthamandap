import {Card, CardTitle} from "../ui/Card";

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