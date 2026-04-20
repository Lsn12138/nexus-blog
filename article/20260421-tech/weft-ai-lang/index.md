---
title: Weft：面向AI系统的Rust编写程语言
date: 2026-04-21
tags: [AI, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/WeaveMindAI/weft/main/docs/diagram.svg
image_source: Weft GitHub
---

## 📌 原文摘要

Weft 是一款用 Rust 编写的领域特定编程语言，目标是为 AI 系统提供一等公民级别的编程原语。传统编程语言中，调用 LLM、协调 Agent、等待人类审批、处理长时间跨度的任务都需要额外拼接大量胶水代码，而 Weft 将这些能力作为语言内置基元（nodes）提供。语言内置节点包括：LLM 调用、代码执行、HTTP 请求、人类审批（可暂停数天等待回复）、Gate（条件路由）、Template、Discord/Slack/Telegram/WhatsApp/Email 集成、Postgres、Memory、Web Search 等，编译器在运行前检查类型和架构连通性，程序以可视化图形式呈现。

## 🧠 核心要点

* **AI 系统的一等公民**：LLM、人类、API、基础设施作为语言内置基元，不再需要 import 各种库来拼凑
* **人类节点**：程序可随时暂停，向人类发送表单并等待回复（可长达数天），恢复后精确从暂停处继续，无需 webhooks 或轮询
* **递归可折叠**：任意节点组可折叠为单一节点，100 个节点的系统在顶层只显示 5 个模块
* **强类型 + 架构检查**：泛型、联合类型、类型变量、空值传播，编译器在运行前捕获连接错误和类型不匹配
* **持久化执行**：程序可穿越崩溃和重启，基于 Restate 实现任意时间跨度的任务耐久性
* **Rust 实现 + 活跃开发**：项目处于活跃建设中，文档中团队明确表示"边做边开源"，适合早期参与

## 🔥 推荐理由

Weft 提出了一个有趣的问题：为什么 AI 系统编程还要用传统语言的模式？当你需要"调用 LLM → 等待人类审批 → 继续执行"这样横跨数天的业务流程时，传统编程范式里要写一堆状态管理、webhook 注册、超时处理，而 Weft 把"等待人类"做成一个语言级别的节点，用类型系统保证每个分支都被正确处理。这种思路对于构建需要人机协作的复杂工作流（审批流、客服机器人、研究助手）很有启发性。虽然项目年轻（Rust 实现，两月龄），但设计理念值得 AI 系统开发者关注。

## 📊 热度信息

GitHub 904 stars，121 forks，Rust 语言，2026-04-19 活跃更新，在 Rust + AI 社区引起关注。

## 🔗 相关链接

- GitHub：https://github.com/WeaveMindAI/weft
- 官网：https://weft.dev
- 设计文档：https://github.com/WeaveMindAI/weft/blob/main/DESIGN.md
- Restate 集成文档：https://restate.dev
