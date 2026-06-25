import { useState } from 'react'
import { getImageCandidates } from '@/utils/parseProjectInfo'

interface ProjectImageProps {
  basePath: string
  alt: string
  className?: string
  onClick?: (resolvedSrc: string) => void
}

export default function ProjectImage({
  basePath,
  alt,
  className,
  onClick,
}: ProjectImageProps) {
  const candidates = getImageCandidates(basePath)
  const [srcIndex, setSrcIndex] = useState(0)

  const handleError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((index) => index + 1)
    }
  }

  const resolvedSrc = candidates[srcIndex]

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      onClick={() => onClick?.(resolvedSrc)}
      onError={handleError}
    />
  )
}
