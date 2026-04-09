---
title: Karpathy 发布 LLM 编码四大核心原则
date: 2026-04-10
tags: [AI, 开发工具]
categories: 技术
image: https://x.com/karpathy/status/2015883857489522876/photo/1
image_source: @karpathy Twitter/X
---

## 📌 原文摘要

 Andrej Karpathy 在 Twitter/X 发表了对当前 LLM 编码弱点的观察，核心问题是：模型会在用户未明确授权的情况下做出错误假设、隐藏困惑、不展示权衡、不在应该反驳时反驳，并且倾向于过度设计代码和 API。forrestchang 将这四大观察提炼为一份 CLAUDE.md 文件，提出了四大原则：**Coding 前先思考**（不要隐藏困惑，主动展示权衡）、**简洁优先**（200 行能搞定就不要 1000 行）、**手术刀式改动**（只改必须改的，不动不相干的代码）、**目标驱动执行**（用测试验证，每步可检查）。这份 CLAUDE.md 可作为 Claude Code 的插件使用，直接提升 AI 编码质量。

## 🧠 核心要点

* **Think Before Coding**：遇到模糊需求不默认猜测，主动提问；展示多种方案及权衡
* **Simplicity First**：拒绝"过度设计"和"假灵活"，没有明确需求就不加抽象，50 行能搞定就不要 200 行
* **Surgical Changes**：只改直接相关的代码，不修改相邻的注释和格式；自己的改动产生孤立代码时清理，之前的死代码不主动删除
* **Goal-Driven Execution**：把"加验证"翻译成"先写测试让它 fail，再让它 pass"；每步给出可验证的成功标准

## 🔥 推荐理由

Karpathy 提出的四个批评非常精准地戳中了当前 AI 编程助手的通病。这份 CLAUDE.md 的价值在于：不依赖模型能力提升，而是通过 Prompt Engineering 约束 AI 的行为模式来改善结果。"简洁优先"和"手术刀式改动"这两条原则尤其值得在团队中推广——很多 AI 生成的代码过于复杂、变动范围过大，正是这两个问题的叠加。文件可以直接作为 Claude Code 插件使用，建议所有使用 Claude Code 的开发者安装。

## 📊 热度信息

GitHub Trending 今日榜单第 2 位，10,093 stars，1,371 stars 今日增长，热度较高（源自 Karpathy 本人在 X 上的影响力）。

## 🔗 相关链接

* GitHub：https://github.com/forrestchang/andrej-karpathy-skills
* Karpathy 原文（X）：https://x.com/karpathy/status/2015883857489522876
* Claude Code 插件安装：`/plugin marketplace add forrestchang/andrej-karpathy-skills`
