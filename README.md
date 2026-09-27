# DiKi

Personal bilingual Hugo blog for TVU-banana.

## Quick start

Preview published content locally:

```bash
hugo server
```

Preview drafts as well:

```bash
hugo server -D
```

Build a clean output directory:

```bash
hugo --cleanDestinationDir --minify
```

## Documentation map

- [Agent 工作规则](AGENTS.md)：任务开始、修改边界、验证和上线规则；
- [项目架构与 Agent 路由](docs/architecture.md)：目录边界、内容契约、渲染链路和任务类型；
- [博客使用说明](docs/blog-usage.md)：新增文章、标签、资源、预览和发布；
- [长期决策](docs/adr/)：双语内容、主题覆盖和文档分层的原因；
- [功能规格](specs/README.md)：何时创建跨边界 Spec，以及最小文件约定；
- [最新交接](.handoff/latest.md)：最近一次工作的上下文、验证边界和未完成事项。

站点使用 Hugo 和 PaperMod。站点自己的内容与模板应保存在仓库层，主题子模块只作为基础实现使用。

普通文章不需要创建完整 Spec。跨多个模板、配置和部署边界且需要验收条件的新功能，才使用 `specs/<id>/` 记录规格、计划、任务和契约。
