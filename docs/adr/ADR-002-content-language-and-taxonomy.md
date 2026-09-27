# ADR-002：文章使用规范语言，其他语言镜像索引

- 状态：Accepted
- 范围：文章、双语页面、Tags、Categories、Search 和 RSS

## 背景

站点有英文和中文入口，但同一篇文章不应因为语言入口不同而重复存储、重复计数或产生两套标签索引。

## 决策

- 文章只在 `params.canonicalContentLanguage` 指定的语言中撰写；当前为 `en`。
- 中文首页、Archive、Tags、Search 和 RSS 通过站点模板读取规范语言文章集合。
- 标签名称使用 Front Matter 的 `tags` 字面值；当前规范标签为 `个人思考` 和 `技术文档`。
- 栏目名称使用 Front Matter 的 `categories` 字面值，通常每篇文章填一个大类。中英文 Categories 总览均从规范语言读取栏目和文章，在卡片内展开文章列表；新增栏目无须手工创建中文分类详情页。
- 文章的 `date` 保留首次发布时间，`lastmod` 记录后续实质修改。

## 结果

新增文章只需要一个规范语言文件。修改双语索引、taxonomy 或 feed 时，需要同时检查两个语言路径；不要直接创建一份内容重复的中文文章。
