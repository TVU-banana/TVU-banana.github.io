# 2026-10-09 正文宽度调整为 40 字符并上线

## 目标

根据用户复查，将上一轮设定的约 35 个全角字符正文宽度调整为约 40 个；表格与 Mermaid 宽度保持约 50 个字符。完成部署上线。

## 决策

- 按 18px 全角字符刻度，将 `--main-width` 从 630px 调整为 720px。
- `--nav-width` 继续跟随正文主宽度；宽表格与 Mermaid 的 900px 上限及窄屏视口留白规则不变。
- 不修改主题子模块，不纳入开始任务前已有的未提交改动。

## 修改文件

- `assets/css/extended/custom.css`：正文宽度 630px→720px，并更新字符数注释。
- `docs/architecture.md`：更新正文宽度事实为约 40 字符/720px。
- `.handoff/2026-10-09-reading-width-40-char.md`：本次交接记录。
- `.handoff/latest.md`：指向本记录。

## 验证证据

- `git diff --check` 通过。
- 本地 Hugo `0.166.0+extended` 执行 `hugo --gc --cleanDestinationDir --minify` 成功：英文 26 页、中文 17 页。
- 构建产物压缩 CSS 确认基准 `--main-width:720px`，宽内容 `--wide-content-width:900px` 保持不变。
- `git fetch origin main` 成功；编辑前本地 `main` 与 `origin/main` 同步（差异计数 0/0）。
- 样式提交 `f80be54`（`style: widen article text to 40 characters`）已推送；GitHub Actions [Pages 工作流 Run 67](https://github.com/TVU-banana/TVU-banana.github.io/actions/runs/37907778437) 已完成成功部署。
- 线上浏览器桌面视口 1280px：文章正文 720px；[执行力的本质](https://tvu-banana.github.io/posts/%E6%89%A7%E8%A1%8C%E5%8A%9B%E7%9A%84%E6%9C%AC%E8%B4%A8/)表格宽 900px 且居中；[我们能把脑子交给 Agent 吗](https://tvu-banana.github.io/posts/gpt-6-luna-%E5%A4%9F%E7%94%A8%E5%90%97%E6%88%91%E4%BB%AC%E8%A6%81%E6%8A%8A-llm-%E5%BD%93%E5%81%9A%E5%B7%A5%E7%A8%8B%E8%B5%84%E6%BA%90%E8%BF%98%E6%98%AF%E5%81%B7%E6%87%92%E5%B7%A5%E5%85%B7/) Mermaid 宽 900px 且居中，SVG 已渲染。
- 375px 窄屏：表格与 Mermaid 容器/SVG 均宽 343px，文档滚动宽度等于视口，无横向溢出。中文首页 `/zh/` 加载正常，主宽度变量为 720px。

## 未验证边界

- 以上线上测量使用 Codex 内置浏览器；Safari、Firefox 和实体手机未检查。

## 下一步

- 工作完成；实现、部署和线上视口证据记录于本文件。
