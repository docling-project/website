from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles


app = FastAPI(
    title="Docling Website",
    description="Docling website",
    version="1.0.0",
)

# Serve public files.
app.mount("/", StaticFiles(directory="public", html=True), name="public")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
