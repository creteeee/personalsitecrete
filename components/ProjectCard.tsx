import Link from 'next/link'
import Image from 'next/image'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  category: 'game-tech-art' | 'product-design' | 'other'
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Link href={`/projects/${id}`} className={styles.button}>
          查看详情
        </Link>
      </div>
    </div>
  )
}
