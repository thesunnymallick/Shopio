import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../Firebase/config";

function useFetchDocument(collectionName, documentId) {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState([]);

  // Get Document from firebase
  useEffect(() => {
    const GetDocument = async () => {
      setIsLoading(true);
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = {
          id: documentId,
          ...docSnap.data(),
        };

        setIsLoading(false);
        setDocument(obj);
      } else {
        setIsLoading(false);
        toast.error("No Document Found");
      }
    };
    GetDocument();
  }, [collectionName, documentId]);

  return { document, isLoading };
}

export default useFetchDocument;
