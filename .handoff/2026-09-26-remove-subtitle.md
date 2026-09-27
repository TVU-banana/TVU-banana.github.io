# 2026-09-26：移除文章副标题展示

- 状态：当前工作区已完成修改，等待用户决定是否提交或上线
- 范围：文章卡片、文章详情页、相关样式和内容文档
- 保留：文章正文、摘要、日期、标签、搜索、RSS、双语路由和交互行为

## 修改

- `layouts/partials/article_card.html` 不再输出 `subtitle` 元素；
- `layouts/_default/single.html` 不再输出详情页副标题；
- `assets/css/extended/custom.css` 移除两套副标题样式及移动端覆盖；
- `archetypes/posts.md` 和相关文档不再把 `subtitle` 作为新文章展示字段；已有文章字段不做内容改写。

## 验证边界

- 已完成模板、样式和文档引用的静态检查；
- 未执行 Hugo 构建、浏览器检查、Actions 或线上验证；
- 工作区中本任务开始前已有的其他未提交改动保持原样。
