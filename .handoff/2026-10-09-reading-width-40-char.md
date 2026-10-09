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
- 待记录：选择性提交、推送、GitHub Actions Pages 工作流及线上视口检查。

## 未验证边界

- 待记录：线上桌面与窄屏布局；Safari、Firefox 和实体手机未检查。

## 下一步

- 仅提交本记录列出的 4 个文件，推送 `main`，等待 `.github/workflows/gh-pages.yml`，验证线上正文为 720px、宽块仍为 900px，并补全本记录。
