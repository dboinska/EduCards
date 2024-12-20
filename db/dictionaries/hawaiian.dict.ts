import { Dictionary, Category } from "./types"

const fruits: Category = {
  category: "Fruits",
  data: [
    { term: "ʻĀpala", termTranslated: "Jabłko" },
    { term: "Maiʻa", termTranslated: "Banan" },
    { term: "ʻŌhelo", termTranslated: "Wiśnia" },
    { term: "Lāʻau", termTranslated: "Daktyl" },
    { term: "Hua waina", termTranslated: "Winogrono" },
    { term: "Lemi", termTranslated: "Cytryna" },
    { term: "ʻAlani", termTranslated: "Pomarańcza" },
    { term: "Pīkake", termTranslated: "Brzoskwinia" },
    { term: "Pea", termTranslated: "Gruszka" },
    { term: "ʻŌhelo papa", termTranslated: "Truskawka" },
  ],
}

const dailyRoutine: Category = {
  category: "Daily routine",
  data: [
    { term: "ʻAla", termTranslated: "Wstać" },
    { term: "E ala", termTranslated: "Wstać" },
    { term: "Palaki niho", termTranslated: "Umyć zęby" },
    { term: "ʻAuʻau", termTranslated: "Wziąć prysznic" },
    { term: "ʻAi kakahiaka", termTranslated: "Zjeść śniadanie" },
    { term: "Hele i ka hana", termTranslated: "Iść do pracy" },
    { term: "ʻAi awakea", termTranslated: "Zjeść obiad" },
    { term: "Hele i ka hale", termTranslated: "Iść do domu" },
    { term: "ʻAi ahiahi", termTranslated: "Zjeść kolację" },
    { term: "Hele i ka moe", termTranslated: "Iść spać" },
  ],
}

const adjectives: Category = {
  category: "Adjectives",
  data: [
    { term: "Nani", termTranslated: "Piękny" },
    { term: "Nui", termTranslated: "Duży" },
    { term: "Liʻiliʻi", termTranslated: "Mały" },
    { term: "Lōʻihi", termTranslated: "Wysoki" },
    { term: "Pōkole", termTranslated: "Niski" },
    { term: "Momona", termTranslated: "Gruby" },
    { term: "Wīwī", termTranslated: "Chudy" },
    { term: "ʻAnoʻano", termTranslated: "Brzydki" },
    { term: "ʻOluʻolu", termTranslated: "Przystojny" },
    { term: "Nani", termTranslated: "Ładny" },
  ],
}

const publicTransport: Category = {
  category: "Public transport",
  data: [
    { term: "Kaʻa ʻōhua", termTranslated: "Autobus" },
    { term: "Kaʻa huila", termTranslated: "Tramwaj" },
    { term: "Kaʻaahi", termTranslated: "Pociąg" },
    { term: "Kaʻa ʻōhua kūikawā", termTranslated: "Taksówka" },
    { term: "Paikikala", termTranslated: "Rower" },
    { term: "Kaʻa", termTranslated: "Samochód" },
    { term: "Kaʻa pahū", termTranslated: "Motocykl" },
    { term: "Moku", termTranslated: "Łódź" },
    { term: "Mokulele", termTranslated: "Samolot" },
    { term: "Kaʻa ʻōhua lalo", termTranslated: "Metro" },
  ],
}

const dictionary: Dictionary = {
  language: "Hawaiian",
  categories: [fruits, dailyRoutine, adjectives, publicTransport],
}

export default dictionary
