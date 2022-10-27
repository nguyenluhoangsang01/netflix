import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Movie } from "../types";

const useList = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = onSnapshot(
      collection(db, `users/${uid}/myList`),
      (snapshot) => {
        setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    return unsubscribe;
  }, [db, uid]);

  return list;
};

export default useList;
