---
title: QMD：本地运行的个人知识库搜索CLI
date: 2026-04-08
tags: [AI, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/tobi/qmd/main/assets/qmd-architecture.png
image_source: tobi/qmd
---

## 📌 原文摘要

QMD 是一个命令行本地搜索引擎，专为个人文档、笔记、会议记录等知识库设计。它将 BM25 关键词搜索、向量语义搜索和 LLM 重排三者结合，全部跑在本地（通过 node-llama-cpp 调用 GGUF 模型）。支持 MCP 协议，可作为 AI Agent 的记忆检索工具接入 Claude Desktop、Claude Code 等。适合需要将大量本地文档作为 Agent 上下文来源的开发者。

## 🧠 核心要点

* **混合搜索架构**：BM25（快速关键词）+ 向量语义搜索（理解意图）+ LLM 重排（提升相关性），三者串联取长补短
* **全本地运行**：embedding 和 reranking 模型均通过 node-llama-cpp 在本地加载，无需调用 OpenAI 等外部 API，数据完全私有
* **MCP 服务模式**：支持 HTTP transport 的长驻 MCP server，多个 Agent 可共享同一个索引进程，避免重复加载模型
* **为 Agent 设计的输出格式**：`--json` 和 `--files` 选项直接输出结构化结果，方便 AI 直接消费，而非展示给人看
* **Context 树机制**：可以为每个文档集合添加语义描述（context），帮助模型在召回相关文档时做出更准确的上下文选择

## 🔥 推荐理由

**个人知识管理 + AI Agent 工作流的交集产品。** 当你的笔记/文档达到一定规模后，"能不能找到"比"记没记"更重要。QMD 解决的不是通用搜索（Google 早做得够好了），而是**你自己的知识资产**的检索问题。

它的亮点是把搜索质量和本地隐私做了平衡：不是简单地把文档扔给 LLM 总结，而是用本地向量库做语义召回，用 LLM 做重排——这种设计在隐私和效果之间找到了一个合理折中。另外，Agent 工具属性很强：`--all --files --min-score` 这种输出格式，明显是为"AI 读取文件再处理"这个工作流设计的。如果你有大量本地文档需要 AI 处理，这是个值得一试的基础设施。

## 📊 热度信息

今日 GitHub Trending 排名靠前，24h 内新增约 **859 stars**，总 stars 19,363，增长势头强劲。

## 🔗 相关链接

* GitHub：https://github.com/tobi/qmd
* NPM：https://www.npmjs.com/package/@tobilu/qmd
