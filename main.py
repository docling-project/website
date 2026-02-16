from fastapi import FastAPI


app = FastAPI(
    title="Docling Website",
    description="Docling website",
    version="1.0.0",
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
