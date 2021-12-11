import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

export async function search(
  setLoading,
  colToSearch,
  field,
  operator,
  value,
  whatToSet
) {
  setLoading(true);
  const array = [];
  const ref = collection(db, colToSearch);
  const q = query(ref, where(field, operator, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push(doc.data());
  });
  whatToSet(array);
  setLoading(false);
}
