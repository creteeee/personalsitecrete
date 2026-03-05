import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import ImageLightbox from '@/components/ImageLightbox'
import { parseProjectInfo, ProjectContent } from '@/utils/parseProjectInfo'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [content, setContent] = useState<ProjectContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    parseProjectInfo(id)
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load project:', error)
        setLoading(false)
      })
  }, [id])

  const handleImageClick = (imagePath: string, alt: string) => {
    setLightboxImage(imagePath)
    setLightboxAlt(alt)
  }

  const handleCloseLightbox = () => {
    setLightboxImage(null)
    setLightboxAlt('')
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container}>
            <p className={styles.placeholder}>加载中...</p>
          </div>
        </main>
      </>
    )
  }

  if (!content) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container}>
            <p className={styles.placeholder}>项目详情未找到</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.mainTitle}>{content.mainTitle}</h1>
          {content.subtitle && (
            <p className={styles.subtitle}>{content.subtitle}</p>
          )}

          {content.sections.map((section, sectionIndex) => (
            <section key={sectionIndex} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>

              {section.content.map((item, itemIndex) => {
                // 处理图片
                if (item.type === 'image') {
                  // 检查是否是img-6或img-7（需要并排显示）
                  const nextItem =
                    itemIndex < section.content.length - 1
                      ? section.content[itemIndex + 1]
                      : null
                  const isFirstOfPair =
                    item.index === 6 &&
                    nextItem?.type === 'image' &&
                    (nextItem as any).index === 7

                  if (isFirstOfPair) {
                    // 渲染并排的两张图片
                    return (
                      <div key={itemIndex} className={styles.sideBySideImages}>
                        <div className={styles.imageWrapper}>
                          <img
                            src={item.path}
                            alt={`${section.title} - 图片 ${item.index}`}
                            className={styles.image}
                            onClick={() =>
                              handleImageClick(
                                item.path,
                                `${section.title} - 图片 ${item.index}`
                              )
                            }
                          />
                        </div>
                        {nextItem?.type === 'image' && (
                          <div className={styles.imageWrapper}>
                            <img
                              src={(nextItem as any).path}
                              alt={`${section.title} - 图片 ${(nextItem as any).index}`}
                              className={styles.image}
                              onClick={() =>
                                handleImageClick(
                                  (nextItem as any).path,
                                  `${section.title} - 图片 ${(nextItem as any).index}`
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    )
                  } else if (item.index === 7) {
                    // 检查前一个是否是img-6，如果是则跳过（已经在并排中渲染）
                    const prevItem =
                      itemIndex > 0 ? section.content[itemIndex - 1] : null
                    if (
                      prevItem?.type === 'image' &&
                      (prevItem as any).index === 6
                    ) {
                      return null
                    }
                    // 如果前一个不是img-6，正常渲染
                    return (
                      <div key={itemIndex} className={styles.imageWrapper}>
                        <img
                          src={item.path}
                          alt={`${section.title} - 图片 ${item.index}`}
                          className={styles.image}
                          onClick={() =>
                            handleImageClick(
                              item.path,
                              `${section.title} - 图片 ${item.index}`
                            )
                          }
                        />
                      </div>
                    )
                  } else {
                    // 普通全宽图片
                    return (
                      <div key={itemIndex} className={styles.imageWrapper}>
                        <img
                          src={item.path}
                          alt={`${section.title} - 图片 ${item.index}`}
                          className={styles.image}
                          onClick={() =>
                            handleImageClick(
                              item.path,
                              `${section.title} - 图片 ${item.index}`
                            )
                          }
                        />
                      </div>
                    )
                  }
                }

              // 处理B站视频
                if (item.type === 'video') {
                  return (
                    <div
                      key={itemIndex}
                      className={styles.videoWrapper}
                      dangerouslySetInnerHTML={{ __html: item.iframe }}
                    />
                  )
                }

                // 处理本地视频
                if (item.type === 'localVideo') {
                  return (
                    <div key={itemIndex} className={styles.videoWrapper}>
                      <video
                        src={item.path}
                        controls
                        className={styles.localVideo}
                        style={{ width: '100%', height: 'auto' }}
                      >
                        您的浏览器不支持视频播放。
                      </video>
                    </div>
                  )
                }

                // 处理外链嵌入
                if (item.type === 'embed') {
                  return (
                    <div key={itemIndex} className={styles.embedWrapper}>
                      <iframe
                        src={item.url}
                        className={styles.embedFrame}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )
                }

                // 处理文本
                if (item.type === 'text') {
                  return (
                    <p key={itemIndex} className={styles.text}>
                      {item.content.split('\n').map((line, lineIndex, lines) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )
                }

                return null
              })}
            </section>
          ))}
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
