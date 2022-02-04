import { Search } from "../../views/Search";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ItemType } from "../../types";

interface Props {
  data: ItemType[];
}

const SearchView = ({ data }: Props) => {
  return <Search data={data} />;
};
export default SearchView;

export async function getServerSideProps(context) {
  const data: ItemType[] = [];
  const tagArray = context.params.search.replace("-", " ").split(" ");
  if (tagArray.length == 1) {
    const colRef = collection(db, "Courses");
    const q = query(colRef, where(`tags1.${tagArray[0]}`, "==", true));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: { data },
    };
  } else if (tagArray.length == 2) {
    const colRef = collection(db, "Courses");
    const q = query(
      colRef,
      where(`tags1.${tagArray[0]}`, "==", true),
      where(`tags1.${tagArray[1]}`, "==", true)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: { data },
    };
  } else if (tagArray.length == 3) {
    const colRef = collection(db, "Courses");
    const q = query(
      colRef,
      where(`tags1.${tagArray[0]}`, "==", true),
      where(`tags1.${tagArray[1]}`, "==", true),
      where(`tags1.${tagArray[2]}`, "==", true)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: { data },
    };
  }
}
