import { doc, getDocs, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export function handleAdd() {
  let newCourse = {};
  function createTags(tags, nc) {
    let tagsCopy = JSON.parse(JSON.stringify(tags));
    tags.push(nc.city);
    const toDelete = ["i", "w"];
    tags.push(...nc.name.filter((e) => !toDelete.includes(e)));
    var result1 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => v + " " + w)
    );
    var result2 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => w + " " + v)
    );
    tags.push(nc.name.join(" "));
    let result = result1.concat(result2);
    result.push(...tagsCopy);
    result.push(nc.city);
    result.push(nc.name.join(" "));
    result.push(nc.university);
    result.push(nc.category);
    result.push(`${nc.category} ${nc.city}`);
    result.push(`${nc.city} ${nc.category}`);
    result.push(`${nc.city} ${nc.name.join(" ")}`);
    result.push(`${nc.name.join(" ")} ${nc.city}`);
    result = result.map((e) => e.toLowerCase());
    return result;
  }
  function handleSubmitAll() {
    const random = Math.floor(Math.random() * 100000);
    const nc = newCourse;
    // nc.subjects = ;
    nc.tags = createTags(nc.tags, nc);
    nc.id = random.toString();
    nc.category = [nc.category];
    nc.willStudy = [];
    nc.willStudyCount = 0;
    console.log(newCourse.tags);
    setDoc(doc(db, "Courses", random.toString()), newCourse);
  }
  handleSubmitAll();
}
