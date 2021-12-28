import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

export async function search(
  setLoading: (arg: boolean) => void,
  colToSearch: string,
  field: string,
  operator: string,
  value: string,
  whatToSet: any[]
) {
  setLoading(true);
  const array: any[] = [];
  const ref = collection(db, colToSearch);
  const q = query(ref, where(field, operator, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push(doc.data());
  });
  whatToSet(array);
  setLoading(false);
}
