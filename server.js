// Simple static file server for previewing the report
// Serves feasibility_study_ar.html at root. Port: 8000

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=UTF-8',
};

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end('Error loading file');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/' || urlPath === '') {
    urlPath = '/feasibility_study_ar.html';
  }
  const safePath = path.normalize(urlPath).replace(/^\/+/, '');
  const filePath = path.join(root, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.access(indexPath, fs.constants.R_OK, (accErr) => {
        if (accErr) {
          res.writeHead(403);
          res.end('Forbidden');
        } else {
          serveFile(indexPath, res);
        }
      });
    } else {
      serveFile(filePath, res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}/`);
});
