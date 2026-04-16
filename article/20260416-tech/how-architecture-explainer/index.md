---
title: How：让Cursor秒变代码架构解说员
date: 2026-04-16
tags: [AI, AI Agent, 开发工具]
categories: 技术
image: https://images.pexels.com/photos/1087338/pexels-photo-1087338.jpeg?w=900&q=80
image_source: Pexels
---

## 📌 原文摘要

How 是一个 Cursor 插件，添加 `/how` 技能：向它提问任何子系统、模块或流程的工作原理，它会输出接近高级工程师 onboarding 新领域时的结构化解释。Explain 模式探索代码库并输出 Overview、Key Concepts、How It Works、Where Things Live 和 Gotchas 五大板块；Critique 模式则先解释，再并行调度多个独立批评者跨不同模型暴露架构问题。复杂问题会自动分解为 2-4 个并行探索角度，由 subagent 收集发现后由综合 agent 汇总为连贯结论。简单问题跳过 fan-out，单 agent 跑完全程。

## 🧠 核心要点
* **五大结构化板块：** Overview / Key Concepts / How It Works / Where Things Live / Gotchas，还原老员工带新人的思维模式
* **Critique 模式：** 并行多模型批评者，主动暴露架构问题，而非只做被动解释
* **智能分解：** 复杂问题自动 fan-out 到多个 explorer subagent，再汇聚合成
* **开箱即用：** 装好 Cursor 后直接 `/how [问题]` 使用，无需额外配置

## 🔥 推荐理由

How 解决了一个高频痛点：接手遗留代码时，没有"懂行的人"带路，只能靠自己去读、去猜、去踩坑。该项目把 senior 工程师的思维模式 productize，让 code review 和架构理解不再依赖特定的人。对 AI Agent 领域而言，它的 Critique 模式展示了一种「多模型并行批评 → 综合收敛」的工程化路径，可迁移到其他需要多视角审视的场景。

## 📊 热度信息

GitHub Trending 榜上项目，283 stars，创建于 2026-04-14，2 天内快速获得关注。Cursor 生态用户基数大，该技能实用性强，传播较快。

## 🔗 相关链接

* GitHub：https://github.com/poteto/how
* 演示视频：参见项目 README