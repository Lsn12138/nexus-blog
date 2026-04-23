---
title: DeepSeek 开源 TileKernels：面向 LLM 的 GPU 高性能算子库
date: 2026-04-24
tags: [AI, 大模型, 开源]
categories: 技术
image: https://github.com/deepseek-ai/TileKernels/raw/main/assets/arch.png
image_source: deepseek-ai/TileKernels
---

## 原文摘要

TileKernels 是 DeepSeek 开源的 GPU 高性能算子库，使用 TileLang（领域特定语言）编写，专门针对 LLM 训练和推理中的核心算子进行极致优化。覆盖 MoE 路由（Gating、Token-to-Expert 映射）、FP8/FP4 量化（融合 SwiGLU+量化操作）、矩阵转置、Engram Gating、Manifold HyperConnection 等关键场景。部分算子已在 DeepSeek 内部训练和推理场景中投入使用，已逼近硬件算力上限。项目需要 NVIDIA SM90/SM100 架构 GPU（Hopper 系列）、PyTorch 2.10+、CUDA Toolkit 13.1+。

## 核心要点

* **TileLang DSL**：用 Python 编写高性能 GPU 内核的领域语言，支持敏捷开发和自动优化，降低手写 CUDA 的门槛
* **MoE 专项优化**：Gating 和路由算子针对混合专家模型设计，处理 Top-k 专家选择和评分
* **融合量化操作**：FP8/FP4/E5M6 量化与 SwiGLU 激活融合，减少显存访问和 kernel -launch 开销
* **开箱即用**：pip install tile-kernels 安装，已有 PyTorch autograd.Function 封装层，直接集成进模型代码
* **Benchmark 工具**：内置 pytest 测试框架，支持正确性验证和性能基准测试

## 推荐理由

LLM 推理优化的关键就在算子层面的极致压榨——FlashAttention 已经证明了这一点。TileKernels 来自 DeepSeek 内部生产环境，覆盖了 MoE 量化、矩阵运算等硬骨头，且用 TileLang 封装后比手写 CUDA 更易维护。对于训推工程同学，这是不错的参考实现；对普通开发者，其中的 Benchmark 思路和量化方法也值得学习。

## 热度信息

GitHub 509 stars，2026-04-22 创建，fork 26，来自 DeepSeek 官方，关注度高

## 相关链接

* GitHub：https://github.com/deepseek-ai/TileKernels
* TileLang：https://github.com/tile-ai/tilelang
