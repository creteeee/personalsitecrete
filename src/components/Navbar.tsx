import { Link } from 'react-router-dom'
import MusicPlayer from '@/components/MusicPlayer'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Xinyue Zhang
        </Link>
        <div className={styles.links}>
          <Link to="/about">About me</Link>
          <Link to="/contact">Contact Me</Link>
          <MusicPlayer />
        </div>
      </div>
    </nav>
  )
}
