import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  query,
  onSnapshot,
  getDoc,
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
      const userRef = doc(db, "Reviewers", email);

      // Check if the document exists before attempting to delete
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        await deleteDoc(userRef);
        console.log("User deleted successfully!");
      } else {
        console.log("User does not exist!");
      }
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
        emailVerified,
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
