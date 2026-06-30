import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

os.chdir(DIRECTORY)

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print("=" * 50)
    print("  个人作品集网站 - 本地服务器已启动")
    print("=" * 50)
    print(f"\n  访问地址: http://localhost:{PORT}")
    print(f"  文件目录: {DIRECTORY}")
    print("\n  按 Ctrl+C 停止服务器")
    print("=" * 50 + "\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n服务器已停止")
