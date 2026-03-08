import { useState, useEffect } from 'react'
import ProjectCard from '@/components/ProjectCard'
import styles from './Projects.module.css'

// 示例项目数据
const allProjects = {
  'game-tech-art': [
    {
      id: 'project-1',
      title: '蓝星',
      description: '同济大学2025年度优秀毕业设计',
      image: '/images/project-1-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-2',
      title: 'Nubis体积云复刻',
      description: '体积云调研及渲染方案',
      image: '/images/project-2-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-8',
      title: '独立游戏《蓬莱》',
      description: '2023同济大学与腾讯联合授课游戏作品',
      image: '/images/project-8-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-9',
      title: '风格化实时渲染合集',
      description: '插画风格/像素化/...持续更新',
      image: '/images/project-9-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-10',
      title: '瓶盖战舰',
      description: '已发售独立游戏',
      image: '/images/project-10-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-11',
      title: '行走的江南园林',
      description: '同济大学与网师园合作项目',
      image: '/images/project-11-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-12',
      title: '离线渲染合集',
      description: '风格化渲染短片合集',
      image: '/images/project-12-thumbnail.jpg',
      category: 'game-tech-art' as const,
    },
    {
      id: 'project-13',
      title: '驭气',
      description: '基于MediaPipe动捕的太极教学系统开发',
      image: '/images/project-6-thumbnail.jpg',
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
        title: '一起走',
        description: 'AI多人行程规划管家',
        image: '/images/project-7-thumbnail.jpg',
        category: 'product-design' as const,
      },
      {
        id: 'project-7',
        title: '驭气',
        description: '基于MediaPipe动捕的太极教学系统开发',
        image: '/images/project-6-thumbnail.jpg',
        category: 'product-design' as const,
      },
  ],
  other: [
    {
      id: 'project-5',
      title: 'Through The Layers',
      description: '临港海滩结构可视化网站',
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
  )
}
