from fastapi import FastAPI, WebSocket
from databases import Database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Connexion WebSocket établie")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Message reçu: {data}")
            await websocket.send_text(f"Écho: {data}")
            # Kafka ici
    except Exception as e:
        print(f"Erreur WebSocket: {e}")
    finally:
        await websocket.close()
        print("Connexion WebSocket fermée")
    return {"message": data}
