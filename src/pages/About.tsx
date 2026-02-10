import Navbar from '@/components/Navbar'
import styles from './About.module.css'

export default function About() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>About me</h1>
          <div className={styles.content}>
            <p>简历内容待填充...</p>
          </div>
        </div>
      </main>
    </>
  )
}
