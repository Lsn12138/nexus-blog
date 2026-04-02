---
title: "OpenScreen：免费开源录屏替代 Screen Studio"
date: 2026-04-03
tags: [开发工具]
categories: 技术
image: https://raw.githubusercontent.com/siddharthvaddem/openscreen/main/public/openscreen.png
image_source: GitHub
---

## 📌 原文摘要

OpenScreen 是一款免费开源的屏幕录制和编辑工具，可作为 Screen Studio（$29/月）的开源替代品。项目使用 Electron + React + TypeScript + PixiJS 构建，支持 macOS、Windows 和 Linux。

核心功能包括：全屏/窗口录制、自动缩放（Cursor Telemetry 驱动）、麦克风 + 系统音频采集、可视化时间轴剪辑、加速/减速分段调速、背景自定义（纯色/渐变/图片）、运动模糊、注释标注（文字/箭头/图片）、GIF 导出、多语言界面（中文/英文/西班牙语）。录制后可裁剪隐藏敏感区域，导出支持多种比例和分辨率。

## 🧠 核心要点

* 100% 免费，无订阅，无水印，商业可用（MIT 许可证）
* Cursor Telemetry 驱动的自动缩放建议，点击魔棒按钮即可自动应用
* 支持将编辑保存为项目文件（持久化），下次继续编辑
* 支持自定义 Google Fonts 字体注入注释文字
* 可配置键盘快捷键，导出速度经重构后显著提升
* 平台支持：macOS 13+（含音频捕获）、Windows 原生、Linux（需要 PipeWire）

## 🔥 推荐理由

做产品演示视频是技术布道、文档输出和内容营销的重要形式，但 Screen Studio $29/月的订阅费对个人开发者和小团队来说并不友好。OpenScreen 精准卡位「基础够用 + 免费无套路」的需求。

从最近更新日志看（2026年4月2日），项目活跃度很高：撤销/重做、多语言支持、音频同步修复、Webcam 竖屏和画中画等特性刚上线。Cursor Telemetry 自动缩放是一个差异化亮点，大幅降低了录制高质量演示的操作成本。

如果你只需要录屏 + 简单编辑 + 自动缩放效果，OpenScreen 已经足够。对于需要复杂特效的场景，再考虑 Screen Studio。

## 📊 热度信息

GitHub Trending 日榜第 1 位，今日新增 2,496 stars，总星数 15,028（截至 2026-04-02）。项目在 2026 年 4 月初迎来爆发式增长，昨日发布更新后热度显著上升。

## 🔗 相关链接

- GitHub：https://github.com/siddharthvaddem/openscreen
- 官网（DeepWiki）：https://deepwiki.com/siddharthvaddem/openscreen
- Releases 下载：https://github.com/siddharthvaddem/openscreen/releases
- Roadmap：https://github.com/users/siddharthvaddem/projects/3
