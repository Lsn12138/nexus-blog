---
title: Superpowers：用子智能体重新定义团队开发
date: 2026-04-15
tags: [AI, AI Agent, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/obra/superpowers/main/docs/screenshot.png
image_source: obra/superpowers
---

## 📌 原文摘要（100-200字）

Superpowers 是一套完整的 AI 智能体驱动软件开发方法论，通过模块化的"技能体系"让编码智能体真正按工程规范工作。其核心流程是：先通过 brainstorm 技能确认需求并产出分块设计文档，再由 writing-plans 将计划拆解为 2-5 分钟可执行任务，最后通过 subagent-driven-development 由子智能体逐个完成任务并经过两轮审查（规范合规 + 代码质量）。强调真正的红绿重构、YAGNI 和 DRY 原则，目标是让 Claude 等智能体能自主工作数小时而不偏离计划。近期已登陆 Claude 官方插件市场。

## 🧠 核心要点
* **子智能体驱动开发（SDD）：** 每个工程任务由独立子智能体执行，主智能体负责监督和审查，而非亲力亲为
* **TDD 强制循环：** RED-GREEN-REFACTOR 三步曲强制测试先行，代码未经测试不得提交
* **分块设计验证：** 强迫智能体在动手前将设计文档分块呈现给人类确认，而非直接跳到代码
* **技能自动触发：** brainstorm/planning/executing/TDD/review 等技能在对话中自动激活，无需显式调用
* **多平台支持：** 覆盖 Claude Code、Cursor、Cox、OpenCode、Gemini CLI，Claude 官方插件市场可一键安装

## 🔥 推荐理由

Superpowers 是目前最系统的 AI 编码智能体工程方法论之一。它不只是一个提示模板，而是覆盖了从需求澄清到分支完成的完整流程，并通过子智能体并行执行实现了真正的规模化。相较于单纯给 AI 下指令，这套方法论让人类扮演架构审批者的角色，AI 负责执行。对于团队引入 AI 辅助开发、或想让 AI 编程真正可持续的团队，这套框架值得深入研究。

## 📊 热度信息

GitHub Trending 持续在榜（今日仍在第六位附近），热度基于多平台曝光（Claude 官方插件市场 + 多个主流编码平台同步支持）。

## 🔗 相关链接

* GitHub：https://github.com/obra/superpowers
* Claude 插件市场：https://claude.com/plugins/superpowers
* 文档：https://github.com/obra/superpowers/blob/main/docs/README.codex.md
