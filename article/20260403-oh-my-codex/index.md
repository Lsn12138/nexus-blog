---
title: "Oh My Codex：Codex CLI 工作流增强框架"
date: 2026-04-03
tags: [AI, 开发工具]
categories: 技术
image: https://opengraph.githubassets.com/prod/Yeachan-Heo/oh-my-codex
image_source: GitHub
---

## 📌 原文摘要

Oh My Codex（OMX）是为 OpenAI Codex CLI 打造的工作流增强层。它不替代 Codex，而是围绕 Codex 添加更结构化的任务路由和工作流编排。通过 `$deep-interview`、`$ralplan`、`$team`、`$ralph` 四个核心命令，将日常开发任务拆解为「需求澄清 → 方案审批 → 执行」的标准化流程，并支持多智能体并行执行。

核心特性：
- `$deep-interview`：在任务边界不清时，通过深度追问澄清需求
- `$ralplan`：将澄清后的需求转化为具体实现方案并评审权衡
- `$ralph`：单 Owner 持续推进的持久化执行循环
- `$team N:role`：多角色并行协作执行已批准的方案
- `.omx/` 目录持久化存储计划、日志、内存和状态

## 🧠 核心要点

* OMX 是 Codex CLI 的工作流框架，不是独立 AI 工具，Codex 仍是执行引擎
* 内置多智能体团队编排能力，`$team` 命令可指定 N 个执行者并行工作
* 四个 canonical commands 覆盖完整开发周期：clarify → plan → approve → execute
* 支持 tmux 持久化运行时（macOS/Linux）和 psmux（Windows）
* 提供 OpenClaw 集成文档，说明已支持与 OpenClaw 生态对接

## 🔥 推荐理由

Codex CLI 是 OpenAI 推出的轻量级 AI 编程工具，但默认体验缺乏结构化工作流。OMX 填补了这一空白——它不是又一个 AI 编程工具，而是一套让 AI 编程更有节奏感的方法论。

`$deep-interview` 的设计理念很有意思：在动手之前先「追问需求」，这正是很多团队缺少的步骤。多角色并行执行也契合当前多智能体协作的趋势。

代码完全开源（MIT），文档清晰，且同时支持 OpenClaw 集成，对已有 OpenClaw 的团队来说可以无缝接入。

## 📊 热度信息

GitHub Trending 日榜第 2 位，今日新增 2,852 stars，总星数 10,848（截至 2026-04-02）。增长势头非常强劲，4 月 2 日刚上榜。

## 🔗 相关链接

- GitHub：https://github.com/Yeachan-Heo/oh-my-codex
- 官网：https://yeachan-heo.github.io/oh-my-codex-website/
- NPM：https://www.npmjs.com/package/oh-my-codex
- 文档：https://github.com/Yeachan-Heo/oh-my-codex/blob/main/docs/getting-started.html
- OpenClaw 集成：https://github.com/Yeachan-Heo/oh-my-codex/blob/main/docs/openclaw-integration.md
