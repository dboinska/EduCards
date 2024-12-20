import { Dictionary, Category } from "./types"

const fruits: Category = {
  category: "Fruits",
  data: [
    { term: "りんご", termTranslated: "Jabłko" },
    { term: "バナナ", termTranslated: "Banan" },
    { term: "さくらんぼ", termTranslated: "Wiśnia" },
    { term: "デーツ", termTranslated: "Daktyl" },
    { term: "ぶどう", termTranslated: "Winogrono" },
    { term: "レモン", termTranslated: "Cytryna" },
    { term: "オレンジ", termTranslated: "Pomarańcza" },
    { term: "もも", termTranslated: "Brzoskwinia" },
    { term: "なし", termTranslated: "Gruszka" },
    { term: "いちご", termTranslated: "Truskawka" },
  ],
}

const dailyRoutine: Category = {
  category: "Daily routine",
  data: [
    { term: "起きる", termTranslated: "Wstać" },
    { term: "起き上がる", termTranslated: "Wstać" },
    { term: "歯を磨く", termTranslated: "Umyć zęby" },
    { term: "シャワーを浴びる", termTranslated: "Wziąć prysznic" },
    { term: "朝食をとる", termTranslated: "Zjeść śniadanie" },
    { term: "仕事に行く", termTranslated: "Iść do pracy" },
    { term: "昼食をとる", termTranslated: "Zjeść obiad" },
    { term: "家に帰る", termTranslated: "Iść do domu" },
    { term: "夕食をとる", termTranslated: "Zjeść kolację" },
    { term: "寝る", termTranslated: "Iść spać" },
  ],
}

const adjectives: Category = {
  category: "Adjectives",
  data: [
    { term: "美しい", termTranslated: "Piękny" },
    { term: "大きい", termTranslated: "Duży" },
    { term: "小さい", termTranslated: "Mały" },
    { term: "背が高い", termTranslated: "Wysoki" },
    { term: "背が低い", termTranslated: "Niski" },
    { term: "太い", termTranslated: "Gruby" },
    { term: "細い", termTranslated: "Chudy" },
    { term: "醜い", termTranslated: "Brzydki" },
    { term: "ハンサム", termTranslated: "Przystojny" },
    { term: "きれい", termTranslated: "Ładny" },
  ],
}

const publicTransport: Category = {
  category: "Public transport",
  data: [
    { term: "バス", termTranslated: "Autobus" },
    { term: "トラム", termTranslated: "Tramwaj" },
    { term: "電車", termTranslated: "Pociąg" },
    { term: "地下鉄", termTranslated: "Metro" },
    { term: "タクシー", termTranslated: "Taxi" },
    { term: "自転車", termTranslated: "Rower" },
    { term: "車", termTranslated: "Samochód" },
    { term: "オートバイ", termTranslated: "Motocykl" },
    { term: "スクーター", termTranslated: "Hulajnoga" },
    { term: "ボート", termTranslated: "Łódź" },
  ],
}

const feelings: Category = {
  category: "Feelings",
  data: [
    { term: "幸せ", termTranslated: "Szczęśliwy" },
    { term: "悲しい", termTranslated: "Smutny" },
    { term: "怒っている", termTranslated: "Zły" },
    { term: "驚いた", termTranslated: "Zaskoczony" },
    { term: "疲れた", termTranslated: "Zmęczony" },
    { term: "興奮した", termTranslated: "Podekscytowany" },
    { term: "退屈", termTranslated: "Znudzony" },
    { term: "緊張", termTranslated: "Zdenerwowany" },
    { term: "穏やか", termTranslated: "Spokojny" },
    { term: "混乱", termTranslated: "Zdezorientowany" },
  ],
}

const dictionary: Dictionary = {
  language: "Japanese",
  categories: [fruits, dailyRoutine, adjectives, publicTransport, feelings],
}

export default dictionary
