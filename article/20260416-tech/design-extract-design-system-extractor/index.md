---
title: design-extract：提取任意网站的设计系统
date: 2026-04-16
tags: [AI, 开发工具, 前端]
categories: 技术
image: https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=900&q=80
image_source: Pexels
---

## 📌 原文摘要

design-extract 是一个可以从任意网站提取完整设计体系的工具，输出内容包括配色、字体、间距、阴影等视觉维度。通过 npx CLI 或 Claude Code 插件两种方式使用，一行命令即可分析目标页面，返回结构化的 design token。支持的输出格式涵盖 colors、typography、spacing、shadows 等，适用于设计师和前端开发者快速理解一个网站的设计语言，并在自己的项目中复用或复刻。项目于 2026-04-15 创建，2 天内获得 147 stars，并被标记为多个 AI/agent 相关 topics（agent-skill、claude-code-plugin 等）。

## 🧠 核心要点
* **npx CLI + Claude Code 插件双入口：** 覆盖命令行使用和 AI 编码助手集成两种场景
* **多维度设计 token 输出：** 配色、字体、间距、阴影等核心视觉变量一键提取
* **即插即用：** 不需要登录、API key 或复杂配置，直接分析 URL
* **Claude Code 深度集成：** 作为 agent-skill 直接嵌入 AI 编程工作流

## 🔥 推荐理由

design-extract 解决了一个设计师和前端开发者都会遇到的高频需求：看到某个网站的设计很喜欢，想知道它的配色方案、字体规格、间距系统是什么。以前只能靠浏览器 DevTools 一个个去查，或者用截图工具辅助参考，现在一条命令就能得到结构化的设计 token。这对于 AI Agent 做设计稿转代码、或者快速复刻参考网站风格时尤其有用。topics 包含 agent-skill 也说明它被定位为 AI 工作流的一环，而非单纯的设计工具。

## 📊 热度信息

GitHub 于 2026-04-15 创建，当日获得 147 stars。Topics 覆盖 agent-skill、claude-code-plugin、npx、tailwind、playwright 等多个相关生态标签，在 Cursor/Windsurf 等 AI 编程工具用户群体中传播较快。

## 🔗 相关链接

* GitHub：https://github.com/Manavarya09/design-extract
* 使用方式：`npx design-extract https://example.com`