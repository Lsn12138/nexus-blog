---
title: Hermes Agent：内置学习闭环的自主AI助手
date: 2026-04-12
tags: [AI, AI Agent]
categories: 技术
image: https://raw.githubusercontent.com/NousResearch/hermes-agent/main/assets/banner.png
image_source: NousResearch/hermes-agent
---

## 📌 原文摘要

Hermes Agent 是 Nous Research 推出的自改进 AI Agent，最大的特点是内置学习闭环——能从对话经验中创建技能、在使用中自我优化、主动持久化知识、跨 session 搜索历史对话，逐步加深对用户的理解。支持任意 LLM 提供者（OpenRouter 200+ 模型、Kimi、MiniMax 等），可通过 Telegram、Discord、Slack 等平台交互，支持 serverless 部署（Daytona、Modal），号称可在 5 美元 VPS 上运行。

## 🧠 核心要点
* **自改进循环**：Agent 自主创建技能、完成复杂任务后自我优化、技能在使用中持续迭代
* **全平台消息网关**：Telegram、Discord、Slack、WhatsApp、Signal、Email 一个进程搞定
* **任意模型切换**：`hermes model` 命令无需改代码切换不同 LLM 提供者
* **Serverless 持久化**：Daytona 和 Modal 平台支持空闲时休眠、按需唤醒，几乎零闲置成本
* **FTS5 全文搜索**：跨 session 记忆搜索，配合 LLM 总结实现长期记忆
* **Cron 调度**：自然语言描述定时任务，投递到任意平台

## 🔥 推荐理由

Hermes Agent 的差异化在于「学习闭环」——不是给 AI 一个记忆库让它查，而是让 AI 主动决定什么值得记住、什么需要优化。这比其他 Agent 只做 RAG 检索要更进一步。同时它对多模型的支持很开放，不绑定某一家提供商，对开发者友好。如果你想运行一个真正「越用越懂你」的私人 AI 助手，Hermes 是目前开源选择里最接近这个目标的项目之一。

## 📊 热度信息

GitHub Trending 当日 7,450 stars，总 stars 65,003（截至 2026-04-12），热度极高

## 🔗 相关链接

- GitHub: https://github.com/NousResearch/hermes-agent
- 文档: https://hermes-agent.nousresearch.com/docs/
- Nous Research: https://nousresearch.com
- Nous Portal: https://portal.nousresearch.com
