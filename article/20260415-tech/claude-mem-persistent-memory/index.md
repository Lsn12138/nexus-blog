---
title: claude-mem：让Claude记住每一次调试
date: 2026-04-15
tags: [AI, AI Agent, 开发工具]
categories: 技术
image: https://github.com/thedotmack/claude-mem/raw/main/docs/assets/demo.gif
image_source: thedotmack/claude-mem
---

## 📌 原文摘要（100-200字）

claude-mem 是一款专为 Claude Code 打造的持久记忆插件，通过在每次对话中自动捕获工具调用、观察结果和上下文信息，经 AI 压缩后注入未来会话，实现跨 session 的项目连续性。安装仅需一条命令，插件自动在 SessionStart/UserPromptSubmit/PostToolUse/Stop/SessionEnd 五个生命周期钩子处记录内容，配合 SQLite 本地存储和 Chroma 向量数据库检索，开发者每次新建 session 都能获得前次工作的完整背景。项目同时支持 OpenClaw 网关、Telegram/Discord/Slack 实时推送，以及多语言 i18n 文档。

## 🧠 核心要点
* **五大生命周期钩子：** 自动拦截 Claude Code 全流程，在关键节点写入记忆，无需手动操作
* **本地优先：** 所有数据存储在本地 SQLite + Chroma，向量检索保护隐私
* **渐进式披露：** 根据 token 成本可见性地分层注入上下文，避免上下文溢出
* **OpenClaw 集成：** 一键安装到 OpenClaw 网关，支持实时向 IM 工具推送 session 摘要
* **开箱即用的搜索：** 内置 `mem-search` skill，自然语言查询项目历史记录

## 🔥 推荐理由

claude-mem 解决了一个真实痛点：AI 编码助手在每次新 session 都是"白板"。对于长期项目，这意味着反复解释背景、重新发现之前踩过的坑。该项目在 55k stars 总量基础上今日仍获 2979 stars，说明社区对"让 AI 有记忆"这件事有强烈需求。实现上采用生命周期钩子注入 + 向量压缩的技术路径，对构建 AI Agent 记忆系统有参考价值。

## 📊 热度信息

GitHub Trending 今日第二位，55,156 stars，4,423 forks，当日新增 2,979 stars，增速极快。项目于 2025 年底上线，目前仍在高频迭代。

## 🔗 相关链接

* GitHub：https://github.com/thedotmack/claude-mem
* 文档：https://docs.claude-mem.ai/
* OpenClaw 集成指南：https://docs.claude-mem.ai/openclaw-integration
