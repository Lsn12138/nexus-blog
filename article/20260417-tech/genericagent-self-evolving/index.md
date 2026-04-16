---
title: GenericAgent：3K 行代码的自进化 AI Agent
date: 2026-04-17
tags: [AI, AI Agent]
categories: 技术
image: https://raw.githubusercontent.com/lsdefine/GenericAgent/main/assets/images/bar.jpg
image_source: GenericAgent GitHub
---

## 📌 原文摘要

GenericAgent 是一个极简的自进化自主 Agent 框架，核心代码仅约 3000 行。它的核心理念是「不预装技能，而是在使用中自我进化」——每次完成任务后，Agent 会自动将执行路径结晶为可复用的 Skill，逐步形成属于用户个人的技能树。支持浏览器、终端、文件系统、键鼠、屏幕视觉和 ADB 移动设备控制，仅用 9 个原子工具和约 100 行的 Agent Loop 实现。上下文窗口仅需 30K，远低于主流百万级框架。

## 🧠 核心要点

* **极简架构**：核心仅 ~3K 行代码，Agent Loop 约 100 行，无复杂依赖，pip install 即可运行
* **自进化机制**：每完成一个任务自动生成 Skill，长期使用后积累成独特的个人技能树
* **多层记忆系统**：L0 元规则 → L1 洞察索引 → L2 全局事实 → L3 技能/SOP → L4 会话存档
* **极低 Token 消耗**：<30K 上下文窗口，相比 200K~1M 的主流 Agent 大幅降低成本
* **支持多种 LLM**：兼容 Claude / Gemini / Kimi / MiniMax 等主流模型
* **机器之心报道**：2026 年 3 月被机器之心专题报道，已有实际政务机器人落地案例

## 🔥 推荐理由

GenericAgent 的设计哲学值得关注：不是做一个功能丰富的重型框架，而是用极简种子代码 + 自进化机制，让能力在使用中自然生长。这种「 Less is More」的思路对 Agent 架构设计很有启发性。它的自进化机制——把每次任务执行路径结晶为可复用 Skill——本质上是在解决 Agent 的经验积累问题，而不是每次从零开始。对于想深入理解 Agent 系统的开发者，这个项目代码量小、可读性强，是很好的学习样本。

## 📊 热度信息

GitHub Trending 入选，机器之心报道，多个技术社区讨论，883 stars 今日增长

## 🔗 相关链接

- GitHub：https://github.com/lsdefine/GenericAgent
- 技能库发布：https://mp.weixin.qq.com/s/q2gQ7YvWoiAcwxzaiwpuiQ
- 机器之心报道：https://mp.weixin.qq.com/s/uVWpTTF5I1yzAENV_qm7yg
