# 创建必要的目录
New-Item -ItemType Directory -Force -Path "public\images" | Out-Null
New-Item -ItemType Directory -Force -Path "public\audio" | Out-Null

# 复制占位符文件
if (Test-Path "img_placeHolder.png") {
    Copy-Item "img_placeHolder.png" "public\images\profile-photo.png" -Force
    Copy-Item "img_placeHolder.png" "public\images\project-1-thumbnail.png" -Force
    Copy-Item "img_placeHolder.png" "public\images\project-2-thumbnail.png" -Force
    Copy-Item "img_placeHolder.png" "public\images\project-3-thumbnail.png" -Force
    Copy-Item "img_placeHolder.png" "public\images\project-4-thumbnail.png" -Force
    Copy-Item "img_placeHolder.png" "public\images\photography-1.png" -Force
    Copy-Item "img_placeHolder.png" "public\images\photography-2.png" -Force
    Write-Host "图片占位符已复制完成"
} else {
    Write-Host "错误: 找不到 img_placeHolder.png"
}

if (Test-Path "audio_placeHolder.mp3") {
    Copy-Item "audio_placeHolder.mp3" "public\audio\bgm-main.mp3" -Force
    Write-Host "音频占位符已复制完成"
} else {
    Write-Host "错误: 找不到 audio_placeHolder.mp3"
}

Write-Host "All placeholder files copied successfully!"
