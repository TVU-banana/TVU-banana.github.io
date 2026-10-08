# 2026-10-08 正文、表格与 Mermaid 宽度调整

## 目标

将站点正文列从约 45 个全角字符缩窄至约 35 个；正文表格和 Mermaid 图可用约 50 个全角字符宽度。保持其余交互与功能不变，并按用户明确要求部署上线。

## 决策

- 以当前 18px 正文字号的刻度将正文宽度设为 630px，将宽表格和 Mermaid 容器最大宽度设为 900px。
- 表格和 Mermaid 容器相对正文列居中；宽度受视口减去 32px 留白限制，避免窄屏横向溢出。
- 不修改主题子模块。既有工作区改动独立于本次提交，发布时仅选择本任务文件。

## 修改文件

- `assets/css/extended/custom.css`：正文/导航基准宽度 810px→630px；新增 900px 宽内容上限并应用于正文表格及 Mermaid 容器。
- `docs/architecture.md`：更新当前正文与宽内容宽度事实。
- `.handoff/2026-10-08-reading-widths.md`：本交接记录。
- `.handoff/latest.md`：指向本记录。

## 验证证据

- `git diff --check` 通过。
- 本地 Hugo `0.166.0+extended` 执行 `hugo --gc --cleanDestinationDir --minify` 成功：英文 26 页、中文 17 页。
- 构建产物压缩 CSS 已确认包含 `--main-width:630px`、`--wide-content-width:900px`，并将宽度规则应用于正文表格及 `.mermaid-figure`。
- `git fetch origin main` 成功；提交前本地 `main` 与 `origin/main` 同步（差异计数 0/0）。
- 待记录：推送后 GitHub Actions Pages 工作流及线上路由检查。
- 待记录：选择性提交与推送结果、GitHub Actions Pages 工作流结果、线上受影响页面检查。

## 未验证边界

- 本轮未做浏览器实际布局检查；宽度规则通过 clean build 的生成 CSS 检查确认，浏览器/设备渲染未验证。

## 下一步

- 仅暂存并提交本记录列出的文件；推送 `main`，等待 `.github/workflows/gh-pages.yml`，再检查线上中英文文章及含表格/Mermaid 的页面，并回填本节证据。
