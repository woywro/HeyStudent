import { doc, getDocs, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export function handleAdd() {
  let newCourse = {
    willStudy: [],
    willStudyCount: 0,
    tags: ["bob budowniczy"],
    id: "",
    category: ["techniczne"],
    //od tąd
    name: "Budownictwo",
    maxPeople: "270",
    city: "Poznań",
    contact: "+48 61 665 23 62",
    degree: "I stopnia (licencjat)",
    type: "stacjonarne",
    university: "Politechnika Poznańska",
    website: "https://wilit.put.poznan.pl/",
    departament: "Wydział Inżynierii Lądowej i Transportu",
    description:
      "W ramach nowoczesnego programu studiów kursy geotechniki, konstrukcji stalowych, betonowych i drewnianych oraz budownictwa drogowego i mostowego poprzedzone są zajęciami z podstaw wytrzymałości materiałów, mechaniki budowli i mechaniki gruntów a także metod komputerowych. Na ostatnim semestrze studiów oferowane są zajęcia obieralne w celu dostosowania programu do indywidualnych zainteresowań studentów. W programie zawarte są także języki obce i obieralne przedmioty humanistyczne.",
    minPoints: { year: "2021/2022", value: "405" },
    name: ["Budownictwo"],
    recruitment: [
      {
        from: "2022-07-06",
        text: "Elektroniczna rejestracja",
        to: "2022-07-09",
      },
      {
        from: "2022-07-08",
        text: "Ogłoszenie listy rankingowej kandydatów",
        to: "2022-07-08",
      },
      { from: "2022-07-09", text: "Donoszenie dokumentów", to: "2022-07-15" },
      {
        from: "2022-07-16",
        text: "Ogłoszenie listy przyjętych na studia",
        to: "2022-07-16",
      },
    ],
    requiredSubjects: [
      { name: "język polski", level: "pp/pr" },
      { name: "matematyka", level: "pp/pr" },
      { name: "język obcy", level: "pp/pr" },
      { name: "biologia", level: "pp/pr" },
      { name: "chemia", level: "pp/pr" },
      { name: "fizyka", level: "pp/pr" },
      { name: "informatyka", level: "pp/pr" },
      { name: "geografia", level: "pp/pr" },
      { name: "historia", level: "pp/pr" },
      { name: "historia muzyki", level: "pp/pr" },
      { name: "historia sztuki", level: "pp/pr" },
      { name: "rysunek", level: "pp/pr" },
    ],
    subjects: [
      {
        name: "Wprowadzenie do projektowania budowli",
        description:
          "Niezbędny wstęp do do przedmiotów obejmujących podstawy projektowania nowoczesnych, niskoenergochłonnych i proekologicznych budynków, wprowadzenie do zagadnień projektowania budynków spełniających współczesne wymagania w zakresie racjonalnej ochrony cieplnej oraz wyposażenia instalacyjnego, ukierunkowane na zapewnienie właściwego mikroklimatu pomieszczeń o różnym przeznaczeniu.",
        hours: "30",
        ects: "5", //ilosc punktow ects
        year: "1",
      },
      {
        name: "Chemia budowlana",
        description:
          "Zapoznanie studentów z wybranymi zagadnieniami chemii ogólnej oraz podstawami chemii budowlanej ze  szczególnym uwzględnieniem właściwości chemicznych podstawowych składników materiałów budowlanych. Poznanie mechanizmów i reakcji chemicznych zachodzących podczas otrzymywania i wiązania spoiw budowlanych, a także użytkowania materiałów budowlanych w tym procesów korozji.",
        hours: "30",
        ects: "4", //ilosc punktow ects
        year: "1",
      },
      {
        name: "Fizyka",
        description:
          "Poznanie zjawisk i praw fizyki oraz właściwości materii w stopniu umożliwiającym studiowaniekierunkowych przedmiotów technicznch. Umiejętność pomiaru i określenia podstawowych wielkości fizycznych oraz  wykonanie sprawozdań z przeprowadzonych pomiarów.",
        hours: "30",
        ects: "3",
        year: "1",
      },
      {
        name: "Podstawy mechaniki",
        description:
          "Poznanie podstawowych praw i zasad mechaniki ogólnej oraz nabycie umiejętności ich zastosowania w badaniu ruchu prostych obiektów technicznych.",
        hours: "30",
        ects: "2",
        year: "1",
      },
    ],
  };
  function createTags(tags) {
    const actualTags = JSON.parse(JSON.stringify(newCourse.tags));
    tags.push(newCourse.city.toLowerCase());
    tags.push(
      ...newCourse.name
        .join(" ")
        .toLowerCase()
        .split(" ")
        .filter((e) => e !== "i")
    );
    var result1 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => v + " " + w)
    );
    var result2 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => w + " " + v)
    );
    const result = result1.concat(result2);
    result.push(newCourse.city.toLowerCase());
    result.push(newCourse.name.join(" ").toLowerCase());
    result.push(newCourse.university.toLowerCase());
    result.push(newCourse.category.toString());
    result.push(...actualTags);
    console.log(result);
    return result;
  }
  const random = Math.floor(Math.random() * 100000);
  newCourse.tags = createTags(newCourse.tags);
  // newCourse.willStudy = [];
  // newCourse.name = newCourse.name.split(" ");
  newCourse.id = random.toString();
  setDoc(doc(db, "Courses", newCourse.id), newCourse);
  console.log(newCourse);
}
