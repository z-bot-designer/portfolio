# 个人作品集网站 - 本地部署指南

## 快速启动（推荐）

### 方法一：双击启动（最简单）

#### 方式 A：使用 Node.js（推荐）
1. 确保已安装 [Node.js](https://nodejs.org/)
2. 双击 `start.bat` 文件
3. 浏览器自动打开 `http://localhost:8080`
4. 按 `Ctrl+C` 关闭服务器

#### 方式 B：使用 Python
1. 确保已安装 Python 3
2. 双击 `start.py` 文件
3. 浏览器打开 `http://localhost:8080`
4. 按 `Ctrl+C` 关闭服务器

---

## 命令行启动方式

### 方式一：Node.js 服务器（推荐）

```bash
# 进入项目目录
cd C:\Users\Amber\Documents\kimi\workspace

# 启动服务器
node server.js

# 浏览器访问 http://localhost:8080
```

### 方式二：Python 内置服务器

```bash
# 进入项目目录
cd C:\Users\Amber\Documents\kimi\workspace

# Python 3
python -m http.server 8080

# 或者
python3 -m http.server 8080

# 浏览器访问 http://localhost:8080
```

### 方式三：VS Code Live Server 插件

1. 安装 VS Code
2. 安装扩展 "Live Server"
3. 右键点击 `index.html` 或 `portfolio.html`
4. 选择 "Open with Live Server"

### 方式四：使用 npx（无需安装额外工具）

```bash
npx http-server -p 8080
```

---

## 文件说明

| 文件 | 用途 |
|------|------|
| `index.html` + `styles.css` + `app.js` | 三文件分离版本（开发/调试方便） |
| `portfolio.html` | 单文件版本（发布/部署用） |
| `server.js` | Node.js 服务器脚本 |
| `start.bat` | Windows 双击启动脚本 |
| `start.py` | Python 双击启动脚本 |

---

## 部署到公网

本地测试完成后，可以部署到免费静态托管平台：

| 平台 | 特点 | 部署方式 |
|------|------|----------|
| [GitHub Pages](https://pages.github.com/) | 免费、稳定 | 上传 `portfolio.html` 到仓库 |
| [Vercel](https://vercel.com/) | 免费、自动部署 | 拖拽文件夹上传 |
| [Netlify](https://www.netlify.com/) | 免费、支持表单 | 拖拽文件夹上传 |
| [腾讯云 COS](https://cloud.tencent.com/product/cos) | 国内访问快 | 上传文件到存储桶 |
| [Gitee Pages](https://gitee.com/help/articles/4136) | 国内访问快 | 类似 GitHub Pages |

> **提示**：部署时只需上传 `portfolio.html`（单文件版本），不需要上传其他文件。

---

## 常见问题

**Q: 端口 8080 被占用怎么办？**

修改 `server.js` 中的端口号：
```javascript
server.listen(8080, '127.0.0.1', () => {
```
改为其他端口如 `3000`、`8888` 等。

**Q: 其他设备无法访问？**

将 `127.0.0.1` 改为 `0.0.0.0`：
```javascript
server.listen(8080, '0.0.0.0', () => {
```
然后使用本机 IP 地址访问，如 `http://192.168.x.x:8080`

**Q: 修改代码后没有生效？**

按 `Ctrl+F5` 强制刷新浏览器缓存。

---

*祝使用愉快！如有问题可随时反馈。*
