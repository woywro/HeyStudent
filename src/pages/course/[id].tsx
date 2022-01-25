import { Element } from "../../views/Element";
import { getDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ItemType } from "../../types";

interface Props {
  data: ItemType;
}

export default function elementPage({ data }: Props) {
  return <Element data={data} />;
}

export async function getStaticProps(context) {
  const docRef = doc(db, "Courses", context.params.id.toString());
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const array: ItemType[] = [];
  const colRef = collection(db, "Courses");
  const docSnap = await getDocs(colRef);
  docSnap.forEach((doc) => {
    array.push(doc.data());
  });
  const paths = array.map((course) => ({
    params: { id: course.id },
  }));

  return { paths, fallback: false };
}
