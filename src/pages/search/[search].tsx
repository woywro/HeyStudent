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

  const createQuery = () => {
    const colRef = collection(db, "Courses");
    if (tagArray.length == 1) {
      return query(colRef, where(`tags.${tagArray[0]}`, "==", true));
    } else if (tagArray.length == 2) {
      return query(
        colRef,
        where(`tags.${tagArray[0]}`, "==", true),
        where(`tags.${tagArray[1]}`, "==", true)
      );
    } else if (tagArray.length == 3) {
      return query(
        colRef,
        where(`tags.${tagArray[0]}`, "==", true),
        where(`tags.${tagArray[1]}`, "==", true),
        where(`tags.${tagArray[2]}`, "==", true)
      );
    }
  };

  const q = createQuery();
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
