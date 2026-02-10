'use client'

import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Xinyue Zhang
        </Link>
        <div className={styles.links}>
          <Link href="/about">About me</Link>
          <Link href="/contact">Contact Me</Link>
        </div>
      </div>
    </nav>
  )
}
