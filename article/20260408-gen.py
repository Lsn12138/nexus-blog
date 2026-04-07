#!/usr/bin/env python3
import os

base = '/home/admin/.openclaw/workspace/website/'

tags_html_ai = '<span class="article-tag">AI</span><span class="article-tag">开发工具</span>'
tags_html_ai_llm = '<span class="article-tag">AI</span><span class="article-tag">大模型</span>'

gitnexus_content = '''<h2>📌 原文摘要</h2>
<p>GitNexus 是一个零服务器的代码智能引擎，通过将代码库索引为知识图谱（依赖关系、调用链、执行流），并通过 MCP 协议暴露给 AI Agent。相比 DeepWiki 只能描述代码，它能让 AI 真正"分析"代码——理解每个模块的关联，不会在修改一个函数时遗漏其依赖方。支持 Claude Code、Cursor、Codex、Windsurf、OpenCode 等主流 AI 编程工具，提供 CLI + MCP 双入口，本地运行，数据不外传。</p>
<h2>🧠 核心要点</h2>
<ul>
<li><strong>知识图谱索引</strong>：不同于普通代码搜索，GitNexus 将代码库解析为完整的依赖图谱和调用链关系，让 AI 理解"谁调用谁、谁依赖谁"</li>
<li><strong>MCP 协议深度集成</strong>：不只是提供代码片段，而是给 Agent 一个"代码架构视图"，从根本上减少盲目修改导致的 Bug</li>
<li><strong>多编辑器支持</strong>：Claude Code 支持最完整（MCP + Skills + Hooks），Cursor/Codex 次之，Hook 机制让每次 commit 后自动重建索引</li>
<li><strong>本地优先</strong>：所有解析、索引、存储均在本地完成，不上传任何代码到云端，适合对代码安全有要求的企业</li>
<li><strong>Bridge 模式</strong>：CLI 索引的仓库可通过 <code>gitnexus serve</code> 暴露给 Web UI，无需重复上传</li>
</ul>
<h2>🔥 推荐理由</h2>
<p><strong>这是 AI 编程工具链中一个被低估的基础设施补全。</strong> 现在的 AI Code Agent 最大的痛点不是生成代码质量，而是"视野"——它只看到当前对话窗口的上下文，看不到代码库的全局架构。GitNexus 解决的就是这个问题：让 Agent 在改代码之前，先"看懂"这张依赖图谱。</p>
<p>相比竞品 DeepWiki，GitNexus 更偏向 Agent 工具属性（CLI + MCP），而非纯人类阅读（Web UI），定位更清晰。它的 MCP server 让任何支持 MCP 的 Agent 都能接入，生态兼容性更强。对于正在构建 AI 编程工作流的团队，这是一个值得集成的基础层工具。</p>
<h2>📊 热度信息</h2>
<p>今日 GitHub Trending 排名靠前，24h 内新增约 <strong>1,174 stars</strong>，总 stars 24,279，增长迅猛。</p>
<h2>🔗 相关链接</h2>
<ul>
<li>GitHub：<a href="https://github.com/abhigyanpatwari/GitNexus">https://github.com/abhigyanpatwari/GitNexus</a></li>
<li>在线体验：<a href="https://gitnexus.vercel.app">https://gitnexus.vercel.app</a></li>
</ul>'''

