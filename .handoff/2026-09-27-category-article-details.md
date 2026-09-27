# 2026-09-27：专栏文章详情行

## 目标与原因

- 用户要求去除专栏计数中的引号，在展开列表中为每篇文章显示类似文章卡片的摘要、发布日期和 Tags，并加粗栏目标题与首篇文章之间的分隔线。
- 引号只出现在本地预览脚本重建的卡片：Hugo 静态输出为 `1 article`，但在 HTML 属性中传给脚本的单数翻译变成了带引号的值。

## 修改文件与决策

- `layouts/_default/terms.html`：本地预览翻译文案改放在隐藏文本节点，避免属性上下文对单数文案加引号；分类文章列表调用新 partial。
- `layouts/partials/category_article.html`：静态构建的每篇栏目文章输出标题、正文开头摘要、日期和 Tags。
- `layouts/partials/article_excerpt.html`、`layouts/partials/article_card.html`：提取原有文章卡片的摘要净化逻辑，让普通文章卡片与专栏行共用；Mermaid 源码仍不进入摘要。
- `layouts/_default/single.html`、`static/js/category-preview.js`：本地文章页把摘要、Tags 和截断状态传给专栏预览，脚本按同样结构重建文章行；脚本 URL 使用 `?v=2`，使现有预览浏览器加载新版本。
- `assets/css/extended/custom.css`：专栏文章行沿用文章卡片的摘要和元信息样式；首篇上边线设为 2px，后续文章间设为 1px。
- `docs/architecture.md`、`docs/blog-usage.md`、`specs/001-categories/README.md`：同步当前页面行为和验收条件。
- 本记录与 `.handoff/latest.md`：记录验证与边界。

## 验证

- Hugo `0.166.0` 本地完整构建通过；英文与中文静态分类页均输出标题、摘要、日期、Tags，英文静态计数无引号。
- 在已有 `hugo server` 的 `/categories/` 浏览器页，计数为 `1 article`，展开后可见摘要、英文日期和 Tags；`/zh/categories/` 显示中文日期和 `2 篇文章`。
- 临时增加第二篇同栏文章后，浏览器计算样式确认首篇上边线 2px、第二篇上边线 1px；临时文章已删除。
- `node --check static/js/category-preview.js` 与本次改动的已跟踪文件 `git diff --check` 通过。

## 未验证边界

- 尚未检查 GitHub Actions 或线上页面；未提交、推送或部署。工作区原有其他未提交内容及主题子模块修改均保留。
