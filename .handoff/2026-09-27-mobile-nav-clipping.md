# 2026-09-27：修复手机窄屏导航裁切

## 目标与原因

- 用户报告点击 Articles 后，Categories 会短暂隐藏；Search 没有相同现象。
- 本地浏览器将视口设为 375px 后复现：单行头部空间不足，`#menu` 被压缩，右侧 Categories 被父级 `.nav` 的 `overflow: hidden` 裁切。Articles 页同样可见此问题；页面内容较长时更明显。

## 修改与决策

- 仅调整 `assets/css/extended/custom.css` 的窄屏头部：宽度不超过 480px 时，第一行放站点标题与语言／主题开关，第二行完整显示 Articles、Search、Categories，并将头部高度与正文上方留白同步设为 98px。
- 更新 `docs/architecture.md` 的当前渲染事实，并在 `specs/001-categories/README.md` 补充窄屏验收条件。
- 未改导航数据、脚本、文章、主题子模块或其他页面模板。

## 验证证据

- 修改前在 375px 视口浏览器截图中，Categories 位于裁切边缘；点击 Articles 后仍被裁切。
- 修改后在 375px 与 320px 浏览器视口检查英文 Articles，三个导航入口均完整显示；在 320px 点击 Search、Categories，入口保持可见；中文 `/zh/archives/` 切换中文菜单后也完整显示“文章 / 搜索 / 分类”。
- Hugo `0.166.0` 本地构建通过；本次修改的 CSS 与架构文档 `git diff --check` 通过，新文档没有行尾空格。不代表线上验证。

## 未验证边界与下一步

- 尚未检查 GitHub Actions 或线上；未提交或推送。
- 工作区有原有未提交改动，后续操作必须选择性暂存。
