# DiKi 博客使用说明

## 1. 新增一篇文章

把 Markdown 文件放在：

```text
content/posts/
```

最简单的文章结构：

```text
content/posts/my-first-post.md
```

推荐使用页面包，以便把封面图和文章资源放在一起：

```text
content/posts/my-first-post/
├── index.md
└── cover.jpg
```

`index.md` 示例：

```markdown
---
title: "My First Post"
date: 2026-09-20
description: "A short description shown in lists and search."
tags: ["notes", "life"]
draft: false
---

正文写在这里。

![封面](cover.jpg)
```

文章满足以下条件后，会出现在首页和 Archive：

- 文件位于 `content/posts/` 下；
- 正式文章建议使用 `draft: false`；本地预览草稿使用 `hugo server -D`；
- `date` 不晚于当前日期；
- 没有被设置为隐藏。

注意：当前 GitHub Pages 工作流带有 `--buildDrafts`，所以 `draft: true` 的文件也会被部署。不要把尚未准备公开的草稿放在会被推送的内容目录中，或在以后调整工作流的草稿策略。

文章的 `tags` 不需要单独建文件。Tags 页面会自动从文章 Front Matter 中的 `tags` 字段生成。

## 2. 哪些页面由文章自动生成

同一篇文章会自动参与：

| 页面 | 来源 |
| --- | --- |
| 首页 `/`、`/zh/` | `content/posts/` 下的文章 |
| Archive `/archives/`、`/zh/archives/` | 文章日期和文章集合 |
| Tags `/tags/`、`/zh/tags/` | 每篇文章的 `tags` |
| Search `/search/`、`/zh/search/` | Hugo 生成的站点搜索索引 |

不要把文章放入 `content/archives.md`、`content/search.md` 或 Tags 页面；这些文件是站点路由壳，不是文章目录。

顶部的 `RSS` 入口会随当前语言切换到对应订阅源：英文为 `/index.xml`，中文为 `/zh/index.xml`。订阅阅读器也可以直接添加这两个地址。

## 3. 修改 About 页面

About 是站点本体页面，不属于文章：

```text
content/about.md       # English: /about/
content/about.zh.md    # 中文: /zh/about/
```

目前两个文件都只保留了干净的页面入口。你可以分别把英文和中文介绍写入对应文件。不要把个人文章放进 About 文件。

## 4. 图片和其他资源放哪里

- 只给某一篇文章使用的图片：放在该文章目录旁边，例如 `content/posts/my-first-post/cover.jpg`；
- 全站都会使用的资源：放在 `assets/`，由 Hugo 处理；
- 需要原样复制到网站根目录的文件：放在 `static/`。

优先把文章图片放进对应的页面包，不要把文章图片混放在全局目录中。

## 5. 本地预览与发布

本地预览：

```bash
hugo server
```

需要预览草稿时：

```bash
hugo server -D
```

发布流程：

```bash
git add .
git commit -m "feat: add a post"
git push origin main
```

推送到 `main` 后，GitHub Actions 会自动执行 Hugo 构建并部署 GitHub Pages。部署前会清理旧的输出目录，避免已经删除的文章重新出现在网站上。

## 6. 文件到页面的关系

```mermaid
flowchart TD
    Posts[content/posts/] --> Home[首页 / 与 /zh/]
    Posts --> Archive[Archive /archives/]
    TagsField[文章 Front Matter 的 tags] --> Tags[Tags /tags/]
    Posts --> SearchIndex[Hugo 搜索索引]
    SearchIndex --> Search[Search /search/]
    AboutEN[content/about.md] --> About[About /about/]
    AboutZH[content/about.zh.md] --> AboutZHPage[关于 /zh/about/]
    Assets[文章目录中的图片] --> PostPage[对应文章页面]
```

记住最重要的一点：新增文章只放进 `content/posts/`；不要修改 Archive、Search 或 Tags 路由文件来“添加文章”。
