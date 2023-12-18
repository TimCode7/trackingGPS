from fastapi import FastAPI, WebSocket
from databases import Database
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import asyncpg
from fastapi.websockets import WebSocketState
import websockets

app = FastAPI()
active_websockets = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://postgres:kafka@db:5432/kafka_tracking"
database = Database(DATABASE_URL)


async def listen_to_pg_notifications():
    conn = await asyncpg.connect(DATABASE_URL)
    await conn.add_listener("gps_channel", notification_handler)
    try:
        while True:
            await asyncio.sleep(10)
    finally:
        await conn.close()


def notification_handler(connection, pid, channel, payload):
    asyncio.create_task(broadcast_to_websockets(payload))


async def broadcast_to_websockets(message):
    for websocket in active_websockets.copy():
        if not websocket.client_state == WebSocketState.DISCONNECTED:
            try:
                await websocket.send_text(message)
            except websockets.exceptions.ConnectionClosedOK:
                active_websockets.remove(websocket)
            except websockets.exceptions.ConnectionClosedError as e:
                # Gérer d'autres erreurs de fermeture
                active_websockets.remove(websocket)
                print(f"Erreur WebSocket: {e}")
        else:
            print("Pas connecté...")


@app.on_event("startup")
async def startup():
    await database.connect()
    asyncio.create_task(listen_to_pg_notifications())


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
    active_websockets.append(websocket)
    print("Websocket ajouté !")
    try:
        while True:
            await asyncio.sleep(1)
    except websockets.exceptions.ConnectionClosedOK:
        print("Connexion WebSocket fermée normalement")
    except Exception as e:
        print(f"Erreur WebSocket: {e}")
    finally:
        if websocket in active_websockets:
            active_websockets.remove(websocket)
        await websocket.close()
