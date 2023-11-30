from fastapi import FastAPI
from databases import Database

app = FastAPI()

DATABASE_URL = "postgresql://postgres:kafka@db:5432/kafka_tracking"
database = Database(DATABASE_URL)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/ping")
async def ping():
    return {"message": "pong"}


@app.get("/coordonnees")
async def get_coords():
    query = "SELECT * FROM coordonnees"
    return await database.fetch_all(query)
