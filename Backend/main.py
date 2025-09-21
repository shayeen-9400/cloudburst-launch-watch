import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta

from auth.router import router as auth_router
from ingestion.router import router as ingestion_router
from ingestion.services import run_data_ingestion
from detection.router import router as detection_router
from detection.services import run_detection_engine

app = FastAPI(
    title="Cloudburst Detection System",
    description="Backend for real-time cloudburst detection.",
)

# This list now includes the origins from previous errors to prevent CORS issues
origins = [
    "http://localhost:3000",
    "http://localhost:8082",
    "http://localhost:8080",
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(auth_router, prefix="/api", tags=["Authentication"])
app.include_router(ingestion_router, prefix="/ingestion", tags=["Data Ingestion"])
app.include_router(detection_router, prefix="/detection", tags=["Cloudburst Detection"])

# --- Scheduler for Data Ingestion & Detection ---
scheduler = BackgroundScheduler()

@app.on_event("startup")
async def startup_event():
    """Start the scheduler when the application starts."""
    # The order of jobs is important: ingest data first, then run detection
    scheduler.add_job(run_data_ingestion, 'interval', minutes=5, id='data_ingestion')
    # Schedule detection to run slightly after ingestion to ensure there's new data
    scheduler.add_job(run_detection_engine, 'interval', minutes=5, id='detection_engine', next_run_time=datetime.now() + timedelta(seconds=30))
    scheduler.start()
    print("Scheduler started. Data ingestion and detection will run every 5 minutes.")

@app.on_event("shutdown")
def shutdown_event():
    """Shut down the scheduler when the application closes."""
    scheduler.shutdown()
    print("Scheduler shut down.")

# This block is for running the app directly
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
