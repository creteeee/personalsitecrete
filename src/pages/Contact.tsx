import Navbar from '@/components/Navbar'
import CopyButton from '@/components/CopyButton'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Contact Me</h1>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.label}>邮箱：</span>
              <span className={styles.value}>15522584986@163.com</span>
              <CopyButton text="15522584986@163.com" />
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>微信：</span>
              <span className={styles.value}>ziyouzizai168</span>
              <CopyButton text="ziyouzizai168" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
