---
title: Nous推出可自我进化的AI助手Hermes Agent
date: 2026-04-07
tags: [AI, AI Agent]
categories: 技术
image: https://github.com/NousResearch/hermes-agent/raw/main/assets/banner.png
image_source: NousResearch
---

## 📌 原文摘要

Hermes Agent 是由 Nous Research 打造的自主进化型 AI Agent，最大亮点在于内置了持续学习循环：能从对话经验中创建技能、使用中自动改进、在多轮对话中保持知识记忆，甚至能建立对用户的深度认知模型。支持多平台接入（Telegram、Discord、Slack、WhatsApp 等），兼容 OpenRouter、OpenAI、Kimi、MiniMax 等多种 LLM 提供商，可部署在 $5 VPS 或无服务器架构上，闲置时几乎零成本。

## 🧠 核心要点

* **自我进化机制**：任务完成后自动创建技能，下次遇到类似问题直接调用并持续优化，无需人工干预
* **多模态记忆**：FTS5 全文搜索 + LLM 摘要，支持跨会话记忆检索，用户画像持久化
* **跨平台统一入口**：一个进程支持 Telegram/Discord/Slack/WhatsApp/Signal/CLI 多渠道，语音备忘录转录也不在话下
* **任意 LLM 切换**：通过 `hermes model` 命令自由切换模型提供商，不锁定供应商
* **低成本部署**：支持 Docker、SSH、Daytona、Modal 等多种后端，serverless 模式闲置近乎零成本

## 🔥 推荐理由

当前大多数 AI Agent 本质上还是「 stateless 」的——每次对话都是从零开始。Hermes Agent 真正引入了持久化学习和用户建模机制，让 AI 从工具变成了可伴随用户一起成长的数字伙伴。对于需要长期维护大量终端用户的开发者来说，这种「越用越懂你」的特性是差异化竞争力。部署成本低、学习曲线平缓，值得重点关注。

## 📊 热度信息

GitHub Trending 今日热榜，27.6k stars，1,721 stars 今日增长（数据来源：GitHub，2026-04-06）

## 🔗 相关链接

* GitHub：https://github.com/NousResearch/hermes-agent
* 官网文档：https://hermes-agent.nousresearch.com/docs/
* Nous Portal：https://portal.nousresearch.com
