---
title: Weft：面向AI系统的Rust编程语言
date: 2026-04-16
tags: [AI, 开发工具, 编程语言]
categories: 技术
image: https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=900&q=80
image_source: Pexels
---

## 📌 原文摘要

Weft 是一种面向 AI 系统的编程语言，当前版本约 2 个月，处于公开开发阶段（building in public）。其核心理念是：2026 年的软件已经常态化的调用 LLMs、启动数据库、等待人类输入、协调多个 agent，但这些能力的编程接口仍然分散在各种库和胶水代码里，没有被作为语言级原语来对待。Weft 将 LLM、human、API、infrastructure 作为基础构建块，开发者用它们 wiring 程序，编译器检查架构，并自动生成可视化程序图。项目使用 Rust 实现，长期愿景是让项目能够用 Weft 语言本身定义新的节点（node），但此功能仍在规划中。

## 🧠 核心要点
* **语言级 AI 原语：** LLMs、humans、APIs、infrastructure 作为一等公民（base ingredients），而非库调用
* **编译器架构检查：** 程序 wiring 后编译器检查架构合理性，提前发现问题
* **自动可视化：** 程序自动生成 visual graph，不用手动画架构图
* **Rust 实现：** 语言本身用 Rust 编写，项目明确说明"treat it as a foundation to build on, not a finished product"
* **早期项目：** 仅 2 个月大，预计会有 breaking changes，生产使用需谨慎

## 🔥 推荐理由

Weft 回应了一个真实的语言设计问题：当 LLMs 和 agents 变成编程的核心对象，现有的语言抽象（比如"一个函数返回 string"）已经不够用了——你需要的描述是"这个程序调用哪个模型、等待谁的输入、触发哪些 side effects"。虽然 Weft 目前还很早期，但它选择的切入角度（让语言本身理解 AI 系统结构）比单纯包装一个 SDK 要更深一层。如果你对 AI + 编程语言方向有兴趣，或者在构建复杂 multi-agent 系统时苦于没有合适的抽象工具，Weft 值得关注。

## 📊 热度信息

GitHub 于 2026-04-15 创建，获得 139 stars。文档中明确说明 README 等文本是快速写就的，可能有 AI 生成的痕迹，欢迎 PR 改进写作质量——说明团队重心在语言实现本身。

## 🔗 相关链接

* GitHub：https://github.com/WeaveMindAI/weft
* 设计文档：https://github.com/WeaveMindAI/weft/blob/main/DESIGN.md