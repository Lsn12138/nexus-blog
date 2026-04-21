---
title: claude-context：用MCP协议把全代码库变成Claude的上下文
date: 2026-04-22
tags: [AI, AI Agent, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/zilliztech/claude-context/main/public/logo.png
image_source: claude-context GitHub
---

## 📌 原文摘要

来自向量数据库公司 Zilliz 的 claude-context 项目，瞄准了 Claude Code 在大代码库场景下的上下文不足问题。它作为 MCP（Model Context Protocol）Server，让 Claude Code 能够以语义搜索的方式访问整个代码库，而非仅依赖当前打开的文件。项目支持 Milvus、Zilliz Cloud 等向量数据库存储代码语义向量，提供文件级别血缘分析、跨仓库搜索和增量索引。对于中大型代码仓库的 AI 辅助开发，这个工具能显著提升 Claude 对代码结构的理解深度。

## 🧠 核心要点

* **全代码库语义搜索**：不只是当前文件，用向量检索让 AI 理解整个代码库的结构和依赖关系
* **MCP 协议集成**：符合 Anthropic MCP 标准，Claude Code 开箱即用
* **增量索引**：代码变更后增量更新向量索引，无需全量重建
* **文件血缘分析**：追踪函数/模块的调用关系，帮助 AI 理解代码演进历史
* **Zilliz 云支持**：可对接 Zilliz Cloud（托管向量数据库），也可自建 Milvus
* **跨仓库支持**：支持同时索引多个代码仓库，构建组织级代码知识库

## 🔥 推荐理由

Claude Code 在小规模项目上表现出色，但代码库一大就会出现"遗忘"问题——它只看到当前文件，不知道某个函数在其他模块里被怎么调用、哪个文件改了会影响到这里。claude-context 用向量数据库+MCP 协议的方式解决了这个割裂感，让 AI 的上下文从"单文件"扩展到"全代码库"。对于代码库超过几万行、使用微服务或模块化架构的团队，这个工具能把 AI 编码助手的能力提升一个档次。

## 📊 热度信息

GitHub Trending 第3名，6,389 stars，553 forks，今日增长 259 stars，Zilliz 官方维护（向量数据库领域知名团队）。

## 🔗 相关链接

- GitHub：https://github.com/zilliztech/claude-context