personaplex_content = '''<h2>📌 原文摘要</h2>
<p>PersonaPlex 是 NVIDIA 开源的全双工（full-duplex）语音对话模型，基于 Moshi 架构微调，支持实时语音 in/语音 out 的角色扮演式对话。用户可通过文本描述或音频样本定义角色人格，模型在对话中保持一致。支持服务场景（客服、销售）和开放闲聊两类角色，当前在 Hugging Face 已有 7B 版本可下载。本地部署仅需单卡 GPU，官方提供 Web UI 和离线脚本两种使用方式。</p>
<h2>🧠 核心要点</h2>
<ul>
<li><strong>全双工实时对话</strong>：区别于传统 TTS + ASR 串联方案，PersonaPlex 是原生语音到语音的端到端模型，低延迟是核心优势</li>
<li><strong>角色控制双模式</strong>：支持文本 prompt（定义人格/场景）和音频 voice prompt（用声音样本定义音色），两者可组合使用</li>
<li><strong>多角色预设</strong>：内置多种固定声音（NAT 系列自然女声/NAT 系列自然男声/VAR 系列多变音色），开箱即用</li>
<li><strong>基于 Moshi + Helium</strong>：继承开源社区成熟架构，NVIDIA 在其基础上做了角色对话专项微调，降低了复现门槛</li>
<li><strong>本地可部署</strong>：MIT 协议，支持自托管，适合需要数据留存的客服场景，无需将语音数据发送到第三方</li>
</ul>
<h2>🔥 推荐理由</h2>
<p><strong>语音 Agent 赛道值得关注。</strong> 2025-2026 年是 AI Agent 爆发年，而大多数 Agent 产品还停留在"文字输入 → 文字输出"阶段。PersonaPlex 的出现说明多模态（语音）Agent 的基础设施正在快速成熟。</p>
<p>它的定位很有意思：不是做一个通用的语音助手，而是专注"角色扮演式对话"——客服、外卖、导游、教学等垂直场景。这种差异化让它比通用语音助手更容易落地。国内很多团队在做类似的 AI 客服/电话销售产品，PersonaPlex 的架构值得参考，尤其是如何在端侧控制对话延迟。</p>
<h2>📊 热度信息</h2>
<p>今日 GitHub Trending 排名靠前，24h 内新增约 <strong>663 stars</strong>，总 stars 7,776，NVIDIA 官方出品。</p>
<h2>🔗 相关链接</h2>
<ul>
<li>GitHub：<a href="https://github.com/NVIDIA/personaplex">https://github.com/NVIDIA/personaplex</a></li>
<li>Hugging Face：<a href="https://huggingface.co/nvidia/personaplex-7b-v1">https://huggingface.co/nvidia/personaplex-7b-v1</a></li>
<li>论文：<a href="https://arxiv.org/abs/2602.06053">https://arxiv.org/abs/2602.06053</a></li>
<li>NVIDIA Research：<a href="https://research.nvidia.com/labs/adlr/personaplex/">https://research.nvidia.com/labs/adlr/personaplex/</a></li>
</ul>'''

qmd_content = '''<h2>📌 原文摘要</h2>
<p>QMD 是一个命令行本地搜索引擎，专为个人文档、笔记、会议记录等知识库设计。它将 BM25 关键词搜索、向量语义搜索和 LLM 重排三者结合，全部跑在本地（通过 node-llama-cpp 调用 GGUF 模型）。支持 MCP 协议，可作为 AI Agent 的记忆检索工具接入 Claude Desktop、Claude Code 等。适合需要将大量本地文档作为 Agent 上下文来源的开发者。</p>
<h2>🧠 核心要点</h2>
<ul>
<li><strong>混合搜索架构</strong>：BM25（快速关键词）+ 向量语义搜索（理解意图）+ LLM 重排（提升相关性），三者串联取长补短</li>
<li><strong>全本地运行</strong>：embedding 和 reranking 模型均通过 node-llama-cpp 在本地加载，无需调用 OpenAI 等外部 API，数据完全私有</li>
<li><strong>MCP 服务模式</strong>：支持 HTTP transport 的长驻 MCP server，多个 Agent 可共享同一个索引进程，避免重复加载模型</li>
<li><strong>为 Agent 设计的输出格式</strong>：<code>--json</code> 和 <code>--files</code> 选项直接输出结构化结果，方便 AI 直接消费，而非展示给人看</li>
<li><strong>Context 树机制</strong>：可以为每个文档集合添加语义描述（context），帮助模型在召回相关文档时做出更准确的上下文选择</li>
</ul>
<h2>🔥 推荐理由</h2>
<p><strong>个人知识管理 + AI Agent 工作流的交集产品。</strong> 当你的笔记/文档达到一定规模后，"能不能找到"比"记没记"更重要。QMD 解决的不是通用搜索（Google 早做得够好了），而是<strong>你自己的知识资产</strong>的检索问题。</p>
<p>它的亮点是把搜索质量和本地隐私做了平衡：不是简单地把文档扔给 LLM 总结，而是用本地向量库做语义召回，用 LLM 做重排——这种设计在隐私和效果之间找到了一个合理折中。另外，Agent 工具属性很强：<code>--all --files --min-score</code> 这种输出格式，明显是为"AI 读取文件再处理"这个工作流设计的。如果你有大量本地文档需要 AI 处理，这是个值得一试的基础设施。</p>
<h2>📊 热度信息</h2>
<p>今日 GitHub Trending 排名靠前，24h 内新增约 <strong>859 stars</strong>，总 stars 19,363，增长势头强劲。</p>
<h2>🔗 相关链接</h2>
<ul>
<li>GitHub：<a href="https://github.com/tobi/qmd">https://github.com/tobi/qmd</a></li>
<li>NPM：<a href="https://www.npmjs.com/package/@tobilu/qmd">https://www.npmjs.com/package/@tobilu/qmd</a></li>
</ul>'''


