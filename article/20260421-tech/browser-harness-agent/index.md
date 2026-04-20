---
title: Browser Harness：让LLM自我修复完成任何浏览器任务
date: 2026-04-21
tags: [AI, 开发工具]
categories: 技术
image: https://r2.browser-use.com/github/ajsdlasnnalsgasld.png
image_source: browser-use.com
---

## 📌 原文摘要

Browser Harness 是 browser-use 团队推出的轻量级浏览器自动化框架，核心理念是"让 AI 在执行任务过程中自我修复"。传统浏览器自动化框架往往通过预定义操作集来约束 AI 的行为，而 Browser Harness 做了一个反直觉的设计：完全放手，让 AI 在遇到缺失能力时自己写代码补上。整个架构只有一层 WebSocket 直连 CDP（Chrome DevTools Protocol），没有任何中间抽象层。

## 🧠 核心要点

* **极简架构**：一个 WebSocket 连接 Chrome，没有框架、没有配方、没有轨道式约束
* **自我修复机制**：当 AI 发现 `helpers.py` 缺少某个函数（如 `upload_file()`）时，直接原地编辑并补全，执行后继续任务
* **零门槛接入**：只需一条 setup prompt，粘贴到 Claude Code 或 Codex 即可启动
* **免费远程浏览器**：cloud.browser-use.com 提供免费 tier（3 个并发浏览器，无需信用卡）
* **Domain Skills 示例**：内置多种任务类型的参考实现，包括社交媒体管理、数据抓取、表单填写等
* **Python + CDP**：底层基于 Playwright 封装的 CDP 连接，兼容主流 LLM

## 🔥 推荐理由

Browser Harness 解决了一个很实在的问题：浏览器自动化的场景太多太杂，任何预定义的操作集都覆盖不全。与其让 AI 在受限的菜单里选操作，不如让它自己判断缺什么、补什么。这种"让 AI 写它自己需要的工具"的思路，本质上是把元认知带入了执行层。对于需要构建复杂浏览器自动化场景（如多步骤表单、动态内容处理、跨域操作）的开发者，这个框架提供了一个极简但强大的底层原语，而不是又一层厚重封装。

## 📊 热度信息

GitHub 今日活跃更新（2026-04-20），3,256 stars，253 forks，近期增长较快，被多家 AI 开发者社区讨论。

## 🔗 相关链接

- GitHub：https://github.com/browser-use/browser-harness
- 官网：https://browser-use.com
- 文档：https://docs.browser-use.com
- 免费 API Key：https://cloud.browser-use.com/new-api-key
