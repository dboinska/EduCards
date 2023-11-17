import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Catalouges.module.css"

const PublicCatalouges: BlitzPage = () => {
  return (
    <Layout title="Public catalouges">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Public catalouges</h1>
        </div>
        <div className={styles.gridCatalouges}>
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

export default PublicCatalouges
