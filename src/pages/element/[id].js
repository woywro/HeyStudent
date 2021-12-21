import { useRouter } from "next/router";
import { Element } from "../../views/Element/Element";
import { doc, getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect } from "react";
import { useState } from "react";

export default function elementPage({ data }) {
  const router = useRouter();

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
  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
