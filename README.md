# @melt-js/tpl-vue3-admin-antd-vben

由 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 5.8 的 `playground` 拆出的 Vue 3 + Ant Design Vue（`antdv-next`）后台模板。

- 基础库：`@melt-js/libs-vben`（上游 `packages/*` 的非组件部分）
- 组件层：`@melt-js/comps-vben`（上游 `@core/ui-kit/*` + `common-ui` / `layouts` / `plugins`），以 hel-micro 远程组件形式加载
- 模板层：本包（页面、路由、store、api、Ant Design 适配器、本地 mock）

与 `tpl-vue3-admin-ele-vben`（Element Plus 版）是同一套上游代码的两个组件库实现。

## 启动

```bash
# 仓库根目录
pnpm install
pnpm vben-antd:dev      # comps-vben(20090) + 模板(50270) 一起启动
```

打开 http://localhost:50270。

> 只启动模板：先 `pnpm vben-comps:dev`，再 `pnpm vben-antd:dev:tpl`。

默认账号（密码均为 `123456`）：

| 用户名 | 角色 | 首页 |
| --- | --- | --- |
| `vben` | super | `/dashboard/workspace` |
| `admin` | admin | `/dashboard/workspace` |
| `jack` | user | `/dashboard/analytics` |

开发、预览和生产静态构建的 `/api` 都由浏览器端 mock（`VITE_USE_MOCK=true`）接管，不需要额外启动后端。

## 页面

- `#/dashboard/analytics`、`#/dashboard/workspace`
- `#/demos/*`：权限、徽标、面包屑、nested 菜单、各类功能演示
- `#/examples/*`：表单、弹窗、抽屉、表格、验证码、图表、编辑器、VXE Table 等
- `#/system/*`：用户 / 角色 / 菜单 / 部门 / 字典管理
- `#/auth/login`（默认）、`#/about`、403 / 404 / 500 / 离线页

路由使用 hash 模式，便于静态预览。

## 构建 / 预览

```bash
pnpm vben-antd:build
pnpm vben-antd:preview   # http://localhost:50280
```

端口按仓库全局规则登记在根目录 `ports.json`：dev `50270`，preview `50280`。

## 本地 mock

`src/mock/` 是上游 `apps/backend-mock` 的可运行子集（不依赖 Nitro / faker）：

- `handlers.ts`：纯函数 handler，按路径 / 方法返回响应，数据用固定种子生成，刷新页面结果稳定
- `adapter.ts`：axios adapter，拦截 `/api/*`，其它请求（外链下载、图片）交给原生 adapter

覆盖的接口：

- 认证：`/auth/login`、`/auth/logout`、`/auth/refresh`、`/auth/codes`、`/user/info`、`/menu/all`
- 字典：`/dict/all`、`/dict/data`、`/dict/version`、`/system/dict/type/*`、`/system/dict/data/*`
- 时区：`/timezone/getTimezone`、`/timezone/getTimezoneOptions`、`/timezone/setTimezone`
- 系统列表：`/system/user|role|menu|dept/list`
- 示例：`/table/list`、`/status`、`/demo/bigint`、`/upload`

与上游一致：除字典外，`/system/*` 的写操作返回 403（演示环境禁止修改）。

为什么放在浏览器端：上游公开 mock（`mock-napi.vben.pro`）只实现了登录 / 用户 / 菜单等少数接口，
`/dict/*`、`/system/*` 会落到它的 HTML 兜底页（`text/html`），导致字典预加载报错；
改成客户端 mock 后，dev / preview / unpkg 静态页面的数据行为一致。

接真实后端时把环境变量改成：

```bash
VITE_USE_MOCK=false
VITE_GLOB_API_URL=https://your-api.example.com/api
```

## 与上游的差异

