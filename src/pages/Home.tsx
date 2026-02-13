import { useState } from 'react'
import Navbar from '@/components/Navbar'
import MusicPlayer from '@/components/MusicPlayer'
import ProjectCard from '@/components/ProjectCard'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

// 示例项目数据 - 之后可以从数据文件或API获取
const projects = {
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
  ],
  other: [
    {
      id: 'project-5',
      title: '项目标题 5',
      description: '这是其他类型作品的描述...',
      image: '/images/project-4-thumbnail.jpg',
      category: 'other' as const,
    },
  ],
}

const techStack = {
  development: [
    'Python',
    'C#',
    'Hlsl',
    'Unity',
    'Unreal',
    'RenderDoc',
    'Nsight',
    'Intel GPA',
    'Git',
    'PerForce',
  ],
  ai: ['Cursor', 'Claude', 'Coze', 'Midjourney', '即梦'],
  other: [
    'Figma',
    'Blender',
    'SP',
    'SD',
    'ZB',
    '3Ds Max',
    'Rhino',
  ],
}

type Category = 'game-tech-art' | 'product-design' | 'other'

export default function Home() {
  const [activeCategory, setActiveCategory] =
    useState<Category>('game-tech-art')

  const displayedProjects = projects[activeCategory].slice(0, 6)

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* 个人介绍部分 */}
        <section className={styles.introSection}>
          <div className={styles.introContent}>
            <div className={styles.photoWrapper}>
              <img
                src="/images/profile-photo.png"
                alt="Xinyue Zhang"
                className={styles.photo}
              />
            </div>
            <div className={styles.introText}>
              <div className={styles.musicWrapper}>
                <MusicPlayer />
              </div>
              <div className={styles.textContent}>
                <h1>你好！我是 XINYUE ZHANG，你也可以叫我的昵称 Crete！</h1>
                <p>
                  我目前是一名研一的学生，我致力于结合交互体验、美学和技术，发展方向为{' '}
                  <strong>游戏技术美术</strong> / <strong>交互产品设计开发</strong>{' '}
                  等，本科就读于同济大学工业设计，目前方向为媒体与传达设计，即将于26Fall前往Aalto攻读{' '}
                  <strong>CoID专业交互方向</strong>~
                </p>
                <p>
                  欢迎联系我的邮箱{' '}
                  <a href="mailto:15522584986@163.com">15522584986@163.com</a>
                </p>
                <p className={styles.note}>
                  （ps：你可以点击切换右侧的歌单哦！）
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 作品部分 */}
        <section className={styles.projectsSection}>
          <h2 className={styles.sectionTitle}>个人项目</h2>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeCategory === 'game-tech-art' ? styles.active : ''
              }`}
              onClick={() => setActiveCategory('game-tech-art')}
            >
              游戏技术美术
            </button>
            <button
              className={`${styles.tab} ${
                activeCategory === 'product-design' ? styles.active : ''
              }`}
              onClick={() => setActiveCategory('product-design')}
            >
              产品设计
            </button>
            <button
              className={`${styles.tab} ${
                activeCategory === 'other' ? styles.active : ''
              }`}
              onClick={() => setActiveCategory('other')}
            >
              其他作品
            </button>
          </div>
          <div className={styles.projectsGrid}>
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <div className={styles.moreButton}>
            <Link to="/projects">查看更多</Link>
          </div>
        </section>

        {/* 技术栈 */}
        <section className={styles.techSection}>
          <h2 className={styles.sectionTitle}>技术栈</h2>
          <div className={styles.techColumns}>
            <div className={styles.techColumn}>
              <h3 className={styles.techTitle}>开发语言及平台</h3>
              <div className={styles.techTags}>
                {techStack.development.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.techColumn}>
              <h3 className={styles.techTitle}>AI工具</h3>
              <div className={styles.techTags}>
                {techStack.ai.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.techColumn}>
              <h3 className={styles.techTitle}>其他</h3>
              <div className={styles.techTags}>
                {techStack.other.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 摄影与绘画 */}
        <section className={styles.photographySection}>
          <h2 className={styles.sectionTitle}>摄影与绘画</h2>
          <p className={styles.subtitle}>
            个人兴趣爱好，感兴趣请戳
            <Link to="/photography" className={styles.link}>
              ☞
            </Link>
          </p>
        </section>
      </main>
    </>
  )
}
