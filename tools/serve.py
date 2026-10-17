"""
Local preview server for the site, with caching turned off so edits show up on reload.

    python tools/serve.py          # then open http://localhost:5173
"""
import http.server
import sys
from functools import partial
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
SITE = Path(__file__).resolve().parent.parent / "site"


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_error(self, code, message=None, explain=None):
        # serve site/404.html for missing pages, like Netlify, Vercel and GitHub Pages do
        page = SITE / "404.html"
        if code == 404 and page.exists():
            body = page.read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)


# threaded, so an idle pre-connected browser socket can't block other requests
http.server.ThreadingHTTPServer.allow_reuse_address = True
with http.server.ThreadingHTTPServer(("", PORT), partial(NoCache, directory=str(SITE))) as httpd:
    print(f"Serving {SITE} at http://localhost:{PORT}", flush=True)
    httpd.serve_forever()
