---
title: Ralph：PRD 驱动的自主 AI 编程循环
date: 2026-04-14
tags: [AI, 开发工具]
categories: 技术
image: https://github.com/snarktank/ralph/raw/main/ralph.webp
image_source: Ralph GitHub 官方仓库
---

## 📌 原文摘要

Ralph 是一个基于 PRD（产品需求文档）运行的自主 AI 编程循环。它基于 Geoffrey Huntley 提出的 Ralph 模式工作：给定一个 PRD（结构化为 JSON 格式的 prd.json），Ralph 自动循环调用 AI 编程工具（默认 Amp CLI，可选 Claude Code）执行任务——每次迭代都是全新上下文，通过 git 历史、progress.txt 和 prd.json 保持记忆和进度。Ralph 持续迭代直到 PRD 中所有用户故事 passes 状态为 true，或达到最大迭代次数。

## 🧠 核心要点
* **核心机制：** 将 PRD 转为 prd.json（结构化用户故事），Ralph 自动循环执行直到所有 story 通过
* **上下文管理：** 每次迭代是全新实例避免上下文污染，通过 git history + progress.txt + prd.json 三层持久化
* **工具支持：** 默认 Amp CLI，也可切换 Claude Code，支持 Claude Code 插件市场一键安装
* **分工定位：** 与 Claude Code/Amp 等工具互补——它们负责「怎么写」，Ralph 负责「按计划持续写」

## 🔥 推荐理由

Ralph 和 Archon 解决的是同一类问题（AI 编程的随机性），但走了不同路径：Archon 用 YAML 工作流强制结构，Ralph 用 PRD 驱动循环。Ralph 的亮点在于工程化思维——把产品需求文档作为 AI 的执行契约，而不是让 AI 自己决定做什么。

这种「PRD as 契约」的范式对有明确需求、迭代周期长的项目很有价值，适合工程团队和 AI coding 工具深度用户。

## 📊 热度信息

GitHub Trending 当日上榜，16,419 stars，683 stars today（数据采集时）。基于 GitHub 平台热度，属实。

## 🔗 相关链接

- GitHub：https://github.com/snarktank/ralph
- 原文介绍：https://x.com/ryancarson/status/2008548371712135632
