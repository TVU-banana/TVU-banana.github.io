# 2026-09-27：文章标题层级悬停提示

## 目标与决策

- 用户要求文章正文标题在鼠标悬停标题行时显示浅色井号：H1 一个，逐级增加至 H6 六个。
- PaperMod 的 `anchored_headings.html` 已为正文 H1–H6 插入带单个 `#` 的 `.anchor`，主题 CSS 已在标题悬停时显示该锚点。本次只在站点样式中追加 H2–H6 所需井号并降低锚点透明度，不改主题子模块。
- 文章页主标题是独立的 `.post-title`，不显示层级提示。

## 修改文件

- `assets/css/extended/custom.css`：设置正文标题锚点悬停时的浅色效果，并给 H2–H6 分别追加 1–5 个井号。
- `docs/architecture.md`：记录当前正文标题层级提示的渲染行为。
- 本记录与 `.handoff/latest.md`：留下实现、验证和边界。

## 工作区边界

- 开始前工作区已有大量未提交修改，包含用户刚改过的站点字号与主题子模块 `themes/hugo-PaperMod/assets/css/common/post-single.css` 中的 H1/H2 字号。本次保留这些修改，不调整字号、不改主题。

## 验证

- 本地 Hugo `0.166.0` 执行 `hugo --cleanDestinationDir --minify` 通过，生成 EN 26 页、ZH 17 页。
- 在已有 `hugo server` 的文章页 `/posts/gpt-6-luna-够用吗我们要把-llm-当做工程资源还是偷懒工具/` 进行浏览器检查：正文 H1 悬停显示一个浅色 `#`，H2 悬停显示两个浅色 `##`，均位于标题文字后；文章页主标题未出现提示。
- H3–H6 的井号数量按站点 CSS 规则与 PaperMod H1–H6 锚点生成范围静态核对，未单独制作 H3–H6 浏览器样例。
- `git diff --check -- assets/css/extended/custom.css docs/architecture.md` 通过；交接记录和 `latest.md` 的路径存在且相互指向。

## 未验证边界与下一步

- 未提交、推送或部署。线上与 GitHub Actions 状态未检查。
- 若今后替换主题的标题锚点模板或关闭 `disableAnchoredHeadings` 的默认行为，应重新检查此提示。
