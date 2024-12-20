export type Term = { term: string; termTranslated: string }

export type Category = {
  category: string
  data: Term[]
}

export type Dictionary = {
  language: string
  categories: Category[]
}
