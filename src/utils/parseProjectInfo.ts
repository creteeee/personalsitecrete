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
  | { type: 'localVideo'; index: number; path: string }
  | { type: 'embed'; url: string }

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
    'project-14': '/images/CatNAI/project-infos.txt',
    'project-1': '/images/BlueStar/project-infos.txt',
    'project-2': '/images/CloudRender/project-infos.txt',
    'project-15': '/images/Fengshui/project-infos.txt',
    'project-3': '/images/PeChat/project-infos.txt',
    'project-4': '/images/Bianbian/project-infos.txt',
    'project-7': '/images/Taichi/project-infos.txt',
    'project-6': '/images/Yiqizou/project-infos.txt',
    'project-8': '/images/Penglai/project-infos.txt',
    'project-16': '/images/Jichangyuan/project-infos.txt',
    'project-9': '/images/StylizedRender/project-infos.txt',
    'project-10': '/images/BattleCap/project-infos.txt',
    'project-11': '/images/DemonGarden/project-infos.txt',
    'project-12': '/images/SpaceNotFound/project-infos.txt',
    'project-13': '/images/Taichi/project-infos.txt',
    'project-5': '/images/CoastLayers/project-infos.txt',
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
        // 移除自动播放参数，并明确设置为 false，确保视频不会自动播放
        let iframeHtml = iframeMatch[0]
        // 移除 autoplay 参数（无论值是什么）
        iframeHtml = iframeHtml.replace(/[?&]autoplay=[^&"\s]*/gi, '')
        // 清理可能出现的连续分隔符
        iframeHtml = iframeHtml.replace(/\?&/g, '?')
        iframeHtml = iframeHtml.replace(/&&+/g, '&')
        // 在 src URL 的引号前添加 &autoplay=false
        // B站URL格式通常是 ...?param1=value1&param2=value2"，所以直接用&连接
        iframeHtml = iframeHtml.replace(/(src="[^"]*?)(")/, '$1&autoplay=false$2')
        currentContent.push({ type: 'video', iframe: iframeHtml })
      }
      continue
    }

    // 外链嵌入，例如：[嵌入外链https://example.com]
    const embedMatch = line.match(/\[嵌入外链(https?:\/\/[^\]\s]+)\]/)
    if (embedMatch) {
      const url = embedMatch[1]
      currentContent.push({ type: 'embed', url })
      continue
    }

    // 本地视频
    const localVideoMatch = line.match(/\[本地视频video-(\d+)\]/)
    if (localVideoMatch) {
      const index = parseInt(localVideoMatch[1], 10)
      const videoPath = getVideoPath(projectId, index)
      currentContent.push({ type: 'localVideo', index, path: videoPath })
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
            nextLine.includes('正文') ||
            nextLine.includes('外链'))
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
    'project-1': '/images/BlueStar',
    'project-2': '/images/CloudRender',
    'project-3': '/images/PeChat',
    'project-14': '/images/CatNAI',
    'project-15': '/images/Fengshui',
    'project-16': '/images/Jichangyuan',
    'project-4': '/images/Bianbian',
    'project-7': '/images/Taichi',
    'project-6': '/images/Yiqizou',
    'project-8': '/images/Penglai',
    'project-9': '/images/StylizedRender',
    'project-10': '/images/BattleCap',
    'project-11': '/images/DemonGarden',
    'project-12': '/images/SpaceNotFound',
    'project-13': '/images/Taichi',
    'project-5': '/images/CoastLayers',
    // 以后可以添加其他项目
  }

  const basePath = pathMap[projectId] || '/images'
  return `${basePath}/image-${index}`
}

const IMAGE_EXTENSIONS = ['.png', '.jpg'] as const

export function getImageCandidates(basePath: string): string[] {
  return IMAGE_EXTENSIONS.map((ext) => `${basePath}${ext}`)
}

function getVideoPath(projectId: string, index: number): string {
  // 根据项目ID和视频索引生成路径
  const pathMap: Record<string, string> = {
    'project-1': '/images/BlueStar',
    'project-2': '/images/CloudRender',
    'project-3': '/images/PeChat',
    'project-14': '/images/CatNAI',
    'project-15': '/images/Fengshui',
    'project-16': '/images/Jichangyuan',
    'project-4': '/images/Bianbian',
    'project-7': '/images/Taichi',
    'project-6': '/images/Yiqizou',
    'project-8': '/images/Penglai',
    'project-9': '/images/StylizedRender',
    'project-10': '/images/BattleCap',
    'project-11': '/images/DemonGarden',
    'project-12': '/images/SpaceNotFound',
    'project-13': '/images/Taichi',
    'project-5': '/images/CoastLayers',
    // 以后可以添加其他项目
  }

  const basePath = pathMap[projectId] || '/images'
  return `${basePath}/video-${index}.mp4`
}
