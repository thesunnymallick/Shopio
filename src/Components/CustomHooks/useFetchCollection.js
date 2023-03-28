import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../Firebase/config";

const useFetchCollection = (colllectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get Collection form firebase
  useEffect(() => {
    const GetCollection = () => {
      setIsLoading(true);
      try {
        const DocRef = collection(db, colllectionName);
        const q = query(DocRef, orderBy("CreateAt", "desc"));

        onSnapshot(q, (snapshot) => {
          const AllData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(AllData);
          setIsLoading(false);
        });
      } catch (error) {
        toast(error.message);
        setIsLoading(false);
      }
    };
    GetCollection();
  }, [colllectionName]);
  return { data, isLoading };
};
export default useFetchCollection;
