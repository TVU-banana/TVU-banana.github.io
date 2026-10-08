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
- 样式提交：`91e4005`（`style: narrow article text and widen diagrams`）。GitHub Actions 的 [Pages 工作流 Run 65](https://github.com/TVU-banana/TVU-banana.github.io/actions/runs/37748309932) 已完成成功部署。
- 线上浏览器检查：桌面视口 1280px 下，正文列为 630px；[执行力的本质](https://tvu-banana.github.io/posts/%E6%89%A7%E8%A1%8C%E5%8A%9B%E7%9A%84%E6%9C%AC%E8%B4%A8/)中的表格为 900px 且以正文列为中心；[我们能把脑子交给 Agent 吗](https://tvu-banana.github.io/posts/gpt-6-luna-%E5%A4%9F%E7%94%A8%E5%90%97%E6%88%91%E4%BB%AC%E8%A6%81%E6%8A%8A-llm-%E5%BD%93%E5%81%9A%E5%B7%A5%E7%A8%8B%E8%B5%84%E6%BA%90%E8%BF%98%E6%98%AF%E5%81%B7%E6%87%92%E5%B7%A5%E5%85%B7/)中的 Mermaid 图为 900px 且居中；图已渲染。
- 窄视口检查：569px 下 Mermaid 图收缩为 537px；页面滚动宽度等于视口宽度，无横向溢出。中文首页 `/zh/` 加载成功并使用 630px 主宽度变量。
- 待记录：选择性提交与推送结果、GitHub Actions Pages 工作流结果、线上受影响页面检查。

## 未验证边界

- 本轮以 Codex 内置浏览器验证桌面及窄视口；未检查 Safari、Firefox 或实体手机。

## 下一步

- 工作完成；样式与部署证据记录于本文件。