def make_html(title, date, tags_html, content):
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>''' + title + ''' | NEXUS</title>
    <meta name="description" content="''' + title + '''">
    <link rel="stylesheet" href="/css/article-style.css">
    <link rel="stylesheet" href="/css/nexus-enhancements.css">
    <link rel="icon" href="https://images.mfanjk.com/2026/03/27/1774603940729">
</head>
<body>
    <div class="scroll-progress" id="scroll-progress"></div>
    <header class="header" id="header">
        <a href="/" class="logo">NEXUS</a>
        <nav class="nav-links">
            <a href="/">首页</a>
            <a href="/archives/">归档</a>
            <a href="/categories/">分类</a>
            <a href="/tags/">标签</a>
            <a href="/about/">关于</a>
        </nav>
    </header>
    <section class="article-hero">
        <div class="article-hero-content hero-content">
            <div class="article-meta-top">
                <span class="article-date">''' + date + '''</span>
                <span class="article-category">技术</span>
            </div>
            <h1 class="article-title">''' + title + '''</h1>
            <div class="article-tags">''' + tags_html + '''</div>
        </div>
    </section>
    <article class="article-content-wrapper">
        <div class="article-content">''' + content + '''</div>
    </article>
    <div id="giscus-thread"></div>
    <footer class="footer">
        <p>© 2026 NEXUS. All rights reserved.</p>
        <p><a href="/" class="footer-link">返回首页</a></p>
    </footer>
    <script src="/js/nexus-data.js"></script>
    <script src="/js/nexus-site.js"></script>
    <script>
    window.addEventListener('scroll', function() {
        var target = document.getElementById('scroll-progress');
        if (!target) return;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height <= 0) { target.style.width = '0%'; return; }
        var progress = document.documentElement.scrollTop / height * 100;
        target.style.width = progress + '%';
        var header = document.getElementById('header');
        if (header) { header.classList.toggle('scrolled', window.scrollY > 24); }
    });
    </script>
</body>
</html>'''


articles = [
    ('gitnexus-code-intelligence-engine', 'GitNexus：给AI Agent装上代码神经系统', '2026-04-08', tags_html_ai, gitnexus_content),
    ('nvidia-personaplex-speech', 'NVIDIA PersonaPlex：实时语音对话的端侧模型', '2026-04-08', tags_html_ai_llm, personaplex_content),
    ('qmd-local-search-engine', 'QMD：本地运行的个人知识库搜索CLI', '2026-04-08', tags_html_ai, qmd_content),
]

for slug, title, date, tags_html, content in articles:
    dir_path = base + 'article/20260408-tech/' + slug + '/'
    os.makedirs(dir_path, exist_ok=True)
    html = make_html(title, date, tags_html, content)
    with open(dir_path + 'index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Generated: ' + dir_path + 'index.html')

print('Done!')
