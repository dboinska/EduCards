import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */

const seed = async () => {
  const catalogs = [
    {
      name: "English lessons",
      type: "Language",
      numberOfCards: 10,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: true,
      amountOfDrawers: 3,
    },
    {
      name: "Spanish lessons",
      type: "Language",
      numberOfCards: 15,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: true,
      amountOfDrawers: 3,
    },
    {
      name: "French lessons",
      type: "Language",
      numberOfCards: 20,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: true,
      amountOfDrawers: 3,
    },
    {
      name: "German lessons",
      type: "Language",
      numberOfCards: 25,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: false,
      amountOfDrawers: 3,
    },
    {
      name: "Chinese lessons",
      type: "Language",
      numberOfCards: 30,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: false,
      amountOfDrawers: 3,
    },
    {
      name: "Japanese lessons",
      type: "Language",
      numberOfCards: 35,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: true,
      amountOfDrawers: 3,
    },
    {
      name: "Italian lessons",
      type: "Language",
      numberOfCards: 40,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: false,
      amountOfDrawers: 3,
    },
    {
      name: "Russian lessons",
      type: "Language",
      numberOfCards: 45,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: true,
      amountOfDrawers: 3,
    },
    {
      name: "Portuguese lessons",
      type: "Language",
      numberOfCards: 50,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: false,
      amountOfDrawers: 3,
    },
    {
      name: "Arabic lessons",
      type: "Language",
      numberOfCards: 55,
      ownerId: "44703caa-4b68-4c41-a1d8-bc0fb5c8b5ca",
      isShared: true,
      amountOfDrawers: 3,
    },
  ]

  for (const catalog of catalogs) {
    await db.catalog.create({
      data: {
        name: catalog.name,
        type: catalog.type,
        numberOfCards: catalog.numberOfCards,
        amountOfDrawers: catalog.amountOfDrawers.toString(),
        ownerId: catalog.ownerId,
        isShared: catalog.isShared,
        description: null,
        imageUrl: null,
      },
    })
  }
}

export default seed
