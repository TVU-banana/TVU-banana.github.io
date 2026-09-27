# 2026-09-27：Categories 中文显示名称改为专栏

## 目标与决策

- 用户要求保留英文 `Categories`，将对应中文显示名称统一改为“专栏”。
- 仅改用户可见中文文案及描述；taxonomy 字段 `categories`、英文名称、`/categories/` 与 `/zh/categories/` 路由不变。

## 修改文件

- 中文导航和语言切换文案：`config.yml`、`data/navlabels.yaml`。
- 中文分类总览标题、说明与空状态：`content/categories/_index.zh.md`、`i18n/zh.yaml`。
- 使用和事实文档：`docs/blog-usage.md`、`docs/architecture.md`、`specs/001-categories/README.md`。
- 交接：本记录与 `.handoff/latest.md`。

## 验证与边界

- Hugo `0.166.0` 本地构建通过；生成页面确认英文标题与导航仍为 `Categories`，中文标题、导航和空状态改为“专栏”，双语路由保持不变。
- 本次涉及的已跟踪文件 `git diff --check` 通过；新文件未发现行尾空格。
- 未提交、推送或检查线上。原有工作区改动保持不动。
