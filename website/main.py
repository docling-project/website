from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pyjsx import auto_setup  # type: ignore

from website.pages.blog import Blog, BlogPost  # type: ignore
from website.pages.home import Home  # type: ignore


auto_setup

app = FastAPI(
    title="Docling Website",
    description="Docling website",
    version="1.0.0",
)


# Home page.
@app.get("/", response_class=HTMLResponse)
async def get_home():
    return str(Home())


# Blog page.
@app.get("/blog/", response_class=HTMLResponse)
async def get_blog():
    return str(Blog())


# Blog post.
@app.get("/blog/{id}/", response_class=HTMLResponse)
async def get_blog_post(id: str):
    return str(BlogPost(id))


# Serve static files. Redundant w.r.t. Vercel file serving, but useful for local development.
try:
    app.mount("/blog", StaticFiles(directory="blog", html=True), name="blog")
    app.mount("/", StaticFiles(directory="public", html=True), name="public")
except Exception as ex:
    print("Unable to serve local files:", ex)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
