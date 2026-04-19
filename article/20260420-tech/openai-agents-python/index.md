---
title: OpenAI Agents Python SDK 开源
date: 2026-04-20
tags: [AI, 开发工具]
categories: 技术
image: https://camo.githubusercontent.com/161e058e913301d37f41ce953af676421deb4ad764cbeabaab37430ceabb59ee/68747470733a2f2f63646e2e6f70656e61692e636f6d2f4150492f646f63732f696d616765732f6f726368657374726174696f6e2e706e67
image_source: OpenAI
---

## 原文摘要

OpenAI Agents SDK 是一个轻量但强大的多智能体工作流构建框架，支持 OpenAI Responses 和 Chat Completions API，以及 100+ 其他 LLM。采用 provider-agnostic 设计，核心概念包括：Agent（配置指令、工具、护栏和交接）、Sandbox Agent（可在容器中执行长时间任务的沙箱代理）、Handoffs（委托其他 agent）、Tracing（内置工作流追踪）和 Realtime Agents（语音代理）。

## 核心要点

* **多智能体协作**：支持 Agent 之间相互委托任务，适合复杂工作流编排
* **沙箱执行**：Sandbox Agent 可在配置的容器环境中执行文件系统操作、运行命令，跨越长周期任务
* **Provider 无关**：不绑定 OpenAI，兼容 100+ LLM，支持 MCP、Hosted Tools 等工具协议
* **内置安全护栏**：Guardrails 提供输入输出验证，Human-in-the-loop 支持人工介入
* **实时语音**：集成 gpt-realtime-1.5 构建语音 agent，支持 WebSocket 实时通信

## 🔥 推荐理由

这是目前最值得关注的多智能体框架之一。不同于 LangChain 等通用编排库，OpenAI Agents SDK 来自官方，深度集成 OpenAI 生态，同时保持对其他 LLM 的兼容性。其 Sandbox Agent 概念尤为实用——让 AI 在受控环境中真正"动手"执行任务，而非仅生成文本。Python 3.10+ 即可快速上手，代码示例简洁直观。

## 📊 热度信息

GitHub Trending 今日上榜，当前 9,773 stars（长期累积），96 stars 今日增长；属 OpenAI 官方维护项目，社区关注度极高。

## 🔗 相关链接

- GitHub：https://github.com/openai/openai-agents-python
- 文档：https://openai.github.io/openai-agents-python/
- 安装：`pip install openai-agents`
