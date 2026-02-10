import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function AboutPage() {
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
