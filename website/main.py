from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pyjsx import auto_setup  # type: ignore

from website.pages.home import Home  # type: ignore


auto_setup


app = FastAPI(
    title="Docling Website",
    description="Docling website",
    version="1.0.0",
)


@app.get("/", response_class=HTMLResponse)
async def get_home():
    return str(Home())


# Serve public files. Redundant w.r.t. Vercel file serving, but useful for local development.
app.mount("/", StaticFiles(directory="public", html=True), name="public")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)

