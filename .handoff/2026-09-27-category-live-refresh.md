# 2026-09-27：保存文章后刷新本地专栏

## 目标与原因

- 用户希望修改文章 Front Matter 的 `categories` 后，刷新现有 Hugo Server 页面即可看到专栏变化。
- Hugo `0.166.0` 增量构建会重建文章页，但可能保留旧的 taxonomy 总览 HTML。受控验证中，已存在标签的 term 页会更新，Tags 总览在新标签出现时也可能缓存，所以问题不是 `categories` 字段写法。

## 决策与文件

- `layouts/_default/single.html`：仅在 `hugo server` 中把文章当前的 `categories` 暴露为页面数据。
- `layouts/_default/terms.html`：仅在本地分类总览提供规范语言文章 URL 和本地预览脚本；静态 Hugo 分类卡片继续作为默认内容。
- `static/js/category-preview.js`：刷新页面时读取各文章页的最新分类，按分类重建卡片、计数及文章链接；已删除文章返回 404 时略过；获取失败时保留 Hugo 内容。
- `docs/architecture.md`、`docs/blog-usage.md`、`specs/001-categories/README.md`：更新渲染与作者操作说明。
- 本记录与 `.handoff/latest.md`：记录验证和边界。未修改用户文章的分类值。

## 验证

- 本地 Hugo `0.166.0` 完整构建通过，`node --check static/js/category-preview.js` 通过。
- 在既有本地 `hugo server` 的 `/categories/` 中，临时文章由 `Preview Beta` 改为 `Preview Gamma` 后，服务返回的总览 HTML 仍为 `Preview Beta`，浏览器刷新却正确显示 `Preview Gamma`，证明页面使用了最新文章数据。
- `/zh/categories/` 同样显示临时分类和中文计数；删除临时文章后刷新，分类卡片消失。临时文章已删除。
- `git diff --check` 唯一报告的是任务前已存在的 `content/posts/执行力的本质.md` 行尾空格，本次未修改该文章。

## 边界与下一步

- 正式静态构建不加载预览脚本，仍由 Hugo taxonomy 输出。浏览器禁用 JavaScript 时，本地总览可能显示 Hugo 增量缓存；完整构建不受影响。
- 尚未检查 GitHub Actions 或线上页面；未提交、推送或部署。
