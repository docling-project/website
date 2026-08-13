from fastapi import FastAPI
from fastapi.responses import HTMLResponse, PlainTextResponse, Response
from fastapi.staticfiles import StaticFiles
from pyjsx import auto_setup  # type: ignore

from website.models.blog import BlogFilter
from website.models.papers import PublicationCategory
from website.pages.benchmarks import BenchmarksPage  # type: ignore
from website.pages.blog import BlogPage, BlogPostPage  # type: ignore
from website.pages.components import ComingSoonPage, CommunityPage  # type: ignore
from website.pages.deployments import DeploymentsPage  # type: ignore
from website.pages.ecosystem import EcosystemPage  # type: ignore
from website.pages.formats import FormatsPage  # type: ignore
from website.pages.home import HomePage  # type: ignore
from website.pages.papers import PapersPage  # type: ignore
from website.pages.use_cases import UseCasesPage  # type: ignore
from website.seo import robots_txt, sitemap_xml


auto_setup

app = FastAPI(
    title="Docling Website",
    description="Docling website",
    version="1.0.0",
)


@app.get("/", response_class=HTMLResponse)
async def get_home():
    return str(HomePage())


@app.get("/use-cases/", response_class=HTMLResponse)
async def get_use_cases():
    return str(UseCasesPage())


@app.get("/deployments/", response_class=HTMLResponse)
async def get_deployments():
    return str(DeploymentsPage())


@app.get("/benchmarks/", response_class=HTMLResponse)
async def get_benchmarks():
    return str(BenchmarksPage())


@app.get("/ecosystem/", response_class=HTMLResponse)
async def get_ecosystem():
    return str(EcosystemPage())


@app.get("/formats/", response_class=HTMLResponse)
async def get_formats():
    return str(FormatsPage())


@app.get("/blog/", response_class=HTMLResponse)
async def get_blog(filter: BlogFilter = BlogFilter.ALL):
    return str(BlogPage(filter=filter))


@app.get("/blog/{id}/", response_class=HTMLResponse)
async def get_blog_post(id: str):
    return str(BlogPostPage(id=id))


@app.get("/papers/", response_class=HTMLResponse)
async def get_papers(filter: PublicationCategory = PublicationCategory.ALL):
    return str(PapersPage(filter=filter))


@app.get("/community/", response_class=HTMLResponse)
async def get_community():
    return str(CommunityPage())


@app.get("/faq/", response_class=HTMLResponse)
async def get_faq():
    return str(ComingSoonPage("FAQ", path="/faq/"))


@app.get("/releases/", response_class=HTMLResponse)
async def get_releases():
    return str(ComingSoonPage("Releases", path="/releases/"))


@app.get("/sitemap.xml")
async def get_sitemap():
    return Response(content=sitemap_xml(), media_type="application/xml")


@app.get("/robots.txt", response_class=PlainTextResponse)
async def get_robots():
    return robots_txt()


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
