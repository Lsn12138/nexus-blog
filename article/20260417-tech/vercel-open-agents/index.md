---
title: Vercel Open Agents：云端后台编码 Agent 模板
date: 2026-04-17
tags: [AI, AI Agent, 开发工具]
categories: 技术
image: https://vercel.com/api/sponsorships/render-image?id=9f6443c0f519ef36c2aa9b8a514c6a2c
image_source: Vercel
---

## 📌 原文摘要

Vercel Labs 开源了 Open Agents 参考应用，用于在 Vercel 平台上构建和运行后台编码 Agent。系统分三层：Web 层处理认证、会话、聊天和流式 UI；Agent 层以 Durable Workflow 形式运行；Sandbox 层提供隔离的执行环境（文件系统、Shell、Git、开发服务器）。核心架构决策是「Agent 不运行在沙箱内」，而是通过工具与沙箱交互，从而实现沙箱生命周期的独立管理和休眠恢复。

## 🧠 核心要点

* **架构分离**：Agent 运行在 Workflow 中而非沙箱内，沙箱可独立休眠/恢复，不绑定请求生命周期
* **完整编码能力**：内置文件、搜索、Shell、任务、Skill、Web 等工具，支持 GitHub 深度集成
* ** Durable Execution**：多步骤任务持久化执行，支持流式输出和任务取消
* **一键部署**：通过 Vercel 按钮可直接 fork 并部署，支持 GitHub App 集成自动 PR
* **Session 共享**：通过只读链接分享对话历史，支持语音输入（ElevenLabs）
* **可扩展性强**：鼓励 fork 后定制，而非黑盒使用，代码结构完全透明

## 🔥 推荐理由

Vercel 把自己在 Edge 运行时上的工程能力开源了。对于想构建「云端 AI 编程助手」的团队，这个项目提供了完整的技术参考——尤其是沙箱与 Agent 解耦的架构设计，以及如何用 Durable Objects/Workflow 实现长期任务。另外关于沙箱快照、端口暴露（3000/5173/4321/8000）、自动休眠这些细节，对于做远程开发环境的产品设计很有参考价值。想做 AI Coding Agent 即服务的团队，值得认真研究这个项目。

## 📊 热度信息

GitHub Trending 入选，Vercel 官方出品，735 stars 今日增长

## 🔗 相关链接

- GitHub：https://github.com/vercel-labs/open-agents
- 在线演示：https://open-agents.dev/
- Vercel 部署：https://vercel.com/new/clone?project-name=open-agents&repository-name=open-agents
