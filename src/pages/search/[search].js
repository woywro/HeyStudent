import { Search } from "../../views/Search/Search";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useSearchContext } from "../../context/searchContext";

const SearchView = ({ data, find }) => {
  return <Search data={data} find={find} />;
};
export default SearchView;

export async function getServerSideProps(context) {
  const array = [];
  const colRef = collection(db, "Courses");
  const q = query(
    colRef,
    where("tags", "array-contains-any", [
      context.params.search.toString().replace("-", " "),
    ])
  );
  const docSnap = await getDocs(q);
  docSnap.forEach((doc) => {
    array.push(doc.data());
  });
  const data = array;
  const find = context.params.search.toString().replace("-", " ");

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}
