---
title: 微软开源VibeVoice：前沿语音AI，支持90分钟长音频合成
date: 2026-04-02
tags: [AI, 语音AI, 开源]
categories: 技术
image: https://www.lsn.org.cn/img/vibevoice-cover.jpg
image_source: Unsplash
---

## 原文摘要

VibeVoice 是微软开源的前沿语音 AI 框架，包含文本转语音（TTS）和自动语音识别（ASR）两大模型族。其中 VibeVoice-TTS-1.5B 可合成最长 90 分钟的多说话人长音频，已被 ICLR 2026 录用为 Oral 论文；VibeVoice-ASR-7B 支持 50+ 语言的流式语音识别，最长可处理 60 分钟音频并输出含说话人、时间戳和内容结构的转录结果，已集成进 Hugging Face Transformers v5.3.0。该项目采用超低帧率（7.5 Hz）连续语音分词器，显著提升长序列处理效率。

## 核心要点

* VibeVoice-TTS-1.5B 被 ICLR 2026 录为 Oral 论文，学术认可度高
* ASR 模型已进 Hugging Face Transformers 官方库，可直接 `from transformers import VibeVoiceASR` 调用
* 核心创新：7.5 Hz 超低帧率连续语音分词器，兼顾音频保真度与计算效率
* 支持 50+ 语言，中文在内的多语言场景可直接使用
* 开源协议明确可持续使用，不似此前 TTS 代码因滥用被下架

## 推荐理由

VibeVoice 代表了开源语音模型的最高水平之一。与传统 TTS 系统相比，它的超长音频合成能力（90 分钟）和流式 ASR 能力在实际产品中有极高的实用价值。更值得关注的是它已进 HF 官方库——这意味着任何 Python 开发者 `pip install transformers` 后就能直接调用。对需要本地化部署语音能力的团队，这是一个绕不开的基础设施级项目。

## 热度信息

GitHub 星标 34,515，fork 3,929，今日新增 1,685 stars，保持在 GitHub Trending 前列。Hugging Face Transformers 官方集成进一步扩大影响力。

## 相关链接

* GitHub：https://github.com/microsoft/VibeVoice
* Hugging Face：https://huggingface.co/microsoft/VibeVoice-ASR
* 论文：https://arxiv.org/pdf/2601.18184
