# TVU-banana 的个人主页

这是一个使用 [Hugo](https://gohugo.io/) 和 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 构建的静态个人博客。

## 本地预览

安装 Hugo 后，在仓库根目录执行：

```bash
hugo server -D
```

终端会显示本地访问地址。发布文章前，将文章 front matter 中的 `draft` 设为 `false`。

## 写一篇文章

```bash
hugo new content content/posts/文章-slug.md
```

文章放在 `content/posts/`。推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
