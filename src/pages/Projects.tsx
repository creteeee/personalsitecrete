import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'
import styles from './Projects.module.css'

// 示例项目数据
const allProjects = {
  'game-tech-art': [
    {
      id: 'project-1',
      title: '项目标题 1',
      description: '这是一个游戏技术美术项目的简短描述...',
      image: '/images/project-1-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-2',
      title: '项目标题 2',
      description: '这是另一个游戏技术美术项目的描述...',
      image: '/images/project-2-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
  ],
  'product-design': [
    {
      id: 'project-3',
      title: 'PeChat',
      description: '“纸媒化”微信的思辨App设计和开发',
      image: '/images/project-3-thumbnail.jpg',
      category: 'product-design' as const,
    },
    {
      id: 'project-4',
      title: '肠道健康App',
      description: '达能合作课程产出，基于便便打卡的定制益生菌方案',
      image: '/images/project-4-thumbnail.jpg',
      category: 'product-design' as const,
    },
    {
      id: 'project-6',
      title: '驭气',
      description: '基于MediaPipe动捕的太极教学系统开发',
      image: '/images/project-6-thumbnail.jpg',
      category: 'product-design' as const,
    },
  ],
  other: [
    {
      id: 'project-5',
      title: '其他作品 1',
      description: '这是其他类型作品的描述...',
      image: '/images/project-5-thumbnail.jpg',
      category: 'other' as const,
    },
  ],
}

type Category = 'game-tech-art' | 'product-design' | 'other'

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<Category>('game-tech-art')
  const [displayedProjects, setDisplayedProjects] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const projects = allProjects[activeCategory] || []
    setDisplayedProjects(projects.slice(0, page * itemsPerPage))
  }, [activeCategory, page])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 1000
      ) {
        const projects = allProjects[activeCategory] || []
        if (displayedProjects.length < projects.length) {
          setPage((prev) => prev + 1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeCategory, displayedProjects.length])

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>个人项目</h1>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeCategory === 'game-tech-art' ? styles.active : ''
              }`}
              onClick={() => {
                setActiveCategory('game-tech-art')
                setPage(1)
              }}
            >
              游戏技术美术
            </button>
            <button
              className={`${styles.tab} ${
                activeCategory === 'product-design' ? styles.active : ''
              }`}
              onClick={() => {
                setActiveCategory('product-design')
                setPage(1)
              }}
            >
              产品设计
            </button>
            <button
              className={`${styles.tab} ${
                activeCategory === 'other' ? styles.active : ''
              }`}
              onClick={() => {
                setActiveCategory('other')
                setPage(1)
              }}
            >
              其他作品
            </button>
          </div>
          <div className={styles.projectsGrid}>
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
