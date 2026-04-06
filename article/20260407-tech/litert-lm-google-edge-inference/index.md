---
title: LiteRT-LM：Google 开源的端侧大模型推理引擎
date: 2026-04-07
tags: [AI, 开发工具]
categories: 技术
image: https://github.com/google-ai-edge/LiteRT-LM/raw/main/docs/api/kotlin/demo.gif
image_source: Google AI Edge
---

## 📌 原文摘要

LiteRT-LM 是 Google 推出的生产级高性能开源推理框架，专注于在边缘设备上部署大语言模型。支持 Gemma 4 在各类硬件上高效运行，配套完整的 CLI 工具和跨平台能力（Android、iOS、Web、桌面、IoT）。已落地于 Chrome、Chromebook Plus、Pixel Watch 等产品。通过 GPU/NPU 硬件加速实现峰值性能，支持 Tool Use/函数调用，可用于 Agent 工作流。

## 🧠 核心要点

* **生产级可用**：已在 Chrome、Pixel Watch 等 Google 自家产品中大规模部署
* **硬件加速**：GPU/NPU 加速，非纯 CPU，边缘设备也能跑得动
* **函数调用支持**：Agent 工作流核心能力，可执行工具调用和复杂多步骤任务
* **跨端覆盖**：手机、手表、浏览器、桌面、IoT——一处开发多处运行
* **Gemma 4 深度集成**：配合 Google 最新开源模型，Apache 2.0 许可证，无商用限制

## 🔥 推荐理由

在端侧 AI 赛道，ONNX Runtime、MLC-LLM、TFLite 等方案各有拥趸，但 LiteRT-LM 的差异化在于有 Google 自家产品线做背书和落地场景。配合 Gemma 4 全面转向 Apache 2.0，这代表 Google 在开源 AI 基础设施上的认真投入。对于需要「一次开发、多端部署」的团队，LiteRT-LM 是值得纳入评估的技术选型，尤其是已有 Android 或 Chrome 扩展相关业务的团队。

## 📊 热度信息

GitHub Trending 今日热榜，1,897 stars，487 stars 今日增长（数据来源：GitHub，2026-04-06）

## 🔗 相关链接

* GitHub：https://github.com/google-ai-edge/LiteRT-LM
* 产品官网：https://ai.google.dev/edge/litert-lm
* CLI 工具：https://ai.google.dev/edge/litert-lm/cli
* 开发者博客：https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/
