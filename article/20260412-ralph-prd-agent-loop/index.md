---
title: Ralph：PRD驱动的自主AI编码循环
date: 2026-04-12
tags: [AI, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/snarktank/ralph/main/ralph.webp
image_source: snarktank/ralph
---

## 📌 原文摘要

Ralph 是一款基于 PRD（产品需求文档）的自主 AI Agent 循环工具。它以 `prd.json` 为任务蓝图，反复调用 AI 编码工具（ Amp 或 Claude Code）逐条完成需求，直到所有 story 标记为通过。每次迭代都是全新的上下文，通过 git 历史、`progress.txt` 和 `prd.json` 持久化进度与记忆。

## 🧠 核心要点
* **PRD 驱动**：以结构化 JSON 定义用户故事和验收条件，Agent 按优先级逐一实现
* **记忆机制**：git 分支 + progress.txt + prd.json，实现跨迭代上下文保留
* **自循环设计**：迭代直到所有任务通过或达到最大次数，中途可打断
* **质量门控**：每次实现后自动运行 typecheck 和测试，通过才 commit
* **支持 Amp / Claude Code**：可根据团队工具链灵活切换

## 🔥 推荐理由

Ralph 将 AI 编码从「一次对话」升级为「持续交付流水线」。它的核心价值在于：把 PRD 从静态文档变成 AI 可以逐条执行的任务清单，解决了 AI 编程中「上下文窗口耗尽后记忆丢失」的问题。这是一种朴素的工程化思路——不是让 AI 更聪明，而是让 AI 的工作可跟踪、可重复。对于追求 AI 辅助开发确定性的团队，这个 pattern 值得研究。

## 📊 热度信息

GitHub Trending 当日 519 stars，总 stars 15,790（截至 2026-04-12）

## 🔗 相关链接

- GitHub: https://github.com/snarktank/ralph
- 原文介绍: https://x.com/ryancarson/status/2008548371712135632
- 原型作者 Geoffrey Huntley: https://ghuntley.com/ralph/
