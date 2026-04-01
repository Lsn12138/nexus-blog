(function () {
  const allArticles = (window.NEXUS_CONTENT || []).map(normalizeArticle);
  const displayArticles = allArticles.filter((article) => article.url);
  const featuredArticles = displayArticles
    .filter((article) => article.featured)
    .sort(sortByDateDesc);
  const pageKey = detectPage();
  const state = {
    searchOpen: false,
    searchQuery: "",
    searchCategory: "all",
    searchYear: "all",
    searchTag: "",
    searchScrollY: 0
  };
  const motionState = {
    nodes: [],
    scheduled: false,
    bound: false
  };

  applyTheme(getPreferredTheme(), false);
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initTheme();
    enhanceHeader();
    initSearch();
    if (pageKey === "home") enhanceHome();
    if (pageKey === "tags") renderTagsPage();
    if (pageKey === "categories") renderCategoriesPage();
    if (pageKey === "archives") renderArchivesPage();
    if (pageKey === "about") renderAboutPage();
    if (pageKey === "article") enhanceArticlePage();
    markProgressiveNodes();
    initProgressiveMotion();
  }

  function normalizeArticle(article) {
    const category = article.category || "未分类";
    const date = article.date || "";
    const dateObj = parseDate(date);
    const year = date ? date.slice(0, 4) : "未标注日期";
    return {
      ...article,
      category,
      date,
      dateObj,
      year,
      excerpt: article.excerpt || "暂无摘要。",
      readingTime: article.readingTime || 1,
      tags: Array.isArray(article.tags) ? article.tags : [],
      searchText: [article.title, article.excerpt, category].concat(article.tags || []).join(" ").toLowerCase()
    };
  }

  function parseDate(value) {
    if (!value) return null;
    const parts = value.split(".");
    if (parts.length !== 3) return null;
    const [year, month, day] = parts.map(Number);
    if ([year, month, day].some(Number.isNaN)) return null;
    return new Date(year, month - 1, day);
  }

  function sortByDateDesc(left, right) {
    if (left.dateObj && right.dateObj) return right.dateObj - left.dateObj;
    if (left.dateObj) return -1;
    if (right.dateObj) return 1;
    return left.title.localeCompare(right.title, "zh-CN");
  }

  function detectPage() {
    const pathname = normalizePath(window.location.pathname);
    if (pathname === "/") return "home";
    if (pathname.startsWith("/tags/")) return "tags";
    if (pathname.startsWith("/categories/")) return "categories";
    if (pathname.startsWith("/archives/")) return "archives";
    if (pathname === "/about/") return "about";
    if (pathname.startsWith("/article/")) return "article";
    return "default";
  }

  function getPathSegments(pathname) {
    return normalizePath(pathname).split("/").filter(Boolean);
  }

  function slugifyValue(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff-]+/g, "")
      .replace(/-+/g, "-");
  }

  function resolveFilterValue(rawValue, values) {
    if (!rawValue) return "";
    const decoded = decodeURIComponent(rawValue);
    if (values.includes(decoded)) return decoded;
    const matched = values.find((value) => slugifyValue(value) === slugifyValue(decoded));
    return matched || decoded;
  }

  function getSelectedTag(tagCounts) {
    const queryValue = new URLSearchParams(window.location.search).get("tag") || "";
    const pathValue = getPathSegments(window.location.pathname)[1] || "";
    return resolveFilterValue(queryValue || pathValue, [...tagCounts.keys()]);
  }

  function getSelectedCategory(categoryCounts) {
    const queryValue = new URLSearchParams(window.location.search).get("category") || "";
    const pathValue = getPathSegments(window.location.pathname)[1] || "";
    return resolveFilterValue(queryValue || pathValue, [...categoryCounts.keys()]);
  }

  function getArchiveFilters() {
    const params = new URLSearchParams(window.location.search);
    const segments = getPathSegments(window.location.pathname);
    const year = params.get("year") || (segments[0] === "archives" ? segments[1] || "" : "");
    const month = params.get("month") || (segments[0] === "archives" ? segments[2] || "" : "");
    return {
      year,
      month
    };
  }

  function initTheme() {
    if (!initTheme.boundThemeListener && window.matchMedia) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const syncWithSystem = (event) => {
        if (hasStoredTheme()) return;
        applyTheme(event.matches ? "dark" : "light", false);
      };
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", syncWithSystem);
      } else if (typeof media.addListener === "function") {
        media.addListener(syncWithSystem);
      }
      initTheme.boundThemeListener = true;
    }
    updateThemeButtons(getCurrentTheme());
    syncGiscusTheme(getCurrentTheme());
  }

  function getPreferredTheme() {
    const stored = readStoredTheme();
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function readStoredTheme() {
    const explicit = window.localStorage.getItem("nexus-theme");
    if (explicit === "dark" || explicit === "light") return explicit;
    const legacy = window.localStorage.getItem("theme");
    if (!legacy) return "";
    try {
      const parsed = JSON.parse(legacy);
      if (parsed && (parsed.value === "dark" || parsed.value === "light")) {
        return parsed.value;
      }
    } catch (error) {
      if (legacy === "dark" || legacy === "light") return legacy;
    }
    return "";
  }

  function hasStoredTheme() {
    return Boolean(readStoredTheme());
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function toggleTheme() {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
    showToast(nextTheme === "dark" ? "已切换到深色模式" : "已切换到浅色模式");
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeButtons(theme);
    updateThemeMeta(theme);
    syncGiscusTheme(theme);
    if (!persist) return;
    window.localStorage.setItem("nexus-theme", theme);
    window.localStorage.setItem(
      "theme",
      JSON.stringify({ value: theme, expiry: Date.now() + 86400000 * 365 })
    );
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('[data-theme-toggle="true"]').forEach((button) => {
      const compact = button.classList.contains("header-action");
      const icon = theme === "dark" ? "☀" : "☾";
      const label = theme === "dark" ? "浅色" : "深色";
      if (compact) {
        button.innerHTML = `<span class="header-action-icon">${icon}</span>${label}`;
      } else {
        button.innerHTML = `${theme === "dark" ? "切换到浅色" : "切换到深色"}<span>${icon}</span>`;
      }
      button.setAttribute("aria-label", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
    });
  }

  function updateThemeMeta(theme) {
    const color = theme === "dark" ? "#020617" : "#ffffff";
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }

  function syncGiscusTheme(theme) {
    const giscusScript = document.querySelector('script[src*="giscus.app/client.js"]');
    if (giscusScript) {
      giscusScript.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    }
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: theme === "dark" ? "dark" : "light" } } },
        "https://giscus.app"
      );
    }
  }

  function normalizePath(pathname) {
    let value = pathname || "/";
    value = value.replace(/index\.html$/, "");
    if (!value.startsWith("/")) value = `/${value}`;
    if (!value.endsWith("/")) value += "/";
    return value;
  }

  function enhanceHeader() {
    const header = document.querySelector(".header");
    if (!header) return;

    const nav = header.querySelector(".nav, .nav-links");
    if (nav) {
      nav.className = "nav";
      nav.innerHTML = buildNavLinks(pageKey);
    }

    let tools = header.querySelector(".header-tools");
    if (!tools) {
      tools = document.createElement("div");
      tools.className = "header-tools";
      header.appendChild(tools);
    }

    tools.innerHTML = `
      <button class="header-action header-action--search" type="button" data-search-trigger="header">
        <span class="header-action-icon">⌕</span>搜索
      </button>
      <button class="header-action header-action--theme" type="button" data-theme-toggle="true"></button>
      <a class="header-action header-action--rss" href="/atom.xml">RSS</a>
      <button class="nav-toggle" type="button" aria-label="打开导航">
        <span class="nav-toggle-bar"></span>
      </button>
    `;

    const drawer = buildMobileDrawer();
    if (!document.querySelector(".mobile-nav-drawer")) {
      document.body.appendChild(drawer.backdrop);
      document.body.appendChild(drawer.drawer);
    } else {
      document.querySelector(".mobile-nav-drawer").innerHTML = drawer.drawer.innerHTML;
    }

    const toggle = header.querySelector(".nav-toggle");
    const closeMobile = () => {
      document.body.classList.remove("mobile-nav-open");
    };

    toggle?.addEventListener("click", () => {
      document.body.classList.toggle("mobile-nav-open");
    });

    document.querySelector(".mobile-nav-backdrop")?.addEventListener("click", closeMobile);
    document.querySelectorAll("[data-mobile-close]").forEach((node) => {
      node.addEventListener("click", closeMobile);
    });
    document.querySelectorAll('[data-theme-toggle="true"]').forEach((node) => {
      node.addEventListener("click", toggleTheme);
    });
    updateThemeButtons(getCurrentTheme());

    window.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          closeMobile();
          closeSearch();
        }
      },
      { passive: true }
    );
  }

  function buildMobileDrawer() {
    const backdrop = document.createElement("div");
    backdrop.className = "mobile-nav-backdrop";

    const drawer = document.createElement("aside");
    drawer.className = "mobile-nav-drawer";
    drawer.innerHTML = `
      <div class="mobile-nav-caption">Navigation</div>
      <div class="mobile-nav-links">
        ${buildNavLinks(pageKey, true)}
      </div>
      <div class="mobile-nav-caption">Actions</div>
      <div class="mobile-nav-actions">
        <button type="button" data-search-trigger="mobile" data-mobile-close="true">打开搜索<span>⌕</span></button>
        <button type="button" data-theme-toggle="true" data-mobile-close="true"></button>
        <a href="/atom.xml" data-mobile-close="true">RSS 订阅<span>↗</span></a>
      </div>
    `;
    return { backdrop, drawer };
  }

  function buildNavLinks(currentPage, mobile) {
    const activePage = currentPage === "article" ? "archives" : currentPage;
    const items = [
      { key: "home", href: "/", label: "首页" },
      { key: "archives", href: "/archives/", label: "归档" },
      { key: "categories", href: "/categories/", label: "分类" },
      { key: "tags", href: "/tags/", label: "标签" },
      { key: "about", href: "/about/", label: "关于" }
    ];

    return items
      .map((item) => {
        const active = item.key === activePage ? "active" : "";
        const mobileActive = item.key === activePage ? "is-active" : "";
        const classes = mobile ? mobileActive : active;
        const closeAttr = mobile ? ' data-mobile-close="true"' : "";
        return `<a href="${item.href}" class="${classes}"${closeAttr}>${item.label}</a>`;
      })
      .join("");
  }

  function initSearch() {
    if (!displayArticles.length) return;

    const modal = document.createElement("div");
    modal.className = "search-modal";
    modal.innerHTML = `
      <div class="search-modal__backdrop" data-search-close="true"></div>
      <div class="search-modal__panel" role="dialog" aria-modal="true" aria-label="站内搜索">
        <div class="search-modal__header">
          <span class="search-modal__title">NEXUS Search</span>
          <button class="header-action search-modal__close" type="button" data-search-close="true">关闭</button>
        </div>
        <div class="search-modal__body">
          <aside class="search-sidebar">
            <section class="search-sidebar__section">
              <span class="search-sidebar__label">分类筛选</span>
              <div class="chip-group" data-filter-group="category"></div>
            </section>
            <section class="search-sidebar__section">
              <span class="search-sidebar__label">年份筛选</span>
              <div class="chip-group" data-filter-group="year"></div>
            </section>
            <section class="search-sidebar__section">
              <span class="search-sidebar__label">热门标签</span>
              <div class="chip-group" data-filter-group="tag"></div>
            </section>
          </aside>
          <section class="search-main">
            <div class="search-input-wrap">
              <input class="search-input" type="search" placeholder="搜索标题、摘要、分类或标签" />
            </div>
            <div class="search-results__summary"></div>
            <div class="search-results"></div>
          </section>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    bindSearchEvents(modal);
    renderSearchFilters(modal);
    renderSearchResults(modal);
  }

  function bindSearchEvents(modal) {
    document.querySelectorAll("[data-search-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", () => openSearch(modal));
    });

    modal.querySelectorAll("[data-search-close]").forEach((trigger) => {
      trigger.addEventListener("click", closeSearch);
    });

    modal.querySelector(".search-input")?.addEventListener("input", (event) => {
      state.searchQuery = event.target.value.trim();
      renderSearchResults(modal);
    });

    bindSearchWheelScroll(modal.querySelector(".search-main"));
    bindSearchWheelScroll(modal.querySelector(".search-sidebar"));
  }

  function bindSearchWheelScroll(container) {
    if (!container) return;
    container.addEventListener(
      "wheel",
      (event) => {
        if (!state.searchOpen) return;
        const canScroll = container.scrollHeight > container.clientHeight + 1;
        if (!canScroll) return;
        container.scrollTop += event.deltaY;
        event.preventDefault();
      },
      { passive: false }
    );
  }

  function openSearch(modal) {
    if (state.searchOpen) return;
    state.searchOpen = true;
    lockPageScroll();
    modal.classList.add("is-open");
    document.body.classList.add("search-open");
    document.documentElement.classList.add("search-open");
    document.body.classList.remove("mobile-nav-open");
    const input = modal.querySelector(".search-input");
    window.setTimeout(() => input?.focus(), 30);
  }

  function closeSearch() {
    if (!state.searchOpen) return;
    state.searchOpen = false;
    document.querySelector(".search-modal")?.classList.remove("is-open");
    document.body.classList.remove("search-open");
    document.documentElement.classList.remove("search-open");
    unlockPageScroll();
  }

  function lockPageScroll() {
    state.searchScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${state.searchScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockPageScroll() {
    const restoreY = state.searchScrollY || 0;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, restoreY);
  }

  function renderSearchFilters(modal) {
    const categoryCounts = countBy(displayArticles, (article) => article.category);
    const yearCounts = countBy(displayArticles, (article) => article.year);
    const tagCounts = countBy(displayArticles.flatMap((article) => article.tags));

    renderFilterGroup(
      modal.querySelector('[data-filter-group="category"]'),
      [{ label: "全部", value: "all", count: displayArticles.length }].concat(
        [...categoryCounts.entries()].sort(([left], [right]) => left.localeCompare(right, "zh-CN")).map(([value, count]) => ({
          label: value,
          value,
          count
        }))
      ),
      "category",
      state.searchCategory
    );

    renderFilterGroup(
      modal.querySelector('[data-filter-group="year"]'),
      [{ label: "全部", value: "all", count: displayArticles.length }].concat(
        [...yearCounts.entries()].sort(([left], [right]) => right.localeCompare(left, "zh-CN")).map(([value, count]) => ({
          label: value,
          value,
          count
        }))
      ),
      "year",
      state.searchYear
    );

    renderFilterGroup(
      modal.querySelector('[data-filter-group="tag"]'),
      [...tagCounts.entries()]
        .sort((left, right) => {
          if (right[1] !== left[1]) return right[1] - left[1];
          return left[0].localeCompare(right[0], "zh-CN");
        })
        .slice(0, 10)
        .map(([value, count]) => ({ label: value, value, count })),
      "tag",
      state.searchTag
    );
  }

  function renderFilterGroup(container, items, type, activeValue) {
    if (!container) return;
    container.innerHTML = items
      .map((item) => {
        const active = item.value === activeValue ? "is-active" : "";
        return `
          <button class="filter-chip ${active}" type="button" data-filter-type="${type}" data-filter-value="${escapeHtml(item.value)}">
            <span>${escapeHtml(item.label)}</span>
            <span class="filter-chip__count">${item.count}</span>
          </button>
        `;
      })
      .join("");

    container.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const value = chip.getAttribute("data-filter-value") || "";
        if (type === "category") state.searchCategory = value;
        if (type === "year") state.searchYear = value;
        if (type === "tag") state.searchTag = state.searchTag === value ? "" : value;
        renderSearchFilters(document.querySelector(".search-modal"));
        renderSearchResults(document.querySelector(".search-modal"));
      });
    });
  }

  function renderSearchResults(modal) {
    if (!modal) return;
    const results = getFilteredArticles(displayArticles, {
      query: state.searchQuery,
      category: state.searchCategory,
      year: state.searchYear,
      tag: state.searchTag
    });
    const summary = modal.querySelector(".search-results__summary");
    const resultsContainer = modal.querySelector(".search-results");

    if (!state.searchQuery && state.searchCategory === "all" && state.searchYear === "all" && !state.searchTag) {
      summary.textContent = "输入关键词后将自动给出文章建议，也可以直接点热门标签。";
      resultsContainer.innerHTML = `
        <div class="panel-section--compact">
          <div class="panel-section__label">最新更新</div>
          <div class="search-results-grid">
            ${featuredArticles.slice(0, 4).map((article) => buildSearchCard(article, "")).join("")}
          </div>
        </div>
      `;
      return;
    }

    summary.textContent = `共找到 ${results.length} 篇相关文章`;
    resultsContainer.innerHTML = results.length
      ? `<div class="search-results-grid">${results.map((article) => buildSearchCard(article, state.searchQuery)).join("")}</div>`
      : `<div class="search-empty">没有匹配结果。可以试试文章标题、标签名，或者先清空筛选条件再搜索。</div>`;
  }

  function getFilteredArticles(articles, filters) {
    return articles
      .filter((article) => {
        if (filters.category !== "all" && article.category !== filters.category) return false;
        if (filters.year !== "all" && article.year !== filters.year) return false;
        if (filters.tag && !article.tags.includes(filters.tag)) return false;
        if (!filters.query) return true;
        return article.searchText.includes(filters.query.toLowerCase());
      })
      .sort(sortByDateDesc);
  }

  function buildSearchCard(article, query) {
    return `
      <a class="search-card" href="${article.url}">
        <div class="card-meta">
          <span>${escapeHtml(article.date || "未标注日期")}</span>
          <strong>${escapeHtml(article.category)}</strong>
          <span>${article.readingTime} 分钟阅读</span>
        </div>
        <h3 class="card-title">${highlightText(escapeHtml(article.title), query)}</h3>
        <p class="card-excerpt">${highlightText(escapeHtml(article.excerpt), query)}</p>
        <div class="card-tags">${article.tags.slice(0, 4).map((tag) => `<span class="mini-chip">${highlightText(escapeHtml(tag), query)}</span>`).join("")}</div>
      </a>
    `;
  }

  function enhanceHome() {
    const isAppleHome = document.body.classList.contains("home-page");
    mountHomeSearchTrigger(isAppleHome);
    syncHomeStats();

    if (isAppleHome) {
      renderHomeShowcaseSections();
      return;
    }

    replaceLatestSection();
    injectFeaturedSection();
  }

  function mountHomeSearchTrigger(isAppleHome) {
    const target = isAppleHome
      ? document.querySelector(".home-hero-actions")
      : document.querySelector(".hero");
    if (!target || target.querySelector(".hero-search-trigger")) return;

    const trigger = document.createElement("button");
    trigger.className = isAppleHome ? "btn btn-secondary hero-search-trigger" : "header-action hero-search-trigger";
    trigger.type = "button";
    trigger.setAttribute("data-search-trigger", "hero");
    trigger.setAttribute("aria-label", "搜索站内内容");
    trigger.innerHTML = isAppleHome
      ? "搜索内容"
      : `<span class="header-action-icon">⌕</span>搜索文章 / 标签 / 分类`;
    target.appendChild(trigger);
    trigger.addEventListener("click", () => openSearch(document.querySelector(".search-modal")));
  }

  function syncHomeStats() {
    const values = [
      { value: displayArticles.length, label: "文章" },
      { value: countBy(displayArticles.flatMap((article) => article.tags)).size, label: "主题" },
      { value: countBy(displayArticles, (article) => article.category).size, label: "分类" }
    ];

    const homeStats = document.querySelectorAll(".home-stat");
    homeStats.forEach((item, index) => {
      const valueNode = item.querySelector(".home-stat__value");
      const labelNode = item.querySelector(".home-stat__label");
      if (!values[index] || !valueNode || !labelNode) return;
      valueNode.textContent = String(values[index].value);
      labelNode.textContent = values[index].label;
    });

    const statItems = document.querySelectorAll(".stats .stat-item");
    statItems.forEach((item, index) => {
      const number = item.querySelector(".stat-number");
      const label = item.querySelector(".stat-label");
      if (!values[index] || !number || !label) return;
      number.setAttribute("data-target", String(values[index].value));
      number.textContent = "0";
      label.textContent = values[index].label;
    });
  }

  function renderHomeShowcaseSections() {
    const latestArticles = [...displayArticles].sort(sortByDateDesc).slice(0, 2);
    const recommendedArticles = featuredArticles
      .filter((article) => !latestArticles.some((item) => item.url === article.url))
      .map((article) => ({
        ...article,
        score: article.tags.length * 2 + (article.category === "AI" ? 1 : 0)
      }))
      .sort((left, right) => right.score - left.score || sortByDateDesc(left, right))
      .slice(0, 2);

    renderHomeShowcaseSlot("latest", latestArticles);
    renderHomeShowcaseSlot("recommended", recommendedArticles.length ? recommendedArticles : latestArticles);
  }

  function renderHomeShowcaseSlot(slot, articles) {
    const container = document.querySelector(`[data-home-slot="${slot}"]`);
    if (!container) return;
    container.innerHTML = articles.map(buildHomeShowcaseCard).join("");
  }

  function buildHomeShowcaseCard(article) {
    const labels = article.tags.length ? article.tags.slice(0, 3) : [article.category];
    return `
      <a class="home-showcase home-reveal" href="${article.url}">
        <div class="home-showcase__inner">
          <div class="home-showcase__media">
            <img src="${article.cover}" alt="${escapeHtml(article.title)}" loading="lazy" />
          </div>
          <div class="home-showcase__content">
            <div class="home-showcase__meta">
              <span>${escapeHtml(article.date || "未标注日期")}</span>
              <span>${escapeHtml(article.category)}</span>
              <span>${article.readingTime} 分钟阅读</span>
            </div>
            <h3 class="home-showcase__title">${escapeHtml(article.title)}</h3>
            <p class="home-showcase__excerpt">${escapeHtml(article.excerpt)}</p>
            <div class="home-showcase__tags">
              ${labels.map((label) => `<span class="home-showcase__tag">${escapeHtml(label)}</span>`).join("")}
            </div>
            <span class="home-showcase__link">查看文章</span>
          </div>
        </div>
      </a>
    `;
  }

  function markProgressiveNodes(root) {
    const scope = root || document;
    const selectors = [
      ".panel-header",
      ".stat-card",
      ".archive-stat-card",
      ".category-card",
      ".content-card",
      ".feature-card",
      ".related-card",
      ".timeline-card",
      ".link-card",
      ".resource-card",
      ".story-card",
      ".toc-card",
      ".action-card",
      ".article-hero__meta",
      ".article-tags"
    ];

    scope.querySelectorAll(selectors.join(",")).forEach((node, index) => {
      node.classList.add("progressive-stage");
      node.style.setProperty("--progressive-order", String(index % 6));
    });
  }

  function initProgressiveMotion() {
    motionState.nodes = [...document.querySelectorAll(".home-reveal, .progressive-stage")];
    if (!motionState.nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      motionState.nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    motionState.nodes.forEach((node) => {
      if (node.classList.contains("is-visible")) return;
      observer.observe(node);
    });
  }

  function replaceLatestSection() {
    const latestSection = [...document.querySelectorAll("body > section.section")].find((section) =>
      section.querySelector(".news-grid")
    );
    if (!latestSection) return;

    const items = featuredArticles.slice(0, 4);
    latestSection.innerHTML = `
      <div class="panel-header">
        <div>
          <div class="section-label">Latest Articles</div>
          <h2 class="section-title">最新更新</h2>
        </div>
        <p>文章卡片补上摘要和标签，方便用户在首页快速完成第一轮筛选。</p>
      </div>
      <div class="content-card-grid">
        ${items.map(buildContentCard).join("")}
      </div>
    `;
  }

  function injectFeaturedSection() {
    if (document.querySelector("[data-home-featured]")) return;
    const ctaSection = document.querySelector(".cta-section");
    if (!ctaSection) return;
    const ranked = featuredArticles
      .map((article) => ({
        ...article,
        score: article.tags.length * 2 + (article.category === "AI" ? 1 : 0)
      }))
      .sort((left, right) => right.score - left.score || sortByDateDesc(left, right))
      .slice(0, 3);

    const section = document.createElement("section");
    section.className = "panel-section";
    section.setAttribute("data-home-featured", "true");
    section.innerHTML = `
      <div class="panel-header">
        <div>
          <div class="section-label">Featured Reads</div>
          <h2 class="section-title">推荐阅读</h2>
        </div>
        <p>没有接入真实阅读统计前，这里使用编辑精选而不是伪造“阅读量”。</p>
      </div>
      <div class="feature-grid">
        ${ranked.map(buildFeatureCard).join("")}
      </div>
    `;
    ctaSection.parentNode.insertBefore(section, ctaSection);
  }

  function renderTagsPage() {
    const tagCounts = countBy(displayArticles.flatMap((article) => article.tags));
    const selectedTag = getSelectedTag(tagCounts);
    const matchedArticles = selectedTag
      ? displayArticles.filter((article) => article.tags.includes(selectedTag)).sort(sortByDateDesc)
      : featuredArticles;

    rewriteHero({
      label: "Tag Explorer",
      title: "标签",
      highlight: "导航",
      subtitle: "修复标签页后，用户可以按主题聚合浏览文章，并直接看到每个标签下的文章数量。"
    });

    replaceTopLevelSections(`
      <section class="panel-section">
        <div class="panel-header">
          <div>
            <div class="section-label">Tag System</div>
            <h2 class="section-title">标签云与文章分布</h2>
          </div>
          <p>点击标签即可在当前页直接筛选，支持从文章页回跳到标签聚合页。</p>
        </div>
        <div class="stat-strip">
          <a class="stat-card stat-card--link" href="/tags/">
            <span class="stat-card__value">${tagCounts.size}</span>
            <span class="stat-card__label">标签总数</span>
            <span class="stat-card__hint">当前站点已覆盖 ${tagCounts.size} 个技术主题。</span>
            <span class="stat-card__cta">浏览标签</span>
          </a>
          <a class="stat-card stat-card--link" href="/archives/">
            <span class="stat-card__value">${featuredArticles.length}</span>
            <span class="stat-card__label">可浏览文章</span>
            <span class="stat-card__hint">默认展示已整理过摘要和标签的主要文章。</span>
            <span class="stat-card__cta">查看文章</span>
          </a>
          <a class="stat-card stat-card--link" href="${selectedTag ? `/tags/?tag=${encodeURIComponent(selectedTag)}` : "/tags/"}">
            <span class="stat-card__value">${selectedTag ? tagCounts.get(selectedTag) || 0 : "All"}</span>
            <span class="stat-card__label">${selectedTag ? `${selectedTag} 相关文章` : "当前筛选"}</span>
            <span class="stat-card__hint">${selectedTag ? "筛选已同步到链接参数，可直接分享。": "点击任意标签即可切换聚合视图。"}</span>
            <span class="stat-card__cta">${selectedTag ? "查看当前标签" : "进入标签导航"}</span>
          </a>
        </div>
      </section>
      <section class="panel-section panel-section--compact">
        <span class="panel-section__label">全部标签</span>
        <div class="chip-group">
          <a class="tag-chip ${selectedTag ? "" : "is-active"}" href="/tags/">
            <span>全部</span>
            <span class="tag-chip__count">${featuredArticles.length}</span>
          </a>
          ${[...tagCounts.entries()]
            .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "zh-CN"))
            .map(
              ([tag, count]) => `
                <a class="tag-chip ${tag === selectedTag ? "is-active" : ""}" href="/tags/?tag=${encodeURIComponent(tag)}">
                  <span>${escapeHtml(tag)}</span>
                  <span class="tag-chip__count">${count}</span>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="panel-section panel-section--compact">
        <div class="panel-header">
          <div>
            <div class="section-label">Articles</div>
            <h2 class="section-title">${selectedTag ? `${escapeHtml(selectedTag)} 相关文章` : "推荐文章"}</h2>
          </div>
          <p>${selectedTag ? "标签筛选结果按日期倒序排列。": "未选择标签时，默认展示站点中的重点文章。"}</p>
        </div>
        ${buildArticleGrid(matchedArticles, selectedTag ? "该标签下暂无文章。" : "当前还没有可展示的文章。")}
      </section>
    `);
  }

  function renderCategoriesPage() {
    const categoryCounts = countBy(displayArticles, (article) => article.category);
    const selectedCategory = getSelectedCategory(categoryCounts);
    const matchedArticles = selectedCategory
      ? displayArticles.filter((article) => article.category === selectedCategory).sort(sortByDateDesc)
      : [...displayArticles].sort(sortByDateDesc);

    rewriteHero({
      label: "Category Browser",
      title: "分类",
      highlight: "浏览",
      subtitle: "分类页改为真实目录入口，支持查看每个专题下的文章数量与文章列表。"
    });

    replaceTopLevelSections(`
      <section class="panel-section">
        <div class="panel-header">
          <div>
            <div class="section-label">Category System</div>
            <h2 class="section-title">按专题浏览内容</h2>
          </div>
          <p>目前站点主内容集中在 AI 方向，同时保留未分类页面作为历史内容兜底。</p>
        </div>
        <div class="category-grid">
          <a class="category-card ${selectedCategory ? "" : "is-active"}" href="/categories/">
            <span class="category-card__name">全部分类</span>
            <span class="category-card__count">${displayArticles.length} 篇文章</span>
            <span class="category-card__desc">查看站点中的所有文章，不限制内容专题。</span>
          </a>
          ${[...categoryCounts.entries()]
            .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "zh-CN"))
            .map(([category, count]) => {
              const descriptions = {
                AI: "AI Agent、大模型、多智能体系统、语音识别与深度调研。",
                "站点存档": "旧版站点、设计草稿与历史页面迁移记录。",
                未分类: "Hexo 默认示例与待归档内容。"
              };
              return `
                <a class="category-card ${category === selectedCategory ? "is-active" : ""}" href="/categories/?category=${encodeURIComponent(category)}">
                  <span class="category-card__name">${escapeHtml(category)}</span>
                  <span class="category-card__count">${count} 篇文章</span>
                  <span class="category-card__desc">${descriptions[category] || "浏览该分类下的全部文章。"}</span>
                </a>
              `;
            })
            .join("")}
        </div>
      </section>
      <section class="panel-section panel-section--compact">
        <div class="panel-header">
          <div>
            <div class="section-label">Category Feed</div>
            <h2 class="section-title">${selectedCategory ? `${escapeHtml(selectedCategory)} 分类文章` : "全部文章"}</h2>
          </div>
          <p>${selectedCategory ? "分类筛选会保留到 URL，方便后续直接分享或收藏。": "按时间倒序查看全站内容。"}</p>
        </div>
        ${buildArticleGrid(matchedArticles, "当前分类下暂无文章。")}
      </section>
    `);
  }

  function renderAboutPage() {
    const tagCount = countBy(displayArticles.flatMap((article) => article.tags)).size;
    const categoryCount = countBy(displayArticles, (article) => article.category).size;
    rewriteHero({
      label: "About NEXUS",
      title: "关于",
      highlight: "NEXUS",
      subtitle: "这是一个持续迭代的技术博客实验站，重点记录 AI、Agent、多智能体与工程化实践。"
    });

    replaceTopLevelSections(`
      <section class="panel-section">
        <div class="panel-header">
          <div>
            <div class="section-label">Profile</div>
            <h2 class="section-title">站点简介</h2>
          </div>
          <p>按照报告建议，关于页现在承担“个人介绍 + 联系方式 + 站点导航”的作用，不再只是几段静态文案。</p>
        </div>
        <div class="about-profile">
          <div class="profile-card">
            <img class="profile-avatar" src="/img/avatar.png" alt="NEXUS avatar" />
            <h3 class="card-title">NEXUS</h3>
            <p class="card-excerpt">聚焦 AI 前沿、工程实践与产品化思路，强调可运行代码、结构化分析和持续迭代。</p>
            <div class="chip-group">
              <span class="mini-chip">AI Agent</span>
              <span class="mini-chip">多智能体</span>
              <span class="mini-chip">工程实践</span>
            </div>
          </div>
          <div class="about-stack">
            <div class="stat-strip">
              <a class="stat-card stat-card--link" href="/archives/">
                <span class="stat-card__value">${featuredArticles.length}</span>
                <span class="stat-card__label">重点文章</span>
                <span class="stat-card__hint">已经整理摘要、标签与相关推荐的文章数量。</span>
                <span class="stat-card__cta">查看归档</span>
              </a>
              <a class="stat-card stat-card--link" href="/tags/">
                <span class="stat-card__value">${tagCount}</span>
                <span class="stat-card__label">标签主题</span>
                <span class="stat-card__hint">标签页与搜索会基于这些主题聚合内容。</span>
                <span class="stat-card__cta">浏览标签</span>
              </a>
              <a class="stat-card stat-card--link" href="/categories/">
                <span class="stat-card__value">${categoryCount}</span>
                <span class="stat-card__label">分类目录</span>
                <span class="stat-card__hint">包括主内容分类与历史存档分类。</span>
                <span class="stat-card__cta">查看分类</span>
              </a>
            </div>
            <div class="feature-grid">
              <div class="feature-card">
                <h3 class="card-title">内容方向</h3>
                <p class="card-excerpt">AI Agent、大模型、多智能体、语音识别、深度调研、开发效率与工程化实践。</p>
              </div>
              <div class="feature-card">
                <h3 class="card-title">写作方式</h3>
                <p class="card-excerpt">优先发布可复现、有上下文、有代码片段的内容，而不是只做新闻式摘录。</p>
              </div>
              <div class="feature-card">
                <h3 class="card-title">迭代目标</h3>
                <p class="card-excerpt">继续补强搜索、推荐、暗色模式与信息架构，让内容检索和阅读链路更顺滑。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="panel-section panel-section--compact">
        <div class="panel-header">
          <div>
            <div class="section-label">Contact</div>
            <h2 class="section-title">联系方式与站点入口</h2>
          </div>
          <p>暂不公开私人联系方式时，至少保留 GitHub、RSS、评论和站内入口，保证用户有反馈通道。</p>
        </div>
        <div class="link-list">
          <a class="link-card" href="https://github.com/lsn-org" target="_blank" rel="noopener">
            <span class="link-card__title">GitHub</span>
            <span class="link-card__desc">查看项目与更新记录</span>
          </a>
          <a class="link-card" href="/atom.xml">
            <span class="link-card__title">RSS 订阅</span>
            <span class="link-card__desc">跟踪最新文章与归档</span>
          </a>
          <a class="link-card" href="/archives/">
            <span class="link-card__title">归档页</span>
            <span class="link-card__desc">按时间轴查看更新节奏</span>
          </a>
          <a class="link-card" href="/tags/">
            <span class="link-card__title">标签页</span>
            <span class="link-card__desc">按主题聚合浏览文章</span>
          </a>
          <a class="link-card" href="/categories/">
            <span class="link-card__title">分类页</span>
            <span class="link-card__desc">按专题快速进入内容目录</span>
          </a>
          <a class="link-card" href="/link/">
            <span class="link-card__title">友情链接</span>
            <span class="link-card__desc">后续可继续整理独立推荐列表</span>
          </a>
        </div>
      </section>
    `);
  }

  function renderArchivesPage() {
    const { year: selectedYear, month: selectedMonth } = getArchiveFilters();
    const yearCounts = countBy(displayArticles, (article) => article.year);
    const grouped = groupBy(
      displayArticles
        .filter((article) => {
          if (selectedYear && article.year !== selectedYear) return false;
          if (selectedMonth && article.date.slice(5, 7) !== selectedMonth) return false;
          return true;
        })
        .sort(sortByDateDesc),
      (article) => article.year
    );

    rewriteHero({
      label: "Archive Timeline",
      title: "文章",
      highlight: "归档",
      subtitle: selectedMonth
        ? `当前正在查看 ${selectedYear || "全部年份"} 年 ${selectedMonth} 月的文章时间线。`
        : "归档页改成时间轴后，更适合快速浏览更新节奏，也为后续增加按年份筛选预留了结构。"
    });

    replaceTopLevelSections(`
      <section class="panel-section">
        <div class="panel-header">
          <div>
            <div class="section-label">Archive Overview</div>
            <h2 class="section-title">时间轴浏览</h2>
          </div>
          <p>${selectedMonth ? `当前已按 ${selectedYear} 年 ${selectedMonth} 月过滤结果。` : "按年份聚合文章，并保留未标注日期的历史内容，避免页面出现空白。"}</p>
        </div>
        <div class="archive-stat-grid">
          <a class="archive-stat-card archive-stat-card--link" href="/archives/">
            <span class="archive-stat-card__value">${displayArticles.length}</span>
            <span class="archive-stat-card__label">文章总数</span>
            <span class="archive-stat-card__hint">已收录的所有文章都会出现在时间轴中。</span>
            <span class="archive-stat-card__cta">查看全部</span>
          </a>
          <a class="archive-stat-card archive-stat-card--link" href="${selectedYear ? `/archives/?year=${encodeURIComponent(selectedYear)}` : "/archives/"}">
            <span class="archive-stat-card__value">${yearCounts.size}</span>
            <span class="archive-stat-card__label">年份分组</span>
            <span class="archive-stat-card__hint">${selectedMonth ? "当前视图同时包含月份过滤。" : "当前可按年份切换归档视图。"}</span>
            <span class="archive-stat-card__cta">${selectedYear ? "查看当前年份" : "切换年份"}</span>
          </a>
          <a class="archive-stat-card archive-stat-card--link" href="/#recommended">
            <span class="archive-stat-card__value">${featuredArticles.length}</span>
            <span class="archive-stat-card__label">重点内容</span>
            <span class="archive-stat-card__hint">已补充摘要和标签的文章会在首页与搜索中优先曝光。</span>
            <span class="archive-stat-card__cta">回到首页精选</span>
          </a>
        </div>
      </section>
      <section class="panel-section panel-section--compact">
        <span class="panel-section__label">年份筛选</span>
        <div class="chip-group">
          <a class="tag-chip ${selectedYear ? "" : "is-active"}" href="/archives/">
            <span>全部</span>
            <span class="tag-chip__count">${displayArticles.length}</span>
          </a>
          ${[...yearCounts.entries()]
            .sort(([left], [right]) => right.localeCompare(left, "zh-CN"))
            .map(
              ([year, count]) => `
                <a class="tag-chip ${year === selectedYear ? "is-active" : ""}" href="/archives/?year=${encodeURIComponent(year)}">
                  <span>${escapeHtml(year)}</span>
                  <span class="tag-chip__count">${count}</span>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="panel-section panel-section--compact">
        <div class="timeline-wrap">
          ${
            [...grouped.entries()]
              .sort(([left], [right]) => right.localeCompare(left, "zh-CN"))
              .map(
                ([year, articles]) => `
                  <div class="timeline-year">
                    <div class="timeline-year__label">${escapeHtml(year)} <span>${articles.length} 篇</span></div>
                    <div class="timeline-list">
                      ${articles
                        .map(
                          (article) => `
                            <a class="timeline-card" href="${article.url}">
                              <div class="card-meta">
                                <span>${escapeHtml(article.date || "未标注日期")}</span>
                                <strong>${escapeHtml(article.category)}</strong>
                              </div>
                              <h3 class="card-title">${escapeHtml(article.title)}</h3>
                              <p class="card-excerpt">${escapeHtml(article.excerpt)}</p>
                            </a>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                `
              )
              .join("") || `<div class="panel-empty">当前年份下暂无文章。</div>`
          }
        </div>
      </section>
    `);
  }

  function enhanceArticlePage() {
    const pathname = normalizePath(window.location.pathname);
    const article = displayArticles.find((item) => normalizePath(item.url) === pathname);
    const content = document.querySelector(".article-content");
    const wrapper = document.querySelector(".article-content-wrapper");
    const heroContent = document.querySelector(".hero-content");

    if (!article || !content || !wrapper) return;

    syncArticleMeta(article, heroContent);
    buildArticleLayout(article, wrapper, content);
    insertRelatedArticles(article);
  }

  function syncArticleMeta(article, heroContent) {
    const tagsContainer = document.querySelector(".article-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = article.tags.length
        ? article.tags
            .map((tag) => `<a class="article-tag" href="/tags/?tag=${encodeURIComponent(tag)}">${escapeHtml(tag)}</a>`)
            .join("")
        : `<a class="article-tag" href="/categories/?category=${encodeURIComponent(article.category)}">${escapeHtml(article.category)}</a>`;
    }

    if (heroContent && !heroContent.querySelector(".article-summary")) {
      const summary = document.createElement("p");
      summary.className = "article-summary";
      summary.textContent = article.excerpt;
      heroContent.appendChild(summary);
    }
  }

  function buildArticleLayout(article, wrapper, content) {
    if (wrapper.querySelector(".article-layout")) return;

    const headings = [...content.querySelectorAll("h2, h3")].filter((heading) => heading.id);
    const layout = document.createElement("div");
    layout.className = "article-layout";

    const toc = document.createElement("aside");
    toc.className = "article-toc";
    toc.innerHTML = headings.length
      ? `
        <div class="toc-card">
          <div class="toc-card__title">文章目录</div>
          <div class="toc-list">
            ${headings
              .map(
                (heading) => `
                  <a class="toc-link" data-level="${heading.tagName === "H3" ? "3" : "2"}" href="#${encodeURIComponent(heading.id)}">
                    ${escapeHtml(heading.textContent.trim())}
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
      `
      : `
        <div class="toc-card">
          <div class="toc-card__title">文章目录</div>
          <div class="panel-empty">当前文章标题层级较少，暂不生成目录。</div>
        </div>
      `;

    const main = document.createElement("div");
    main.className = "article-main";

    const actions = document.createElement("div");
    actions.className = "article-actions";
    actions.innerHTML = `
      <button class="action-button" type="button" data-copy-link="true">复制链接</button>
      <a class="action-button" href="/tags/?tag=${encodeURIComponent(article.tags[0] || article.category)}">查看主题</a>
      <a class="action-button" href="/archives/">返回归档</a>
    `;

    wrapper.innerHTML = "";
    main.appendChild(actions);
    main.appendChild(content);
    layout.appendChild(toc);
    layout.appendChild(main);
    wrapper.appendChild(layout);

    actions.querySelector('[data-copy-link="true"]')?.addEventListener("click", async () => {
      const link = window.location.href;
      const copied = await copyText(link);
      showToast(copied ? "链接已复制" : "复制失败，请手动复制地址栏链接");
    });

    toc.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const target = document.getElementById(decodeURIComponent(link.getAttribute("href").slice(1)));
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    bindTocScroll(headings, toc.querySelectorAll(".toc-link"));
  }

  function insertRelatedArticles(currentArticle) {
    if (document.querySelector(".related-section")) return;
    const anchor = document.getElementById("giscus-thread") || document.querySelector(".footer");
    if (!anchor) return;

    const related = displayArticles
      .filter((article) => article.url !== currentArticle.url)
      .map((article) => {
        const sharedTags = article.tags.filter((tag) => currentArticle.tags.includes(tag));
        return {
          ...article,
          score: sharedTags.length * 3 + (article.category === currentArticle.category ? 1 : 0)
        };
      })
      .filter((article) => article.score > 0)
      .sort((left, right) => right.score - left.score || sortByDateDesc(left, right))
      .slice(0, 3);

    if (!related.length) return;

    const section = document.createElement("section");
    section.className = "related-section";
    section.innerHTML = `
      <div class="panel-header">
        <div>
          <div class="section-label">Related Reads</div>
          <h2 class="section-title">相关文章</h2>
        </div>
        <p>基于当前文章的标签和分类做相似内容推荐，补齐报告里提到的文章内导航链路。</p>
      </div>
      <div class="related-grid">
        ${related.map(buildFeatureCard).join("")}
      </div>
    `;
    anchor.parentNode.insertBefore(section, anchor);
  }

  function bindTocScroll(headings, tocLinks) {
    if (!headings.length || !tocLinks.length) return;
    const sync = () => {
      let current = headings[0];
      const offset = window.scrollY + 120;
      headings.forEach((heading) => {
        if (heading.offsetTop <= offset) current = heading;
      });
      tocLinks.forEach((link) => {
        const active = decodeURIComponent(link.getAttribute("href").slice(1)) === current.id;
        link.classList.toggle("is-active", active);
      });
    };
    sync();
    window.addEventListener("scroll", throttle(sync, 100), { passive: true });
  }

  function rewriteHero(config) {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const label = hero.querySelector(".section-label");
    const title = hero.querySelector(".hero-title");
    const subtitle = hero.querySelector(".hero-subtitle");
    if (label) label.textContent = config.label;
    if (title) title.innerHTML = `${escapeHtml(config.title)}<span>${escapeHtml(config.highlight)}</span>`;
    if (subtitle) subtitle.textContent = config.subtitle;
    hero.querySelector(".hero-btns")?.remove();
    hero.querySelector(".stats")?.remove();
  }

  function replaceTopLevelSections(markup) {
    document.querySelectorAll("body > section.section, body > section.cta-section").forEach((section) => section.remove());
    const footer = document.querySelector(".footer");
    if (!footer) return;
    const container = document.createElement("div");
    container.innerHTML = markup;
    [...container.children].forEach((node) => footer.parentNode.insertBefore(node, footer));
  }

  function buildContentCard(article) {
    return `
      <a class="content-card" href="${article.url}">
        <img class="content-card__cover" src="${article.cover}" alt="${escapeHtml(article.title)}" />
        <div class="card-meta">
          <span>${escapeHtml(article.date)}</span>
          <strong>${escapeHtml(article.category)}</strong>
          <span>${article.readingTime} 分钟阅读</span>
        </div>
        <h3 class="card-title">${escapeHtml(article.title)}</h3>
        <p class="card-excerpt">${escapeHtml(article.excerpt)}</p>
        <div class="card-tags">${article.tags.slice(0, 4).map((tag) => `<span class="mini-chip">${escapeHtml(tag)}</span>`).join("")}</div>
      </a>
    `;
  }

  function buildFeatureCard(article) {
    return `
      <a class="feature-card" href="${article.url}">
        <img class="feature-card__cover" src="${article.cover}" alt="${escapeHtml(article.title)}" />
        <div class="card-meta">
          <span>${escapeHtml(article.date || "未标注日期")}</span>
          <strong>${escapeHtml(article.category)}</strong>
        </div>
        <h3 class="card-title">${escapeHtml(article.title)}</h3>
        <p class="card-excerpt">${escapeHtml(article.excerpt)}</p>
      </a>
    `;
  }

  function buildArticleGrid(articles, emptyText) {
    if (!articles.length) return `<div class="panel-empty">${escapeHtml(emptyText)}</div>`;
    return `<div class="article-list-grid">${articles.map(buildContentCard).join("")}</div>`;
  }

  function highlightText(text, query) {
    if (!query) return text;
    const escapedQuery = escapeRegExp(query);
    if (!escapedQuery) return text;
    return text.replace(new RegExp(`(${escapedQuery})`, "ig"), '<span class="search-hit">$1</span>');
  }

  function countBy(items, selector) {
    const map = new Map();
    if (typeof selector === "function") {
      items.forEach((item) => {
        const key = selector(item);
        map.set(key, (map.get(key) || 0) + 1);
      });
      return map;
    }
    items.forEach((item) => {
      map.set(item, (map.get(item) || 0) + 1);
    });
    return map;
  }

  function groupBy(items, selector) {
    const map = new Map();
    items.forEach((item) => {
      const key = selector(item);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    return map;
  }

  function throttle(fn, wait) {
    let last = 0;
    return function throttled() {
      const now = Date.now();
      if (now - last < wait) return;
      last = now;
      fn();
    };
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      return copied;
    }
  }

  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
