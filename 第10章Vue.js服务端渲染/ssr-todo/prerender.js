// Pre-render the app into static HTML.
// 预渲染出首屏的页面并生成HTML文件

const fs = require('fs')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p)
// 资源映射文件
const manifest = require('./dist/static/ssr-manifest.json')
// 模板文件
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
// 调用生成模式下的entry-server.js，可以利用这里的逻辑添加preload资源
const { render } = require('./dist/server/entry-server.js')

;(async () => {
  // 预渲染指定路由的首屏页面
  // 这里首屏的路由是 /
  let url = '/'

  const [appHtml, preloadLinks] = await render(url, manifest)

  const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

  const filePath = `dist/static${url === '/' ? '/index' : url}.html`
  fs.writeFileSync(toAbsolute(filePath), html)

  // HTML文件生成后，删除无用文件
  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()