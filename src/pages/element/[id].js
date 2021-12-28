import { Element } from "../../views/Element/Element";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function elementPage({ data }) {
  return <Element data={data} />;
}
export async function getServerSideProps(context) {
  const array = [];
  const colRef = collection(db, "Courses");
  const q = query(colRef, where("id", "==", context.params.id.toString()));
  const docSnap = await getDocs(q);
  docSnap.forEach((doc) => {
    array.push(doc.data());
  });
  const data = array[0];
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}
