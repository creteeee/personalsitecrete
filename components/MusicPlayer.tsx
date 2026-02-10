'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './MusicPlayer.module.css'

const PLAYLIST = [
  '/audio/bgm-main.mp3',
  // 可以添加更多音频文件
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const switchTrack = () => {
    const nextTrack = (currentTrack + 1) % PLAYLIST.length
    setCurrentTrack(nextTrack)
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[nextTrack]
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[currentTrack]
    }
  }, [currentTrack])

  return (
    <div className={styles.musicPlayer}>
      <button
        onClick={switchTrack}
        className={styles.musicButton}
        aria-label="切换音乐"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>
      <audio
        ref={audioRef}
        loop
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}
