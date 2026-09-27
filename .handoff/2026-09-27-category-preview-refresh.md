# 2026-09-27：新专栏未出现在运行中的本地预览

## 目标与结论

- 用户给 `content/posts/GPT-6-Luna 够用吗：我们要把 LLM 当做工程资源还是偷懒工具.md` 加了 `categories: ["Agents"]`，但本地专栏总览仍显示空状态。
- Front Matter 写法有效，文章 `draft: false`。完整 Hugo 构建在 `/categories/`、`/zh/categories/` 与 `/categories/agents/` 都生成 Agents 和文章链接。
- 原因在 Hugo `0.166.0` 的运行中增量预览：新增 term 详情页会生成，但已存在的 taxonomy 总览未自动重新渲染。这不是文章字段错误，也不是静态构建缺失。

## 调查证据

- 原有两个预览进程分别运行于 1313（`hugo server -D`，启动于 9 月 25 日）和 1314（普通预览，启动于 9 月 26 日）；两者均返回“暂无专栏”，早于专栏功能建立。
- 新启动的 1315 预览显示 Agents。
- 用 `/tmp` 内容副本复现：先无分类启动 1316，再给文章添加 `categories: ["Agents"]`，term 路由生成，但英文与中文总览仍为空；使用 `--disableFastRender` 的 1317 也同样如此。修改临时 taxonomy 总览内容后，两个总览才重新渲染。
- 已按原参数重启 1313 与 1314；两端口的英文与中文总览现均返回 Agents。

## 修改文件与操作

- `docs/blog-usage.md` 记录作者在本地预览遇到新专栏不显示时应重启服务。
- `docs/architecture.md` 记录当前 Hugo 版本的预览限制。
- `docs/blog-usage.md` 与 `specs/001-categories/README.md` 中原先“当前文章尚未填写专栏”的陈述已改为通用空状态描述，与现有 Agents 文章一致。
- 本记录与 `.handoff/latest.md`。
- 对 `layouts/_default/terms.html` 做过一次临时依赖尝试，实验无效，已撤回；文章和功能模板内容没有改动。

## 验证边界与下一步

- 最终复核：Hugo `0.166.0` 完整构建通过；`docs/blog-usage.md` 与 `docs/architecture.md` 的 `git diff --check` 通过，新文档没有行尾空格；1313 与 1314 的英文／中文专栏页均返回 Agents。未检查线上，也未提交或推送。
- 1313 与 1314 两个本地预览服务保持运行，供用户刷新现有浏览器页。
