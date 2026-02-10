import { useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>项目详情</h1>
          <p className={styles.placeholder}>
            项目详情内容待填充... (ID: {id})
          </p>
        </div>
      </main>
    </>
  )
}
