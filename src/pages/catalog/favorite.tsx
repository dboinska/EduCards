import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Switch } from "@/components/Switch"
import { AutocompleteLoading } from "@/components/AutocompleteLoading"
import { useState } from "react"

const FavCatalogs: BlitzPage = () => {
  const [favType, setFavType] = useState<string>("All")
  return (
    <Layout title="Favorites">
      <main className={styles.main}>
        <CatalogHeader header={"Catalogs"} link={Routes.NewCatalog()} />
        <div className={styles.filters}>
          <Switch value={favType} setValue={setFavType} data={["All", "Catalogs", "Cards"]} />
          <AutocompleteLoading />
        </div>
        <div className={styles.gridCatalogs}>
          <Link className={styles.body} href={Routes.Cards()}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </Link>
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>
        </div>
        <div className={styles.header}>
          <h1>Favorite cards</h1>
        </div>
        <div className={styles.gridCatalogs}>
          <Link className={styles.body} href={Routes.Cards()}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </Link>
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
              <span>10</span>
            </div>
            <h3>Description</h3>
            <div className={styles.inline}>
              <span className={styles.userImg}></span>
              <span>Author</span>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default FavCatalogs
