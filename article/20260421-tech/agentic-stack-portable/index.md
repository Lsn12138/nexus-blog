---
title: Agentic Stack：跨编码 Agent 的便携式记忆与技能层
date: 2026-04-21
tags: [AI, AI Agent, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/codejunkie99/agentic-stack/main/docs/diagram.svg
image_source: Agentic Stack GitHub
---

## 📌 原文摘要

Agentic Stack 解决了一个在实际工程中频繁出现的问题：团队成员在不同 AI 编码工具（Claude Code、Cursor、Windsurf、OpenCode、OpenClaw、Hermes 等）之间切换时，每次都要重新配置记忆、技能和工作协议，积累的经验无法迁移。Agentic Stack 的方案是将记忆（memory）、技能（skills）和协议（protocols）打包成一个便携的 `.agent/` 文件夹，通过适配器无缝插入任何主流 Agent 工具，让积累随人而走，而非绑定于某一款产品。

## 🧠 核心要点

* **便携式 `.agent/` 文件夹**：包含 memory、skills 和 protocols，通过 Homebrew 或脚本安装到任意项目
* **多工具适配器**：支持 Claude Code、Cursor、Windsurf、OpenCode、OpenClaw、Hermes、Pi Coding Agent 及 DIY Python 循环
* **开箱即用的 onboarding wizard**：首次安装后自动引导用户填写 `PREFERENCES.md`，建立个人偏好记忆
* **记忆分层**：区分个人偏好（长期）和项目上下文（短期），避免干扰
* **跨工具同步**：同一个 `.agent/` 可以在不同工具间迁移使用，保持记忆连贯性
* **Homebrew 一键安装**：macOS/Linux 用户体验友好，Windows PowerShell 也有原生支持

## 🔥 推荐理由

随着 AI 编码工具越来越多，一个痛点正在浮现：开发者在不同工具间流转时丢失了积累的经验和配置。Agentic Stack 抓住了这个现实问题，并给出了一个干净的解法——把 Agent 的"大脑"从工具中解耦出来。它不是又一个新框架，而是现有工具的粘合剂。对于在多个环境工作的开发者，或团队想统一 Agent 配置标准的场景，这个项目提供了务实、可落地的方案。

## 📊 热度信息

GitHub 720 stars，79 forks，2026-04-20 仍有活跃提交，多个 Agent 社区讨论，适配 OpenClaw 等工具。

## 🔗 相关链接

- GitHub：https://github.com/codejunkie99/agentic-stack
- 文档：https://github.com/codejunkie99/agentic-stack#readme
- 安装：`brew tap codejunkie99/agentic-stack && brew install agentic-stack`
