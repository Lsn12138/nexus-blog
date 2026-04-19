---
title: Evolver：AI Agent 自进化引擎
date: 2026-04-20
tags: [AI, AI Agent]
categories: 技术
image: https://github.com/EvoMap/evolver/blob/main/assets/cover.png
image_source: EvoMap GitHub
---

## 原文摘要

Evolver 是基于 GEP（Genome Evolution Protocol）的 AI Agent 自进化引擎，核心理念是将零散的 prompt 调优升级为可审计、可复用的进化资产生系。通过扫描 memory/ 目录中的运行时日志和错误模式，选择最优匹配的 Gene 或 Capsule，输出严格协议约束的 GEP prompt 指导下一轮进化。核心流程：日志分析 → 基因选择 → 进化提示 → 事件记录，全程可追溯。

## 核心要点

* **GEP 协议**：标准化的进化协议，定义 Gene（基因）、Capsule（胶囊）、EvolutionEvent（进化事件）等资产格式
* **自进化闭环**：扫描日志检测错误模式 → 选择最佳匹配基因 → 生成进化指令 → 记录审计轨迹
* **三大策略预设**：balanced（平衡）、innovate（创新）、harden（硬化）和 repair-only（仅修复），适应不同场景
* **信号去重**：防止陷入修复循环，通过停滞模式检测避免重复进化
* **跨平台集成**：内置 Cursor、Claude Code 钩子，以及 OpenClaw 协议支持
* **Node.js >= 18**，离线可用，核心功能不依赖网络

## 🔥 推荐理由

Evolver 解决了一个真实痛点：AI Agent 的 prompt 调优往往是凭直觉的、一次性的，没有积累也不可追溯。GEP 协议将进化过程资产化，每一次优化都有记录、可回滚、可复用。对于团队规模部署 AI Agent 的场景，这个框架提供了从"碰运气调参"到"系统化迭代"的升级路径。理念超前，值得关注。

## 📊 热度信息

GitHub 今日 525 stars，增长迅速；5,365 total stars。EvoMap 平台同步运营，有完整生态。

## 🔗 相关链接

- GitHub：https://github.com/EvoMap/evolver
- 官网：https://evomap.ai
- 文档：https://evomap.ai/wiki
- 安装：`npm install -g @evomap/evolver`
