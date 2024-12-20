import { Dictionary, Category } from "./types"

const fruits: Category = {
  category: "Fruits",
  data: [
    { term: "Manzana", termTranslated: "Jabłko" },
    { term: "Plátano", termTranslated: "Banan" },
    { term: "Cereza", termTranslated: "Wiśnia" },
    { term: "Dátil", termTranslated: "Daktyl" },
    { term: "Uva", termTranslated: "Winogrono" },
    { term: "Limón", termTranslated: "Cytryna" },
    { term: "Naranja", termTranslated: "Pomarańcza" },
    { term: "Durazno", termTranslated: "Brzoskwinia" },
    { term: "Pera", termTranslated: "Gruszka" },
    { term: "Fresa", termTranslated: "Truskawka" },
  ],
}

const dailyRoutine: Category = {
  category: "Daily routine",
  data: [
    { term: "Despertarse", termTranslated: "Wstać" },
    { term: "Levantarse", termTranslated: "Wstać" },
    { term: "Cepillarse los dientes", termTranslated: "Umyć zęby" },
    { term: "Ducharse", termTranslated: "Wziąć prysznic" },
    { term: "Desayunar", termTranslated: "Zjeść śniadanie" },
    { term: "Ir al trabajo", termTranslated: "Iść do pracy" },
    { term: "Almorzar", termTranslated: "Zjeść obiad" },
    { term: "Volver a casa", termTranslated: "Iść do domu" },
    { term: "Cenar", termTranslated: "Zjeść kolację" },
    { term: "Ir a la cama", termTranslated: "Iść spać" },
  ],
}

const adjectives: Category = {
  category: "Adjectives",
  data: [
    { term: "Hermoso", termTranslated: "Piękny" },
    { term: "Grande", termTranslated: "Duży" },
    { term: "Pequeño", termTranslated: "Mały" },
    { term: "Alto", termTranslated: "Wysoki" },
    { term: "Bajo", termTranslated: "Niski" },
    { term: "Gordo", termTranslated: "Gruby" },
    { term: "Delgado", termTranslated: "Chudy" },
    { term: "Feo", termTranslated: "Brzydki" },
    { term: "Guapo", termTranslated: "Przystojny" },
    { term: "Bonito", termTranslated: "Ładny" },
  ],
}

const publicTransport: Category = {
  category: "Public transport",
  data: [
    { term: "Autobús", termTranslated: "Autobus" },
    { term: "Tranvía", termTranslated: "Tramwaj" },
    { term: "Tren", termTranslated: "Pociąg" },
    { term: "Metro", termTranslated: "Metro" },
    { term: "Taxi", termTranslated: "Taxi" },
    { term: "Bicicleta", termTranslated: "Rower" },
    { term: "Coche", termTranslated: "Samochód" },
    { term: "Motocicleta", termTranslated: "Motocykl" },
    { term: "Patinete", termTranslated: "Hulajnoga" },
    { term: "Barco", termTranslated: "Łódź" },
  ],
}

const feelings: Category = {
  category: "Feelings",
  data: [
    { term: "Feliz", termTranslated: "Szczęśliwy" },
    { term: "Triste", termTranslated: "Smutny" },
    { term: "Enojado", termTranslated: "Zły" },
    { term: "Sorprendido", termTranslated: "Zaskoczony" },
    { term: "Cansado", termTranslated: "Zmęczony" },
    { term: "Emocionado", termTranslated: "Podekscytowany" },
    { term: "Aburrido", termTranslated: "Znudzony" },
    { term: "Nervioso", termTranslated: "Zdenerwowany" },
    { term: "Calmado", termTranslated: "Spokojny" },
    { term: "Confundido", termTranslated: "Zdezorientowany" },
  ],
}

const dictionary: Dictionary = {
  language: "Spanish",
  categories: [fruits, dailyRoutine, adjectives, publicTransport, feelings],
}

export default dictionary