- 依赖从 `@vben/*` / `@vben-core/*` 改为 `@melt-js/libs-vben/*`、`@melt-js/comps-vben/*`；组件层通过 hel 远程加载（见下一节），业务代码统一从 `#/remote/comps` 取组件 / 方法，类型仍来自本地 comps-vben 源码。
- 组件库为 `antdv-next`（上游 playground 同款）；样式走 `@melt-js/libs-vben/styles/antdv-next`，并由 `<StyleProvider layer>` 把组件样式注入 `@layer antd`。
- 原先由 `@vben/vite-config` 注入的 PWA、压缩包、importmap、license、Nitro mock 等构建插件已精简；只保留 Vue / Vue JSX、Tailwind 4 和浏览器端 mock。
- 环境变量精简为 `VITE_APP_TITLE`、`VITE_APP_NAMESPACE`、`VITE_PORT`、`VITE_BASE`、`VITE_GLOB_API_URL`、`VITE_USE_MOCK`、`VITE_ROUTER_HISTORY`。
- 去掉了上游 `playground` 的 Playwright e2e 与 `src/testing` 布局测试 API。

### 两个样式修补

- `libs-vben/src/theme.css` 的 `@source` 里登记了本模板 `src`，Tailwind 才会扫描模板里的工具类。
- `src/styles/index.css` 覆盖了 comps-vben 中 `:root .vxe-grid { height: auto !important }` 对本模板的影响，并把 VXE 组件布局样式（`vxe-table/styles/all.scss`、`vxe-pc-ui/styles/all.scss`）在 `bootstrap.ts` 中引入，否则 `gridOptions.height = 'auto'` 的表格会按内容撑开。

## 远程组件（comps-vben）

组件层不随模板打包，而是通过 hel-micro 远程加载：

- `comps-vben` 的 UMD 按命名空间导出：`commonUi` / `commonUiTippy` / `layouts` / `menuUi` / `plugins` / `pluginsEcharts` / `pluginsMotion` / `pluginsTiptap` / `pluginsVxeTable`
- 本地：先启动 `pnpm vben-comps:dev`（20090），再启动模板（50270）
- 生产：从 unpkg 的 `@melt-js/comps-vben@2026.11.8-6/hel_dist/hel-meta.json` 加载
- 模板启动时在 `main.ts` 里先 `await setupRemoteComps()`，注入 Vue / router / pinia / i18n 以及 preferences / stores / locales / globalState，再动态加载 `bootstrap`
- 业务代码里的组件 / 方法统一从 `#/remote/comps` 代理导入（`src/remote/comps.ts` 由实际使用到的符号生成），类型仍来自本地 comps-vben 源码

comps-vben 的 UMD 没有引用 element-plus，所以本模板不需要注入 `window.ElementPlus`。

```bash
pnpm vben-antd:dev       # comps 20090 + tpl 50270 一起启动
pnpm vben-comps:dev      # 只启动远程组件
pnpm vben-antd:dev:tpl   # 只启动模板（需先启动 comps）
```

## 目录

```text
src/
  adapter/        # antdv-next / VbenForm / VXE Table 适配
  api/            # 登录、用户、菜单、字典、时区、系统管理、示例接口
  layouts/        # BasicLayout / AuthLayout
  locales/        # 应用语言包（zh-CN / en-US / zh-TW）
  router/         # 静态路由、动态路由、守卫
  store/          # auth store
  views/          # dashboard / demos / examples / system / _core
  styles/         # 模板级样式修补
  mock/           # 浏览器端 mock（handlers.ts + adapter.ts）
vite/
  tailwind-reference.ts # SFC <style> 的 @reference 注入
```

## 发布 / unpkg

```bash
# 构建 + 打 tarball（workspace:* 会被 pnpm pack 重写）+ 提交 npm stage
pnpm vben-antd:publish:stage
```

生产构建使用相对路径（`VITE_BASE=./`）、浏览器端 mock（`VITE_USE_MOCK=true`）和 unpkg 上的远程组件，
发布后可直接用 unpkg 打开静态页面，登录与演示数据都可用：

```text
https://unpkg.com/@melt-js/tpl-vue3-admin-antd-vben@<version>/dist/index.html
```

> 远程组件版本在 `src/remote/comps-config.ts` 里固定为 `comps-vben@2026.11.8-6`；
> 该版本在 unpkg 上线后再发布本模板。

stage 只是暂存，需要执行 `npm stage approve <id>` 后才会在 unpkg 上线。
