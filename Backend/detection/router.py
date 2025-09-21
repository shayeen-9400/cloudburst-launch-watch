from fastapi import APIRouter
from .services import run_detection_engine

router = APIRouter()

@router.get("/run_detection")
def trigger_detection():
    """Endpoint to manually trigger the detection engine."""
    run_detection_engine()
    return {"message": "Cloudburst detection engine triggered successfully."}