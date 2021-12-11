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
  },
  {
    element: "city",
    label: "miasto",
    helpText: "wpisz nazwę miasta",
    type: "select",
    options: ["Gdańsk", "Poznań"],
  },
  {
    element: "type",
    label: "typ studiów",
    helpText: "wpisz typ studiów (stacjonarne/zaoczne)",
    type: "select",
    options: ["stacjonarne", "zaoczne"],
  },
  {
    element: "degree",
    label: "poziom studiów",
    helpText: "wpisz poziom studiów (licencjat/magister)",
    type: "select",
    options: ["licencjat", "magister", "inżynier"],
  },
  {
    element: "website",
    label: "strona internetowa",
    helpText: "wpisz adres strony wydziału",
    validation: { required: "adres strony jest wymagany" },
    type: "input",
  },
  {
    element: "maxPeople",
    label: "liczba miejsc",
    helpText: "wpisz liczbę miejsc na kierunku",
    validation: { required: "adres strony jest wymagany" },
    type: "input",
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
  },
  {
    element: "minPoints",
    label: "próg punktowy",
    helpText: "zeszłoroczny próg punktowy",
    type: "input",
    validation: { required: "próg jest wymagany" },
  },
  {
    element: "requiredSubjects",
    label: "wymagane przedmioty",
    helpText: "Wymagane przedmioty np. (fizyka pr, matematyka pr, polski pp)",
    validation: { required: "przedmioty są wymagane" },
    type: "input",
  },
  {
    element: "tags",
    label: "tagi kierunku",
    helpText: "tagi dla kierunku",
    type: "input",
  },
  {
    element: "category",
    label: "kategoria studiów",
    helpText: "wpisz kategorie studiów",
    type: "select",
    options: ["informatyczne", "ekonomiczne", "techniczne"],
  },
];

export const subjectInputs = [
  {
    element: "name",
    label: "nazwa",
    helpText: "wpisz nazwę przedmiotu",
  },
  {
    element: "hours",
    label: "ilość godzin",
    helpText: "wpisz ilość godzin",
  },
  {
    element: "ects",
    label: "punkty ects",
    helpText: "wpisz ilość punktów ects",
  },
  {
    element: "year",
    label: "semsestr studiów",
    helpText: "wpisz semestr na którym będą odpywały się zajęcia",
  },
  {
    element: "description",
    label: "opis przedmiotu",
    helpText: "opisz przedmiot w 3 zdaniach",
  },
];
