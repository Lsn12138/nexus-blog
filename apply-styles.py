#!/usr/bin/env python3
import re
import os

webroot = '/home/admin/.openclaw/workspace/website/'

header_html = '''    <link rel="stylesheet" href="/css/news-style.css">
    <link rel="icon" href="https://images.mfanjk.com/2026/03/27/1774603940729">'''

three_js = '''<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'''

scroll_script = '''<script>
window.addEventListener('scroll', function() {
    var s = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    var sp = document.getElementById('scroll-progress');
    if (sp) sp.style.width = s + '%';
    var h = document.getElementById('header');
    if (h) {
        if (window.scrollY > 50) h.classList.add('scrolled');
        else h.classList.remove('scrolled');
    }
});
</script>'''

def update_page(html_path):
    if not os.path.exists(html_path):
        return False
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already updated
    if 'news-style.css' in content and 'canvas-bg' in content:
        return False
    
    # Add canvas-bg div after body
    if '<div id="canvas-bg">' not in content:
        content = content.replace('<body>', '<body>\n    <div id="canvas-bg"></div>')
    
    # Add header class if not present
    if 'class="header"' in content and 'id="header"' not in content:
        content = content.replace('class="header"', 'class="header" id="header"')
    
    # Add scroll progress div
    if 'id="scroll-progress"' not in content:
        content = content.replace('<body>', '<body>\n    <div class="scroll-progress" id="scroll-progress"></div>')
    
    # Add our CSS if not present
    if '/css/news-style.css' not in content:
        content = content.replace(
            '<link rel="stylesheet" href="/css/index.css">',
            '<link rel="stylesheet" href="/css/news-style.css">'
        )
        content = content.replace(
            '<link rel="stylesheet" href="/css/3d-effects.css">',
            ''
        )
    
    # Add Three.js
    if 'three.min.js' not in content:
        content = content.replace('</body>', three_js + '\n</body>')
    
    # Add scroll script
    if 'canvas-container' in content and 'three.min.js' not in content:
        # This page has old canvas, inject our script
        pass
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

count = 0
for root, dirs, files in os.walk(webroot):
    for f in files:
        if f == 'index.html':
            path = os.path.join(root, f)
            if update_page(path):
                print(f'Updated: {path.replace(webroot, "")}')
                count += 1

print(f'\nTotal updated: {count} pages')
