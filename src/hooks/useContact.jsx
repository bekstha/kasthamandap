import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const useContact = () => {
  const [contact, setcontact] = useState([]);
  const contactInfo = collection(db, "ContactInformation");

  useEffect(() => {
    const getcontact = async () => {
      try {
        const data = await getDocs(contactInfo);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setcontact(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getcontact();
  }, []);

  return { contact };
};

export default useContact;
