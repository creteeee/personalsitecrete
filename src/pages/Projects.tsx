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
      image: '/images/project-1-thumbnail.png',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-2',
      title: '项目标题 2',
      description: '这是另一个游戏技术美术项目的描述...',
      image: '/images/project-2-thumbnail.png',
      category: 'game-tech-art' as const,
    },
  ],
  'product-design': [
    {
      id: 'project-3',
      title: '产品设计项目 1',
      description: '这是一个产品设计项目的描述...',
      image: '/images/project-3-thumbnail.png',
      category: 'product-design' as const,
    },
  ],
  other: [
    {
      id: 'project-4',
      title: '其他作品 1',
      description: '这是其他类型作品的描述...',
      image: '/images/project-4-thumbnail.png',
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
