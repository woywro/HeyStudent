export const generalInfoInputs = [
  {
    element: "name",
    label: "nazwa kierunku",
    helpText: "wpisz nazwę kierunku",
    errorText: "pole wymagane",
    validation: {
      required: "nazwa kierunku jest wymagana",
      maxLength: {
        value: 30,
        message: "za długie",
      },
    },
    type: "input",
    value: "Informatyka",
  },
  {
    element: "university",
    label: "uniwersytet",
    helpText: "wpisz nazwę uniwersytetu",
    errorText: "pole wymagane",
    validation: {
      required: "nazwa uniwersytetu jest wymagana",
      minLength: {
        value: 5,
        message: "za krótkie",
      },
      maxLength: {
        value: 40,
        message: "za długie",
      },
    },
    type: "input",
    value: "Uniwersytet Gdański",
  },
  {
    element: "departament",
    label: "nazwa wydziału",
    helpText: "wpisz nazwę wydziału",
    errorText: "pole wymagane",
    validation: {
      required: "nazwa wydziału jest wymagana",
      minLength: {
        value: 5,
        message: "za krótkie",
      },
      maxLength: {
        value: 40,
        message: "za długie",
      },
    },
    type: "input",
    value: "Wydział informatyki",
  },
  {
    element: "city",
    label: "miasto",
    helpText: "wybierz miasto",
    type: "select",
    options: ["Gdańsk", "Poznań"],
    value: "Gdańsk",
  },
  {
    element: "type",
    label: "typ studiów",
    helpText: "wybierz typ studiów (stacjonarne/zaoczne)",
    type: "select",
    options: ["stacjonarne", "zaoczne"],
    value: "stacjonarne",
  },
  {
    element: "degree",
    label: "poziom studiów",
    helpText: "wybierz poziom studiów (licencjat/magister)",
    type: "select",
    options: ["licencjat", "magister", "inżynier"],
    value: "licencjat",
  },
  {
    element: "website",
    label: "strona internetowa",
    helpText: "wpisz adres strony wydziału",
    validation: { required: "adres strony jest wymagany" },
    type: "input",
    value: "https://mfi.ug.edu.pl/",
  },
  {
    element: "maxPeople",
    label: "liczba miejsc",
    helpText: "wpisz liczbę miejsc na kierunku",
    validation: { required: "adres strony jest wymagany" },
    type: "input",
    value: "300",
  },
  {
    element: "description",
    label: "opis kierunku",
    helpText: "Opisz kierunek w kliku zdaniach (max 100 znaków)",
    validation: {
      required: "opis jest wymagany",
      minLength: {
        value: 5,
        message: "za krótkie",
      },
      maxLength: {
        value: 100,
        message: "za długie",
      },
    },
    type: "input",
    value: "to jest opis kierunku informatyka",
  },
  {
    element: "minPoints",
    label: "próg punktowy",
    helpText: "zeszłoroczny próg punktowy",
    type: "input",
    validation: { required: "próg jest wymagany" },
    value: "150",
  },
  {
    element: "requiredSubjects",
    label: "wymagane przedmioty",
    helpText: "Wymagane przedmioty np. (fizyka pr, matematyka pr, polski pp)",
    validation: { required: "przedmioty są wymagane" },
    type: "input",
    value: ["matematyka pr/fizyka pr/informatyka pr"],
  },
  {
    element: "tags",
    label: "tagi kierunku",
    helpText: "tagi dla kierunku",
    type: "input",
    value: "programowanie/Java",
  },
  {
    element: "category",
    label: "kategoria studiów",
    helpText: "wybierz kategorie studiów",
    type: "select",
    options: ["informatyczne", "ekonomiczne", "techniczne"],
    value: "informatyczne",
  },
];

export const subjectInputs = [
  {
    element: "name",
    label: "nazwa",
    helpText: "wpisz nazwę przedmiotu",
    value: "matematyka",
  },
  {
    element: "hours",
    label: "ilość godzin",
    helpText: "wpisz ilość godzin",
    value: 30,
  },
  {
    element: "ects",
    label: "punkty ects",
    helpText: "wpisz ilość punktów ects",
    value: 2,
  },
  {
    element: "year",
    label: "semsestr studiów",
    helpText: "wpisz semestr na którym będą odpywały się zajęcia",
    value: 2,
  },
  {
    element: "description",
    label: "opis przedmiotu",
    helpText: "opisz przedmiot w 3 zdaniach",
    value: "to jest opis przedmiotu, który jest spoko",
  },
];