import { useState } from 'react'
import ImageLightbox from '@/components/ImageLightbox'
import styles from './Photography.module.css'

// 示例摄影作品数据
const photographyWorks = [
  {
    id: 'photo-1',
    name: 'Departure',
    date: '2024',
    image: '/images/pic-1.jpg',
  },
  {
    id: 'photo-2',
    name: 'Coast-1',
    date: '2024',
    image: '/images/pic-2.jpg',
  },
  {
    id: 'photo-3',
    name: 'Coast-2',
    date: '2024',
    image: '/images/pic-3.jpg',
  },
  {
    id: 'photo-4',
    name: 'Coast-3',
    date: '2024',
    image: '/images/pic-4.jpg',
  },
  {
    id: 'photo-5',
    name: 'Coast-4',
    date: '2024',
    image: '/images/pic-5.jpg',
  },
  {
    id: 'photo-6',
    name: 'Hakodate',
    date: '2024',
    image: '/images/pic-6.jpg',
  },
  {
    id: 'photo-7',
    name: 'Sapporo',
    date: '2024',
    image: '/images/pic-7.jpg',
  },
  {
    id: 'photo-8',
    name: 'Neon',
    date: '2024',
    image: '/images/pic-8.jpg',
  },
  {
    id: 'photo-9',
    name: '白鸥',
    date: '2023',
    image: '/images/pic-9.jpg',
  },
  {
    id: 'photo-10',
    name: '水彩',
    date: '2023',
    image: '/images/pic-10.jpg',
  },
  {
    id: 'photo-11',
    name: 'Light',
    date: '2023',
    image: '/images/pic-11.jpg',
  },
  {
    id: 'photo-12',
    name: 'Betray',
    date: '2023',
    image: '/images/pic-12.jpg',
  },
]

export default function Photography() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  const handleImageClick = (src: string, alt: string) => {
    setLightboxImage(src)
    setLightboxAlt(alt)
  }

  const handleCloseLightbox = () => {
    setLightboxImage(null)
    setLightboxAlt('')
  }

  return (
    <>
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
                    onClick={() =>
                      handleImageClick(work.image, `${work.name} / ${work.date}`)
                    }
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

      {lightboxImage && (
        <ImageLightbox
          imageSrc={lightboxImage}
          alt={lightboxAlt}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  )
}
