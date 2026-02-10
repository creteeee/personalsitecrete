import { Link } from 'react-router-dom'
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
        <img
          src={image}
          alt={title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Link to={`/projects/${id}`} className={styles.button}>
          查看详情
        </Link>
      </div>
    </div>
  )
}
