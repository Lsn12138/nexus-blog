---
title: ERNIE-Image：百度8B参数开源图生图模型
date: 2026-04-16
tags: [AI, 大模型, 开源]
categories: 技术
image: https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=900&q=80
image_source: Pexels
---

## 📌 原文摘要

ERNIE-Image 是百度 ERNIE-Image 团队开发的开源文生图模型，基于单流 Diffusion Transformer（DiT）架构，DiT 参数仅 8B，在开源权重模型中达到了 SOTA 性能。项目由百度团队开发并开源，于 2026-04-14 创建 GitHub 仓库，发布后快速获得关注。作为国产开源多模态模型的最新成员，ERNIE-Image 展示了百度在文生图领域的技术积累，同时提供了完整的模型权重和推理代码，方便社区复现和微调。

## 🧠 核心要点
* **8B 参数单流 DiT 架构：** 与主流开源图生图模型路线一致，参数规模合理，便于消费级 GPU 部署
* **SOTA 开源权重：** 官方声称在开源权重模型中达到最优效果，具体评测需社区验证
* **完整开源：** 提供模型权重 + 推理代码，降低复现门槛
* **百度团队背书：** 有明确的开发团队（非个人项目），技术持续性有保障

## 🔥 推荐理由

文生图开源领域此前主要由 Stable Diffusion 系列主导，国产团队多停留在技术报告阶段。ERNIE-Image 选择开源权重而非仅发论文，且主打了 DiT 路线，说明百度在多模态领域开始走开放路线。8B 参数对于有实力的团队来说 fine-tune 成本可控，可探索在特定风格/场景下的定制化训练。若后续社区评测能验证其 SOTA 声明，将对现有开源图生图生态产生冲击。

## 📊 热度信息

GitHub 于 2026-04-14 创建，当日获得 150 stars，2 天内维持上升趋势。创建时间较近，数据样本有限，建议持续观察。

## 🔗 相关链接

* GitHub：https://github.com/baidu/ERNIE-Image