import { useEffect } from 'react'
import styles from './ImageLightbox.module.css'

interface ImageLightboxProps {
  imageSrc: string
  alt: string
  onClose: () => void
}

export default function ImageLightbox({
  imageSrc,
  alt,
  onClose,
}: ImageLightboxProps) {
  useEffect(() => {
    // 阻止背景滚动
    document.body.style.overflow = 'hidden'

    // ESC键关闭
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img src={imageSrc} alt={alt} className={styles.image} />
      </div>
    </div>
  )
}
