---
title: Karpathy发布LLM编码四大原则Skills
date: 2026-04-09
tags: [AI, 开发工具]
categories: 技术
image: https://github.com/forrestchang/andrej-karpathy-skills/raw/main/assets/cover.png
image_source: forrestchang/andrej-karpathy-skills
---

## 📌 原文摘要

Andrej Karpathy 基于对当前 LLM 编码痛点的长期观察，指出模型存在四大系统性缺陷：不经验证就做假设、过度设计代码和 API、随意修改不理解区域的代码、缺乏可验证的成功标准。针对这些问题，他联合 forrestchang 开源了一个 CLAUDE.md 技能文件，提出了「编码前先思考」「简单性优先」「精准外科手术式修改」「目标驱动执行」四大原则，通过插件或直接集成到项目中，系统性纠正 LLM 编码行为。

## 🧠 核心要点

* **Think Before Coding**：强制 LLM 在编码前显式声明假设、呈现权衡方案、遇到模糊时主动提问而非静默猜测
* **Simplicity First**：禁止添加未请求的特性、过度抽象、冗余配置——如果 200 行能写成 50 行就重写
* **Surgical Changes**：只改必须改的，不"顺便优化"其他代码，改动必须能直接追溯到用户原始需求
* **Goal-Driven Execution**：将模糊指令转化为可验证的测试目标，让 LLM 能自主循环直到达成标准而非不断要求澄清

## 🔥 推荐理由

这份 Skills 真正抓住了当前 AI 编程工具的深层问题——不是「能力不足」，而是「自以为是」地执行。Karpathy 作为 AI 领域的顶级研究者，他的观察直击本质：LLM 在编码时倾向于过度工程化、隐藏困惑、随意改动不理解的部分。这份 Skills 相当于给 AI 编程工具装上了「安全阀」，让 AI 从「执行者」变成「思考者」。对于使用 Claude Code、Cursor 等工具的团队，这是提升输出质量的高性价比配置。

## 📊 热度信息

GitHub Trending 今日热榜，8,694 stars，686 stars 今日增长；受到 HN 社区广泛讨论（数据来源：GitHub，2026-04-08）

## 🔗 相关链接

* GitHub：https://github.com/forrestchang/andrej-karpathy-skills
* Karpathy 原始推文：https://x.com/karpathy/status/2015883857489522876
