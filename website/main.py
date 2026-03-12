from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pyjsx import auto_setup  # type: ignore

from website.models.blog import BlogFilter
from website.models.papers import PaperType
from website.pages.blog import BlogPage, BlogPostPage  # type: ignore
from website.pages.components import ComingSoonPage  # type: ignore
from website.pages.home import HomePage  # type: ignore
from website.pages.papers import PapersPage  # type: ignore


auto_setup

app = FastAPI(
    title="Docling Website",
    description="Docling website",
    version="1.0.0",
)


# Home page.
@app.get("/", response_class=HTMLResponse)
async def get_home():
    return str(HomePage())


# Blog page.
@app.get("/blog/", response_class=HTMLResponse)
async def get_blog(filter: BlogFilter = BlogFilter.ALL):
    return str(BlogPage(filter=filter))


# Blog post.
@app.get("/blog/{id}/", response_class=HTMLResponse)
async def get_blog_post(id: str):
    return str(BlogPostPage(id=id))


# Papers.
@app.get("/papers/", response_class=HTMLResponse)
async def get_papers(filter: PaperType = PaperType.ALL):
    return str(PapersPage(filter=filter))


# FAQ page (stub).
@app.get("/faq/", response_class=HTMLResponse)
async def get_faq():
    return str(ComingSoonPage("FAQ"))


# Releases page (stub).
@app.get("/releases/", response_class=HTMLResponse)
async def get_releases():
    return str(ComingSoonPage("Releases"))


# Serve static files. Redundant w.r.t. Vercel file serving, but useful for local development.
try:
    app.mount("/papers", StaticFiles(directory="papers", html=True), name="papers")
    app.mount("/blog", StaticFiles(directory="blog", html=True), name="blog")
    app.mount("/", StaticFiles(directory="public", html=True), name="public")
except Exception as ex:
    print("Unable to serve local files:", ex)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
