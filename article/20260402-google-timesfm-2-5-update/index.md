---
title: Google开源TimesFM 2.5：参数量砍半，上下文扩展16倍
date: 2026-04-02
tags: [AI, 大模型, 时间序列]
categories: 技术
image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80
image_source: Unsplash
---

## 原文摘要

Google Research 发布 TimesFM 2.5，是其时间序列预测基础模型的最新版本。相比 2.0 版本，新版将参数量从 500M 降至 200M，同时将上下文长度从 2,048 扩展至 16,384，增幅达 8 倍。此外新增连续分位数预测头（Continuous Quantile Head），支持最长 1,000 步预测，并去掉了频率指示器简化使用流程。模型已在 Hugging Face 发布，可通过 `pip install timesfm` 直接加载。

## 核心要点

* 参数量减少 60%（500M→200M），更适合边缘和端侧部署
* 上下文长度提升 8 倍（2k→16k），处理长序列能力大幅增强
* 新增可选 30M 分位数预测头，支持不确定性量化输出
* 移除频率指示器，使用门槛降低，API 更简洁
* 支持 PyTorch 和 Flax 两种后端，Hugging Face 直接可用

## 推荐理由

时间序列预测是大模型落地的重要场景，而 TimesFM 2.5 的核心改进——小模型、长上下文——直接命中了实际部署的痛点。200M 参数意味着可以在消费级 GPU 上运行，16k 上下文意味着能处理更长的历史数据，这对工业 IoT、运维监控、金融预测等场景非常有价值。作为 Google 官方支持的项目，其稳定性和持续迭代有保障，是一个值得放进技术栈的基础模型。

## 热度信息

GitHub Trending 今日在榜，Google Research 官方博客背书。TimesFM 1.0 论文为 ICML 2024 录用，2.5 版本为最新正式发布。

## 相关链接

* GitHub：https://github.com/google-research/timesfm
* Hugging Face：https://huggingface.co/collections/google/timesfm-release-66e4be5fdb56e960c1e482a6
* Google Research Blog：https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/
* 论文：https://arxiv.org/abs/2310.10688
