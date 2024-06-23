import { Ctx } from "blitz"
import * as z from "zod"

const CardSchema = z.object({
  cardId: z.string().optional(),
  catalogId: z.string().optional(),
  term: z.string().optional(),
  description: z.string().optional(),
  termTranslated: z.string().optional(),
  descriptionTranslated: z.string().optional(),
  imageUrl: z.string().optional(),
  authorId: z.string().optional(),
  creationDate: z.string().optional(),
  lastUpdate: z.string().optional(),
  isFavorite: z.boolean().optional(),
})

const CatalogSchema = z.object({
  catalogId: z.string().optional(),
  imageUrl: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  isFavorite: z.boolean().optional(),
  numberOfCards: z.number().optional(),
  authorId: z.string().optional(),
  isShared: z.boolean().optional(),
  creationDate: z.string().optional(),
  lastUpdate: z.string().optional(),
})

const StudyPlanSchema = z.object({
  planId: z.string().optional(),
  userId: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  status: z.string().optional(),
  color: z.string().optional(),
  studyDaysPerWeek: z.string().optional(),
  studyMinsPerDay: z.string().optional(),
  rememberedWordPerDay: z.string().optional(),
  isFavorite: z.boolean().optional(),
})

const SuggestionSchema = z.object({
  suggestionId: z.string().optional(),
  userId: z.string().optional(),
  term: z.string().optional(),
  termTranslated: z.string().optional(),
  createDate: z.string().optional(),
  isFavorite: z.boolean().optional(),
})

const GetFavorites = z.object({
  cards: z.array(CardSchema).optional(),
  catalogs: z.array(CatalogSchema).optional(),
  studyPlans: z.array(StudyPlanSchema).optional(),
  suggestions: z.array(SuggestionSchema).optional(),
})

export interface CardsDTO {
  card_id: string
  catalog_id: string
  term: string
  description?: string
  term_translated: string
  description_translated?: string
  image_url?: string
  author_id?: string
  creation_date: string
  update_date: string
  is_favorite: boolean
}

export interface CatalogsDTO {
  catalog_id: string
  image_url?: string
  name: string
  description?: string
  number_of_cards: number
  author_id?: string
  is_shared?: boolean
  creation_date: string
  update_date: string
}

export interface StudyPlansDTO {
  plan_id: string
  user_id: string
  start_time: string
  end_time: string
  status: string
  color: string
  study_days_per_week: number
  study_mins_per_day: number
  remembered_word_per_day: number
  is_favorite: boolean
}

// export interface SuggestionsDTO {
//   suggestion_id: string
//   user_id: string
//   term: string
//   term_translated: string
//   create_date: string
//   is_favorite: boolean
// }

interface FavoritesDTO {
  cards: CardsDTO[]
  catalogs: CatalogsDTO[]
  studyPlans: StudyPlansDTO[]
  //   suggestions: SuggestionsDTO[]
}

function fakeEndpoint(): Promise<FavoritesDTO> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cards: [
          {
            card_id: "1",
            catalog_id: "1",
            term: "term",
            description: "description",
            term_translated: "term translated",
            description_translated: "description translated",
            image_url: "https://example.com/image.jpg",
            author_id: "1",
            creation_date: "2021-01-01",
            update_date: "2021-01-02",
            is_favorite: true,
          },
        ],
        catalogs: [
          {
            catalog_id: "1",
            image_url: "https://example.com/image.jpg",
            name: "Catalog 1",
            description: "Description 1",
            number_of_cards: 10,
            author_id: "1",
            is_shared: true,
            creation_date: "2021-01-01",
            update_date: "2021-01-02",
          },
        ],
        studyPlans: [
          {
            plan_id: "1",
            user_id: "1",
            start_time: "08:00",
            end_time: "09:00",
            status: "active",
            color: "blue",
            study_days_per_week: 5,
            study_mins_per_day: 60,
            remembered_word_per_day: 10,
            is_favorite: true,
          },
        ],
        // suggestions: [
        //   {
        //     suggestion_id: "1",
        //     user_id: "1",
        //     term: "term",
        //     term_translated: "term translated",
        //     create_date: "2021-01-01",
        //     is_favorite: true,
        //   },
        // ],
      })
    }, 50)
  })
}

export default async function getFavorites(input: z.infer<typeof GetFavorites>, ctx: Ctx) {
  // Validate the input
  const data = GetFavorites.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const favorites = await fakeEndpoint()

  // Can do any processing, fetching from other APIs, etc

  return favorites
}
