import styles from './About.module.css'

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>About me</h1>
        <div className={styles.content}>
          <img
            src="/images/CV.png"
            alt="Xinyue Zhang Resume"
            className={styles.cvImage}
          />
        </div>
      </div>
    </main>
  )
}
