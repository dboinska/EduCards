import { BlitzPage } from "@blitzjs/next"
import { useForm } from "@mantine/form"
import Layout from "@/core/layouts/Layout"
import styles from "src/styles/Catalogs.module.css"

import { CardCreator } from "@/components/CardCreator"

interface FormValues {
  catalogueName: string
  description: string
  imageUrl: string
  cards: Card[]
}

type Card = {
  term: string
  termDesc: string
  definition: string
  defDesc: string
}

const NewCard: BlitzPage = () => {
  const form = useForm<FormValues>({
    initialValues: {
      catalogueName: "",
      description: "",
      imageUrl: "",
      cards: [
        {
          term: "Giraffe",
          termDesc: "giraffe",
          definition: "Żyrafa",
          defDesc: "żyrafa",
        },
      ],
    },

    validate: (values) => {
      const errors: { [key: string]: any } = {}

      const cardsErrors = values.cards.reduce((acc, card, index) => {
        const cardErrors: Partial<Card> = {}

        if (!card.term || card.term.trim().length < 2) {
          cardErrors.term = "Term must include at least 2 characters"
        }
        if (!card.definition || card.definition.trim().length < 2) {
          cardErrors.definition = "Definition must include at least 2 characters"
        }

        if (Object.keys(cardErrors).length) {
          acc[index] = cardErrors
        }

        return acc
      }, {})

      if (Object.keys(cardsErrors).length) {
        errors.cards = cardsErrors
      }

      return errors
    },

    validateInputOnChange: true,
  })

  return (
    <>
      <Layout title="Create Card">
        <main className={styles.main}>
          <div className={styles.stepperForm}>
            <CardCreator form={form} oneStep />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default NewCard
