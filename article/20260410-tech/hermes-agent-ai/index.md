---
title: Hermes Agent：具有内置学习循环的AI智能体
date: 2026-04-10
tags: [AI, AI Agent]
categories: 技术
image: https://raw.githubusercontent.com/NousResearch/hermes-agent/main/assets/banner.png
image_source: NousResearch
---

## 📌 原文摘要

Hermes Agent 是由 Nous Research 打造的具有内置学习循环的自改进型 AI 智能体。与传统 Agent 不同，它能在对话过程中自主创建 Skills（技能）、根据使用情况持续自我优化、在多轮对话中记住用户的偏好和习惯。它支持 OpenRouter、MiniMax、Kimi、OpenAI 等多种模型接入，可通过 Telegram、Discord 等平台进行交互，并能在 $5 VPS 到无服务器 GPU 集群等多种基础设施上运行。其核心理念是"与你一同成长"——每次交互都会沉淀为 Agent 的记忆和能力。

## 🧠 核心要点

* **内置学习循环**：自动创建技能、持续自我优化，无需人工干预即可积累经验
* **多平台无缝切换**：Telegram、Discord、Slack、WhatsApp、Signal、Email 一个网关覆盖
* **多模型兼容**：OpenRouter(200+模型)、MiniMax、Kimi、OpenAI 等，一键切换无锁定
* **低成本部署**：可在 $5 VPS 上运行，Modal/Daytona 无服务器模式空闲时几乎零成本
* **跨会话持久记忆**：FTS5 搜索 + LLM 摘要，实现跨会话上下文回忆

## 🔥 推荐理由

Nous Research 此前在开源社区已有良好声誉（DeepSeek 等模型背后力量）。Hermes Agent 的创新点在于真正把"学习"做进了 Agent 循环里——不是简单的 RAG，而是让 Agent 在每次任务后自主判断是否需要新建或更新技能，并在后续会话中调用。这对于需要长期使用的个人助手场景非常有价值。此外，多平台接入和低成本部署也降低了普通用户的尝试门槛。

## 📊 热度信息

GitHub Trending 今日榜单第 1 位，43,358 stars，6,788 stars 今日增长，热度极高。

## 🔗 相关链接

* GitHub：https://github.com/NousResearch/hermes-agent
* 官网文档：https://hermes-agent.nousresearch.com/docs/
* Nous Portal：https://portal.nousresearch.com
