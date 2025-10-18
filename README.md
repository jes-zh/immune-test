# 免疫细胞人格测试（静态站点）

一个纯 HTML/CSS/JS 的小测试，适合直接部署到 GitHub Pages。

## 目录
- `index.html` 主页面
- `style.css` 样式
- `script.js` 交互逻辑

## 本地运行
- 直接双击 `index.html` 打开，或
- 开一个简易本地服务器：
  - Python: `python -m http.server 8000` → 打开 `http://localhost:8000`
  - Node: `npx serve`

## GitHub Pages 发布
1. 在 GitHub 新建公开仓库（例如 `immune-test`）。
2. 上传以上三个文件到仓库根目录。
3. Settings → Pages：`Deploy from a branch`，选择 `main` / `(root)`。
4. 稍等构建完成，访问 `https://<用户名>.github.io/immune-test/`。

> 如果你希望作为个人主页，仓库命名为 `<用户名>.github.io` 即可。

## 许可证
MIT
