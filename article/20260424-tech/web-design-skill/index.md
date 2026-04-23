---
title: 开源 AI Web 设计技能包，让生成页面从能用变惊艳
date: 2026-04-24
tags: [AI, 开发工具]
categories: 技术
image: https://raw.githubusercontent.com/ConardLi/web-design-skill/main/assets/demo.png
image_source: ConardLi/web-design-skill
---

## 原文摘要

web-design-skill 是一个开源的 AI Agent 技能包，灵感来自 Anthropic 的 Claude Design。它通过一套结构化的系统提示词，解决 AI 生成网页"千人一面"的问题——蓝紫渐变背景、Inter 字体、蓝 primary 按钮、emoji 图标。Skill 内置六大工作流：需求理解→设计上下文收集→设计系统声明（颜色/字体/间距/动效）→原型验证→完整构建→交付检查。同时提供反设计常识清单（Anti-cliché）和基于 oklch 色彩空间的感知均匀配色方案，以及六组经过验证的配色×字体组合，开箱即用。

## 核心要点

* **结构化设计流程**：六步工作流强制 AI 在写代码前声明设计系统，避免边改边看效果的低效循环
* **反常识设计清单**：明确禁止紫蓝渐变、Inter 字体、emoji 图标等 AI 默认俗套输出
* **oklch 配色方案**：基于人眼感知均匀的色彩系统，解决 HSL 亮度不统一问题
* **多工具兼容**：适配 Claude Code、Cursor 等主流 AI 编码工具的 Skill 格式，复制到 `.agents/skills/` 即可自动加载
* **覆盖多种输出类型**：落地页、数据看板、PPT、原型动画、设计系统均可

## 推荐理由

当下 AI 生成前端代码的最大痛点不是"能不能跑"，而是"太丑太雷同"——这是因为模型缺乏真正的设计判断力，只能靠默认风格"凑合"。这个 Skill 实际上是把资深设计师的经验蒸馏成 Prompt 规则，让 AI 每次生成前都"先想再做"，从根本上提升输出质量。对于经常需要用 AI 快速生成界面的开发者，这套工作流值得直接借鉴。

## 热度信息

GitHub 697 stars，2026-04-21 创建，fork 140，内容聚焦 AI 前端开发工具，热度较高（基于多平台曝光）

## 相关链接

* GitHub：https://github.com/ConardLi/web-design-skill
* Claude Design 原版：https://www.anthropic.com/news/claude-design-anthropic-labs
