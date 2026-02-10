# 占位符文件替换指南

本文档说明了如何替换网站中的占位符文件。

## 文件结构

```
public/
├── images/
│   ├── profile-photo.png          # 个人照片（主页个人介绍部分）
│   ├── project-1-thumbnail.png    # 项目1预览图
│   ├── project-2-thumbnail.png    # 项目2预览图
│   ├── project-3-thumbnail.png    # 项目3预览图
│   ├── project-4-thumbnail.png    # 项目4预览图
│   ├── photography-1.png          # 摄影作品1
│   └── photography-2.png          # 摄影作品2
└── audio/
    └── bgm-main.mp3                # 背景音乐
```

## 命名规则

### 图片文件命名规则

1. **个人照片**
   - 文件名：`profile-photo.png`
   - 位置：`public/images/profile-photo.png`
   - 用途：主页个人介绍部分的左侧照片

2. **项目预览图**
   - 命名格式：`project-{序号}-thumbnail.png`
   - 示例：`project-1-thumbnail.png`, `project-2-thumbnail.png`
   - 位置：`public/images/`
   - 用途：作品展示卡片中的预览图

3. **摄影作品**
   - 命名格式：`photography-{序号}.png`
   - 示例：`photography-1.png`, `photography-2.png`
   - 位置：`public/images/`
   - 用途：摄影与绘画页面的作品展示

### 音频文件命名规则

1. **背景音乐**
   - 文件名：`bgm-main.mp3`
   - 位置：`public/audio/bgm-main.mp3`
   - 用途：主页音乐播放器的主背景音乐

## 替换步骤

1. **准备你的素材文件**
   - 确保图片格式为 PNG 或 JPG
   - 确保音频格式为 MP3

2. **替换图片**
   - 将你的图片文件复制到对应的 `public/images/` 目录
   - 使用上述命名规则重命名文件
   - 如果使用 JPG 格式，需要同时更新代码中的文件扩展名

3. **替换音频**
   - 将你的音频文件复制到 `public/audio/` 目录
   - 使用上述命名规则重命名文件

4. **更新代码（如需要）**
   - 如果添加了新的项目或摄影作品，需要在对应的页面组件中更新数据数组
   - 项目数据位置：`app/page.tsx` 和 `app/projects/page.tsx`
   - 摄影作品数据位置：`app/photography/page.tsx`

## 当前占位符文件

以下文件目前使用的是占位符，需要替换：

- ✅ `public/images/profile-photo.png` - 已创建占位符
- ✅ `public/audio/bgm-main.mp3` - 已创建占位符
- ⚠️ `public/images/project-1-thumbnail.png` - 需要创建
- ⚠️ `public/images/project-2-thumbnail.png` - 需要创建
- ⚠️ `public/images/project-3-thumbnail.png` - 需要创建
- ⚠️ `public/images/project-4-thumbnail.png` - 需要创建
- ⚠️ `public/images/photography-1.png` - 需要创建
- ⚠️ `public/images/photography-2.png` - 需要创建

## 注意事项

1. **文件大小**：建议图片文件大小控制在 500KB 以内，音频文件控制在 5MB 以内，以确保网站加载速度
2. **图片尺寸**：
   - 个人照片：建议 600x600px 或更大（正方形）
   - 项目预览图：建议 800x600px 或更大（横向）
   - 摄影作品：建议 1200x800px 或更大
3. **文件格式**：推荐使用 PNG（支持透明背景）或 JPG（文件更小）
4. **命名一致性**：请严格按照命名规则命名，否则网站可能无法正确显示图片

## 批量创建占位符

如果需要批量创建项目预览图占位符，可以复制 `img_placeHolder.png` 并重命名：

```bash
# Windows PowerShell
Copy-Item img_placeHolder.png public\images\project-1-thumbnail.png
Copy-Item img_placeHolder.png public\images\project-2-thumbnail.png
Copy-Item img_placeHolder.png public\images\project-3-thumbnail.png
Copy-Item img_placeHolder.png public\images\project-4-thumbnail.png
Copy-Item img_placeHolder.png public\images\photography-1.png
Copy-Item img_placeHolder.png public\images\photography-2.png
```
