(async () => {
  const preview = document.getElementById("category-preview");
  if (!preview) return;

  let urls;
  try {
    urls = JSON.parse(preview.dataset.posts);
  } catch (error) {
    console.warn("Category preview could not read the article list", error);
    return;
  }

  try {
    const dateFormatter = new Intl.DateTimeFormat(
      document.documentElement.lang.startsWith("zh") ? "zh-CN" : "en-US",
      { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
    );
    const posts = await Promise.all(urls.map(async (url) => {
      const response = await fetch(url, { cache: "no-store" });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Could not load ${url}`);
      const page = new DOMParser().parseFromString(await response.text(), "text/html");
      const article = page.querySelector(".post-single[data-preview-categories]");
      const title = page.querySelector(".post-title");
      const date = page.querySelector(".post-date-published time");
      if (!article || !title) throw new Error(`Missing article data in ${url}`);
      return {
        url,
        title: title.textContent.trim(),
        date: date?.dateTime || "",
        excerpt: article.dataset.previewExcerpt,
        truncated: article.dataset.previewTruncated === "true",
        tags: JSON.parse(article.dataset.previewTags),
        categories: JSON.parse(article.dataset.previewCategories),
      };
    }));

    const groups = new Map();
    for (const post of posts) {
      if (!post) continue;
      for (const category of post.categories || []) {
        const name = String(category).trim();
        if (!name) continue;
        const key = name.toLocaleLowerCase();
        if (!groups.has(key)) groups.set(key, { name, posts: [] });
        groups.get(key).posts.push(post);
      }
    }

    const current = preview.parentElement.querySelector(".category-grid, .categories-empty");
    if (!current) return;
    if (groups.size === 0) {
      const empty = document.createElement("p");
      empty.className = "categories-empty";
      empty.textContent = preview.querySelector("[data-category-empty]").textContent;
      current.replaceWith(empty);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "category-grid";
    const sortedGroups = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
    for (const group of sortedGroups) {
      group.posts.sort((a, b) => b.date.localeCompare(a.date));
      const card = document.createElement("details");
      card.className = "category-card";
      const summary = document.createElement("summary");
      const heading = document.createElement("span");
      heading.className = "category-card-heading";
      heading.textContent = group.name;
      const count = document.createElement("span");
      count.className = "category-card-count";
      const countLabel = group.posts.length === 1 ? "[data-category-one]" : "[data-category-many]";
      count.textContent = `${group.posts.length} ${preview.querySelector(countLabel).textContent}`;
      const chevron = document.createElement("span");
      chevron.className = "category-card-chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>';
      summary.append(heading, count, chevron);

      const list = document.createElement("ul");
      list.className = "category-card-articles";
      for (const post of group.posts) {
        const item = document.createElement("li");
        item.className = "category-article";
        const article = document.createElement("article");
        const title = document.createElement("h3");
        title.className = "category-article-title";
        const link = document.createElement("a");
        link.href = post.url;
        link.textContent = post.title;
        title.append(link);
        article.append(title);

        if (post.excerpt) {
          const summary = document.createElement("p");
          summary.className = "archive-card-summary category-article-summary";
          summary.textContent = post.excerpt + (post.truncated ? "..." : "");
          article.append(summary);
        }

        if (post.date || post.tags?.length) {
          const meta = document.createElement("div");
          meta.className = "archive-card-meta category-article-meta";
          if (post.date) {
            const time = document.createElement("time");
            time.dateTime = post.date;
            time.textContent = dateFormatter.format(new Date(`${post.date.slice(0, 10)}T00:00:00Z`));
            meta.append(time);
          }
          if (post.tags?.length) {
            const separator = document.createElement("span");
            separator.className = "archive-card-separator";
            separator.setAttribute("aria-hidden", "true");
            separator.textContent = "·";
            const tags = document.createElement("span");
            tags.className = "archive-card-tags";
            tags.textContent = post.tags.join(", ");
            meta.append(separator, tags);
          }
          article.append(meta);
        }
        item.append(article);
        list.append(item);
      }
      card.append(summary, list);
      grid.append(card);
    }
    current.replaceWith(grid);
  } catch (error) {
    console.warn("Category preview kept the Hugo-rendered list", error);
  }
})();
