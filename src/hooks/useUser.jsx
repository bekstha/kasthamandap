import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Reviewers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let userArr = [];
      querySnapshot.forEach((doc) => {
        userArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userArr);
    });
    return () => unsubscribe();
  }, []);

  const deleteUser = async (email) => {
    try {
      await deleteDoc(doc(db, "Reviewers", email));
      console.log("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const addUser = async (userId, email, name, emailVerified) => {
    try {
      await addDoc(collection(db, "Reviewers"), {
        
          userId,
          email,
          name,
          emailVerified
        
      });
      console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  return { users, deleteUser, addUser };
};

export default useUsers;
