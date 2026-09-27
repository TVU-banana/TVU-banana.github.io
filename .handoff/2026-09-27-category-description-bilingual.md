# 2026-09-27：双语专栏移除说明文案

## 目标与授权

- 中文专栏说明移除并上线后，用户要求英文 Categories 标题下的 “Browse articles by category.” 也删除。
- 本轮沿用已授权的本地检查后上线流程。

## 修改文件与决策

- `content/categories/_index.md`：移除英文专栏的 `description` 字段，与中文专栏保持一致。
- `docs/architecture.md`：把双语页面无说明文案写成当前渲染事实。
- 本记录与 `.handoff/latest.md`：保留本地验证和上线边界。
- 原有主题子模块工作区修改不属于本轮范围。

## 本地验证与上线边界

- 既有 Hugo Server 的 `/categories/` 已无说明文案，分类卡片仍显示；前一轮已验证 `/zh/categories/` 无说明。
- Hugo `0.166.0` 按 Pages 参数完成清理构建；生成的英文和中文专栏 HTML 均无说明文案，均保留 Agents Engineering 卡片；`git diff --check` 通过。
- 推送后等待 `.github/workflows/gh-pages.yml`，检查线上两个专栏路由均无说明文案。
