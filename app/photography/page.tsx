import Navbar from '@/components/Navbar'
import Image from 'next/image'
import styles from './page.module.css'

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

export default function PhotographyPage() {
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
                  <Image
                    src={work.image}
                    alt={work.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
