from fastapi import APIRouter
from .services import run_data_ingestion

router = APIRouter()

@router.get("/run_ingestion")
def trigger_ingestion():
    """Endpoint to manually trigger the data ingestion pipeline."""
    run_data_ingestion()
    return {"message": "Data ingestion triggered successfully."}