---
title: Voicebox：开源语音合成工作站
date: 2026-04-15
tags: [AI, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/jamiepine/voicebox/main/landing/public/assets/app-screenshot-2.webp
image_source: jamiepine/voicebox
---

## 📌 原文摘要（100-200字）

Voicebox 是由 jamiepine 开源的全功能本地语音合成工作室，可作为 ElevenLabs 的免费替代方案。支持 5 种 TTS 引擎（Qwen3-TTS、LuxTTS、Chatterbox 系列、HumeAI TADA），覆盖 23 种语言，仅需几秒音频即可克隆声音。内置 8 种音频效果器（混响、延迟、压缩、变调等），多轨时间轴编辑，API-first 架构支持集成到第三方应用。跨平台支持 macOS（MLX/Metal）、Windows（CUDA/DirectML）、Linux（ROCm/Intel Arc），全程本地运行，数据不上传云端。

## 🧠 核心要点
* **5 种 TTS 引擎自由切换：** 各有侧重，Qwen3-TTS 擅长多语言克隆，LuxTTS 轻量快速，Chatterbox Turbo 支持情感标签
* **本地优先隐私保护：** 所有模型和数据留在本地，支持离线使用
* **23 种语言覆盖：** 包括阿拉伯语、印地语、日语、斯瓦希里语等小语种
* **多轨时间轴编辑：** 可制作对话、播客、配音串词，支持自动转录（Whisper 驱动）
* **一键 API 暴露：** 本地 REST API 供第三方应用调用，端口 17493

## 🔥 推荐理由

Voicebox 在 GitHub 已有 17k stars、今日新增 1,165 stars，热度并非来自营销而是实打实的产品力。它把语音克隆、TTS 生成、音频后期包装成一套完整工作流，并且真正开源可本地部署。对于需要语音合成能力但不愿依赖 ElevenLabs 等闭源服务的开发者，这是目前最完整的开源方案。技术实现上，Tauri+Rust 桌面端 + Python FastAPI 后端 + Spotify 音频效果库的组合也值得参考。

## 📊 热度信息

GitHub Trending 今日第三位，17,053 stars，2,013 forks，当日新增 1,165 stars，在非 AI 代码类项目中表现突出。

## 🔗 相关链接

* GitHub：https://github.com/jamiepine/voicebox
* 官网：https://voicebox.sh
* 文档：https://docs.voicebox.sh
