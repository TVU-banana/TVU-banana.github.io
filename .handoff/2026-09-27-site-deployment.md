# 2026-09-27：站点上线

## 目标与授权

- 用户确认当前功能和内容满意，并明确要求上线；本轮执行 `main` 提交、推送及 Pages 验证。
- 发布范围为当前站点层的文章、配置、布局、样式、脚本和同步文档。工作区原有主题子模块修改不进入主仓库提交。

## 发布前修正与文件

- `content/posts/执行力的本质.md`：移除描述字段末尾的空格，使全量 `git diff --check` 通过；内容文字未改变。
- `content/posts/GPT-6-Luna 够用吗：我们要把 LLM 当做工程资源还是偷懒工具.md` 与 `static/js/mermaid/mermaid.min.js`：仅清理新暂存文件中的行尾空格，使已暂存变更的 `git diff --cached --check` 通过；文章正文与脚本逻辑未调整。
- `assets/css/extended/custom.css`：把工作区主题子模块中的正文 H1/H2 字号（32px/27px）落实为站点覆盖规则，确保 Pages 使用干净子模块时仍保持本地已接受的视觉效果；主题子模块未改动或暂存。
- `docs/architecture.md`：记录站点字号覆盖来源。
- 本记录与 `.handoff/latest.md`：记录本次授权、范围、验证及后续核对项。

## 发布前证据

- `git diff --check` 已通过。
- 本地 Hugo `0.166.0` 按 Pages 工作流参数完成 `--gc --cleanDestinationDir --minify` 构建，英文 26 页、中文 17 页。
- 生成目录包含首页、Archive、Search、Tags、Categories 的英文和中文路由；双语 Categories 均输出 Agents Engineering、文章摘要与元信息。
- 生成 CSS 中站点覆盖规则位于主题规则之后，正文 H1/H2 字号分别为 32px/27px。
- 发布前本地 `HEAD` 与远端 `main` 均为 `b2ce0c9f0215896961856d7821011abcbe4e2da2`。

## 提交后的核对项

- 核对主仓库提交及推送的 SHA 一致；等待 `.github/workflows/gh-pages.yml` 成功；检查线上中英文首页、专栏及相关内容路由。
- 主题子模块的工作区字号修改仍在本地，但站点 CSS 已承接其效果；不要误将该子模块修改作为主仓库部署证据。
