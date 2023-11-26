import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  query,
  onSnapshot,
  where,
  writeBatch,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Reviewers")); // Assuming "Reviewers" is the collection for users
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
      await deleteDoc(doc(db, "Reviewers", email)); // Assuming "Reviewers" is the collection for users
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

  // Add more CRUD operations as needed

  return { users, deleteUser, addUser }; // Add more functions as needed
};

export default useUsers;
