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
  const colRef = collection(db, "Courses");
  const q = query(
    colRef,
    where("tags", "array-contains-any", [
      context.params.search.toString().replace("-", " "),
    ])
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
