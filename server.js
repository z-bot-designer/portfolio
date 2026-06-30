const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME 类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// 使用当前文件所在目录作为服务根目录（相对路径，任何地方都能跑）
const baseDir = __dirname;

const PORT = 8080;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // 安全路径：防止目录穿越攻击
  const fullPath = path.join(baseDir, filePath);
  if (!fullPath.startsWith(baseDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 禁止访问');
    return;
  }

  const ext = path.extname(fullPath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>404 找不到</h1><p>文件 <code>${req.url}</code> 不存在</p>`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>500 服务器错误</h1><p>${err.message}</p>`);
      }
      return;
    }

    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end(content);
  });
});

server.listen(PORT, HOST, () => {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║     个人作品集网站 - 本地服务器已启动            ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  三文件版（开发/调试）: http://localhost:8080    ║');
  console.log('║  单文件版（发布/部署）: http://localhost:8080/portfolio.html');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  服务目录: ' + baseDir + ' ║'.slice(0, 52));
  console.log('║  按 Ctrl+C 停止服务器                            ║');
  console.log('╚══════════════════════════════════════════════════╝');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n服务器正在关闭...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});
