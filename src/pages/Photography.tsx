import Navbar from '@/components/Navbar'
import styles from './Photography.module.css'

// 示例摄影作品数据
const photographyWorks = [
  {
    id: 'photo-1',
    name: '作品名称 1',
    date: '2024.01',
    image: '/images/photography-1.png',
  },
  {
    id: 'photo-2',
    name: '作品名称 2',
    date: '2024.02',
    image: '/images/photography-2.png',
  },
]

export default function Photography() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>摄影与绘画</h1>
          <div className={styles.gallery}>
            {photographyWorks.map((work) => (
              <div key={work.id} className={styles.item}>
                <div className={styles.imageWrapper}>
                  <img
                    src={work.image}
                    alt={work.name}
                    className={styles.image}
                  />
                </div>
                <div className={styles.info}>
                  <span className={styles.name}>{work.name}</span>
                  <span className={styles.date}>/{work.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
