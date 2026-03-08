import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './MusicPlayer.module.css'

const PLAYLIST = [
  '/audio/Oklou1.mp3',
  '/audio/Oklou2.mp3',
  '/audio/Oklou3.mp3',
  // 可以添加更多音频文件
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const location = useLocation()

  const playPrev = () => {
    const prevTrack =
      (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length
    setCurrentTrack(prevTrack)
  }

  const playNext = () => {
    const nextTrack = (currentTrack + 1) % PLAYLIST.length
    setCurrentTrack(nextTrack)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    audioRef.current.muted = nextMuted
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[currentTrack]
    }
  }, [currentTrack])

  // 控制播放/暂停
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio
        .play()
        .catch(() => {
          // 浏览器可能阻止自动播放
          setIsPlaying(false)
        })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrack])

  // 页面第一次交互后开始播放
  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsPlaying(true)
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    window.addEventListener('pointerdown', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  // 根据当前路由调整音量：主页 100%，其他页面 5%
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onHome = location.pathname === '/'
    audio.volume = onHome ? 0.5 : 0.05
  }, [location.pathname])

  return (
    <div className={styles.musicPlayer}>
      <button
        onClick={playPrev}
        className={styles.arrowButton}
        aria-label="上一首"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={toggleMute}
        className={styles.musicButton}
        aria-label={isMuted ? '取消静音' : '静音'}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 9v6h4l5 3V6l-5 3H9z" />
          {isMuted && <line x1="4" y1="4" x2="20" y2="20" />}
        </svg>
      </button>
      <button
        onClick={playNext}
        className={styles.arrowButton}
        aria-label="下一首"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <audio
        ref={audioRef}
        loop
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
    </div>
  )
}
