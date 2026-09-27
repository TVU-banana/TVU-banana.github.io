# ADR-003：站点覆盖主题，发布使用显式 Pages 工作流

- 状态：Accepted
- 范围：PaperMod 主题、站点模板和 GitHub Pages

## 背景

PaperMod 提供基础展示能力，站点还需要自己的双语导航、文章卡片和 Archive 行为。主题子模块更新时，直接改主题会增加升级和审查成本。

## 决策

- `themes/hugo-PaperMod` 作为只读子模块使用。
- 站点自己的 `layouts/`、`assets/`、`static/` 和配置优先覆盖主题行为。
- 默认只做本地预览和 clean build；没有明确上线指令时不提交、推送或部署。
- 上线由 `.github/workflows/gh-pages.yml` 负责，使用 Hugo `0.166.0`、`--cleanDestinationDir` 和 Pages 部署步骤。

## 结果

模板改动必须先确认是否可以在站点层覆盖。发布报告要区分本地构建、Actions 成功和线上页面可达性。
