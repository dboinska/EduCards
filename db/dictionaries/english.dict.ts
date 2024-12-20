import { Dictionary, Category } from "./types"

const fruits: Category = {
  category: "Fruits",
  data: [
    { term: "Apple", termTranslated: "Jabłko" },
    { term: "Banana", termTranslated: "Banan" },
    { term: "Cherry", termTranslated: "Wiśnia" },
    { term: "Date", termTranslated: "Daktyl" },
    { term: "Grape", termTranslated: "Winogrono" },
    { term: "Lemon", termTranslated: "Cytryna" },
    { term: "Orange", termTranslated: "Pomarańcza" },
    { term: "Peach", termTranslated: "Brzoskwinia" },
    { term: "Pear", termTranslated: "Gruszka" },
    { term: "Strawberry", termTranslated: "Truskawka" },
  ],
}

const dailyRoutine: Category = {
  category: "Daily routine",
  data: [
    { term: "Wake up", termTranslated: "Wstać" },
    { term: "Get up", termTranslated: "Wstać" },
    { term: "Brush teeth", termTranslated: "Umyć zęby" },
    { term: "Take a shower", termTranslated: "Wziąć prysznic" },
    { term: "Have breakfast", termTranslated: "Zjeść śniadanie" },
    { term: "Go to work", termTranslated: "Iść do pracy" },
    { term: "Have lunch", termTranslated: "Zjeść obiad" },
    { term: "Go home", termTranslated: "Iść do domu" },
    { term: "Have dinner", termTranslated: "Zjeść kolację" },
    { term: "Go to bed", termTranslated: "Iść spać" },
  ],
}

const adjectives: Category = {
  category: "Adjectives",
  data: [
    { term: "Beautiful", termTranslated: "Piękny" },
    { term: "Big", termTranslated: "Duży" },
    { term: "Small", termTranslated: "Mały" },
    { term: "Tall", termTranslated: "Wysoki" },
    { term: "Short", termTranslated: "Niski" },
    { term: "Fat", termTranslated: "Gruby" },
    { term: "Thin", termTranslated: "Chudy" },
    { term: "Ugly", termTranslated: "Brzydki" },
    { term: "Handsome", termTranslated: "Przystojny" },
    { term: "Pretty", termTranslated: "Ładny" },
  ],
}

const publicTransport: Category = {
  category: "Public transport",
  data: [
    { term: "Bus", termTranslated: "Autobus" },
    { term: "Tram", termTranslated: "Tramwaj" },
    { term: "Train", termTranslated: "Pociąg" },
    { term: "Metro", termTranslated: "Metro" },
    { term: "Taxi", termTranslated: "Taxi" },
    { term: "Bicycle", termTranslated: "Rower" },
    { term: "Car", termTranslated: "Samochód" },
    { term: "Motorcycle", termTranslated: "Motocykl" },
    { term: "Scooter", termTranslated: "Hulajnoga" },
    { term: "Boat", termTranslated: "Łódź" },
  ],
}

const feelings: Category = {
  category: "Feelings",
  data: [
    { term: "Happy", termTranslated: "Szczęśliwy" },
    { term: "Sad", termTranslated: "Smutny" },
    { term: "Angry", termTranslated: "Zły" },
    { term: "Surprised", termTranslated: "Zaskoczony" },
    { term: "Tired", termTranslated: "Zmęczony" },
    { term: "Excited", termTranslated: "Podekscytowany" },
    { term: "Bored", termTranslated: "Znudzony" },
    { term: "Nervous", termTranslated: "Zdenerwowany" },
    { term: "Calm", termTranslated: "Spokojny" },
    { term: "Confused", termTranslated: "Zdezorientowany" },
  ],
}

const dictionary: Dictionary = {
  language: "English",
  categories: [fruits, dailyRoutine, adjectives, publicTransport, feelings],
}

export default dictionary
