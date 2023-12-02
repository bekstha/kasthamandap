import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function useFoodMenu() {
  const [starters, setStarters] = useState([]);
  const [chickenDish, setChickenDish] = useState([]);
  const [lambDish, setLambDish] = useState([]);
  const [vegDish, setVegDish] = useState([]);
  const [tandoorDish, setTandoorDish] = useState([]);
  const [veganFood, setVeganFood] = useState([]);
  const [lunchItem, setLunchItem] = useState([]);
  const [alaCarte, setAlaCarte] = useState([]);

  const aLaCarteRef = collection(db, "A_La_Carte");
  const lunchMenuRef = collection(db, "LunchMenu");

  useEffect(() => {
    getFoodList();
    getLunchList();
  }, []);

  const getLunchList = async () => {
    try {
      const food = await getDocs(lunchMenuRef);
      const filteredFood = food.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLunchItem(filteredFood)

    } catch (error) {
      console.error(error);
    }
  };

  const getFoodList = async () => {
    try {
      const food = await getDocs(aLaCarteRef);
      const filteredFood = food.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAlaCarte(filteredFood)

    } catch (error) {
      console.error(error);
    }
  };

  return { lunchItem, alaCarte };
}

export default useFoodMenu;
