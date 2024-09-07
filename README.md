# Tolgee 搭配 vue-i18n 实现 Vue 项目国际化

vue 项目接入 [tolgee](https://tolgee.io/) 词条管理平台的项目 demo。本地开发采用 tolgee 平台线上词条管理，生产环境打包前会将语言包下载并打包。

### 安装依赖

```shell
pnpm i
```

### 填写环境变量

tolgee 官网注册，新增项目，申请 api_key

在根目录 .env 文件下替换对应的 VITE_TOLGEE_PROJECT_ID 和 API_KEY

```
# tolgee PROJECT_ID
VITE_TOLGEE_PROJECT_ID=your_project_id
# tolgee API_KEY
VITE_TOLGEE_KEY=your_api_key
```

### 导入测试数据

#### en.json

```json
{
  "frontend": "Frontend",
  "i18n": "Internationalization",
  "project": "Project",
  "website": "Website"
}
```

#### zh.json

```json
{
  "frontend": "前端",
  "i18n": "国际化",
  "project": "项目",
  "website": "网站"
}
```

### 启动项目

```shell
pnpm dev
```

### 手动获取最新语言包到 src/locales

```shell
pnpm getLocales
```

搭配 vscode 的 i18n Ally 插件，具备翻译条目的代码补全及预览功能

### 打包项目

```shell
pnpm build
```
