# 2026-09-27：Categories 栏目入口与双语总览

## 目标与决策

- 用户要求在搜索右侧增加 Categories 导航入口，点击后浏览当前分类；作者以后只需在文章 Front Matter 填写 `categories`。
- 继续使用 Hugo 已声明的 `categories` taxonomy，文章仍只在规范语言中撰写。
- Hugo 不会仅凭英文文章的分类自动产生中文 term 详情页。因此分类总览采用可展开卡片，在 `/categories/` 和 `/zh/categories/` 直接列出规范语言文章链接；无需为每个新分类创建中文路由壳。英文原生 term 页仍由 Hugo 自动生成。
- 现有文章的分类归属未由 Agent 猜测，当前总览显示空状态；`archetypes/posts.md` 已加 `categories: []`。

## 修改文件

- 配置与导航：`config.yml`、`data/navlabels.yaml`。
- 分类路由壳：`content/categories/_index.md`、`content/categories/_index.zh.md`。
- 视图与文案：`layouts/_default/terms.html`、`assets/css/extended/custom.css`、`i18n/en.yaml`、`i18n/zh.yaml`。
- 作者模板和事实文档：`archetypes/posts.md`、`docs/blog-usage.md`、`docs/architecture.md`、`docs/adr/ADR-002-content-language-and-taxonomy.md`、`specs/001-categories/README.md`。
- 交接：本记录与 `.handoff/latest.md`。

## 验证证据

- Hugo `0.166.0` 本地构建成功；实际工作区英文 24 页、中文 17 页。实际分类页显示双语空状态。
- 用 `/tmp` 内的文章副本加入 `categories: ["Engineering"]` 后构建：英中分类页均显示栏目、`1 article`／`1 篇文章` 与文章链接；英文原生分类详情页自动生成。临时文章未写入仓库。
- 本地浏览器检查了真实英文空状态，以及临时分类卡片的展开交互和中文导航文案。
- `git diff --check` 对整个工作区仍报用户原有文章 `content/posts/执行力的本质.md:4` 的尾随空格；本次没有修改那一行。

## 未验证边界与下一步

- 未检查真实窄屏视口、GitHub Actions 或线上站点；没有提交、推送或部署。
- 当前真实文章尚未填写 `categories`。作者在文章 Front Matter 填写分类后再做一次真实内容的页面检查。
- 工作区有大量原有未提交改动，后续提交必须选择性暂存，不能吸收无关文件。
