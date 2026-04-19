---
title: Omi：实时记忆你的屏幕和对话
date: 2026-04-20
tags: [AI, AI应用]
categories: 技术
image: https://omi.me/images/og-image.png
image_source: Omi
---

## 原文摘要

Omi 是一款 AI 助手，能够捕获屏幕和对话、实时转录、生成摘要和行动项，并提供记住用户所有所见所闻的聊天功能。支持桌面、手机和可穿戴设备，完全开源。技术架构包含：macOS App（Swift/Rust）、Mobile App（Flutter）、Backend API（Python/FastAPI）、Firmware（nRF/Zephyr），以及多语言 SDK（React Native/Swift/Python）。

## 核心要点

* **实时屏幕 + 对话捕获**：VAD（语音活动检测）+ Diarizer（说话人分离）+ Deepgram STT 全流程
* **多端覆盖**：macOS 原生 App（Swift/SwiftUI + Rust 后端）、iOS/Android Flutter App、ESP32 可穿戴设备"Omi Glass"
* **AI 记忆助手**：跨设备记忆同步，问答式交互，随时检索"你之前看过什么"
* **行动项提取**：自动从对话/屏幕内容生成 action items
* **完全开源**：所有组件 MIT 协议，已获 300,000+ 专业用户信任
* **开发者友好**：提供完整 SDK（React Native/Swift/Python）和开放 API

## 🔥 推荐理由

Omi 将"屏幕感知"和"对话记忆"结合，是真正意义上的个人 AI 记忆层。相比单纯做笔记或截屏，它能理解你正在做什么、说过什么，并主动关联。技术栈覆盖端到端——从硬件固件到前端 App 再到后端服务，全栈开源且有文档。对于关注 AI 与操作系统深度融合的开发者，Omi 的架构值得研究。

## 📊 热度信息

GitHub Trending 上榜，300,000+ 专业用户，Discord 社区活跃。技术实现完整，全栈开源，开发者关注度高。

## 🔗 相关链接

- GitHub：https://github.com/BasedHardware/omi
- 官网：https://omi.me
- 文档：https://docs.omi.me
- Discord：https://discord.omi.me
- macOS 下载：https://macos.omi.me
