// 解析项目信息文本文件的工具函数

export interface ProjectContent {
  mainTitle: string
  subtitle: string
  sections: Section[]
}

export interface Section {
  title: string
  content: ContentItem[]
}

export type ContentItem =
  | { type: 'text'; content: string }
  | { type: 'image'; index: number; path: string }
  | { type: 'video'; iframe: string }

export async function parseProjectInfo(
  projectId: string
): Promise<ProjectContent | null> {
  // 根据项目ID确定文件路径
  const filePath = getProjectInfoPath(projectId)
  if (!filePath) return null

  try {
    const response = await fetch(filePath)
    if (!response.ok) return null

    const text = await response.text()
    return parseText(text, projectId)
  } catch (error) {
    console.error('Failed to load project info:', error)
    return null
  }
}

function getProjectInfoPath(projectId: string): string | null {
  // 根据项目ID映射到对应的文本文件路径
  const pathMap: Record<string, string> = {
    'project-3': '/images/PeChat/project-infos.txt',
    // 以后可以添加其他项目
    // 'project-1': '/images/Project1/project-infos.txt',
  }

  return pathMap[projectId] || null
}

function parseText(text: string, projectId: string): ProjectContent {
  const lines = text.split('\n').map((line) => line.trim())
  let mainTitle = ''
  let subtitle = ''
  const sections: Section[] = []

  let currentSection: Section | null = null
  let currentContent: ContentItem[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // 大标题
    if (line.startsWith('[大标题]')) {
      mainTitle = line.replace('[大标题]', '').trim()
      continue
    }

    // 副标题
    if (line.startsWith('[副标题]')) {
      subtitle = line.replace('[副标题]', '').trim()
      continue
    }

    // 章节标题
    if (line.startsWith('[章节标题]')) {
      // 保存上一个章节
      if (currentSection) {
        currentSection.content = currentContent
        sections.push(currentSection)
      }

      // 开始新章节
      const title = line.replace('[章节标题]', '').trim()
      currentSection = { title, content: [] }
      currentContent = []
      continue
    }

    // 图片（可能一行中有多个图片标记）
    const imageMatches = line.matchAll(/\[图片img-(\d+)\]/g)
    const imageMatchesArray = Array.from(imageMatches)
    if (imageMatchesArray.length > 0) {
      for (const match of imageMatchesArray) {
        const index = parseInt(match[1], 10)
        const imagePath = getImagePath(projectId, index)
        currentContent.push({ type: 'image', index, path: imagePath })
      }
      continue
    }

    // B站视频
    if (line.startsWith('[b站视频插入]')) {
      const iframeMatch = line.match(/<iframe[^>]*><\/iframe>/)
      if (iframeMatch) {
        currentContent.push({ type: 'video', iframe: iframeMatch[0] })
      }
      continue
    }

    // 正文
    if (line.startsWith('[正文]')) {
      // 收集后续的正文内容，直到遇到下一个标记
      let textContent = ''
      i++ // 跳过 [正文] 这一行
      while (i < lines.length) {
        const nextLine = lines[i]
        // 如果遇到新的标记，停止收集
        if (
          nextLine.startsWith('[') &&
          (nextLine.includes('标题') ||
            nextLine.includes('图片') ||
            nextLine.includes('视频') ||
            nextLine.includes('正文'))
        ) {
          i-- // 回退一行，让外层循环处理这个标记
          break
        }
        if (textContent) textContent += '\n'
        textContent += nextLine
        i++
      }
      if (textContent.trim()) {
        currentContent.push({ type: 'text', content: textContent.trim() })
      }
      continue
    }
  }

  // 保存最后一个章节
  if (currentSection) {
    currentSection.content = currentContent
    sections.push(currentSection)
  }

  return { mainTitle, subtitle, sections }
}

function getImagePath(projectId: string, index: number): string {
  // 根据项目ID和图片索引生成路径
  const pathMap: Record<string, string> = {
    'project-3': '/images/PeChat',
    // 以后可以添加其他项目
  }

  const basePath = pathMap[projectId] || '/images'
  return `${basePath}/image-${index}.png`
}
