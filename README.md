# Personal Site - Xinyue Zhang (Crete)

个人作品集网站

## 技术栈

- Vite
- React 18
- TypeScript
- React Router

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 构建

```bash
npm run build
```

构建产物在 `dist` 目录

## 部署

网站已配置为可通过 Vercel 一键部署。`vercel.json` 已配置好 Vite 框架设置。

## 占位符文件说明

请参考 `PLACEHOLDER_GUIDE.md` 了解如何替换占位符文件。

### 快速设置占位符文件

在首次运行前，需要复制占位符文件到对应目录：

**Windows PowerShell:**
```powershell
# 创建目录
New-Item -ItemType Directory -Force -Path "public\images", "public\audio"

# 复制图片占位符
Copy-Item "img_placeHolder.png" "public\images\profile-photo.png"
Copy-Item "img_placeHolder.png" "public\images\project-1-thumbnail.png"
Copy-Item "img_placeHolder.png" "public\images\project-2-thumbnail.png"
Copy-Item "img_placeHolder.png" "public\images\project-3-thumbnail.png"
Copy-Item "img_placeHolder.png" "public\images\project-4-thumbnail.png"
Copy-Item "img_placeHolder.png" "public\images\photography-1.png"
Copy-Item "img_placeHolder.png" "public\images\photography-2.png"

# 复制音频占位符
Copy-Item "audio_placeHolder.mp3" "public\audio\bgm-main.mp3"
```

或者直接运行脚本：
```powershell
powershell -ExecutionPolicy Bypass -File copy-placeholders.ps1
```
