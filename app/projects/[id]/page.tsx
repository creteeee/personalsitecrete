import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>项目详情</h1>
          <p className={styles.placeholder}>
            项目详情内容待填充... (ID: {params.id})
          </p>
        </div>
      </main>
    </>
  )
}
