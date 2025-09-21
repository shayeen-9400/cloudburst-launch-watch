import numpy as np
from datetime import datetime, timedelta
from typing import Dict
from nanoid import generate
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
from sklearn.ensemble import RandomForestClassifier
from PIL import Image
import os

from config import INFLUXDB_URL, INFLUXDB_TOKEN, INFLUXDB_ORG, INFLUXDB_BUCKET, LOCATION

influx_client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
query_api = influx_client.query_api()
write_api = influx_client.write_api(write_options=SYNCHRONOUS)

def load_ml_model():
    """Simulates loading a trained ML model."""
    print("Loading simulated ML model...")
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    X = np.random.rand(10, 5)
    y = np.random.randint(0, 3, 10)
    model.fit(X, y)
    print("Simulated ML model loaded successfully.")
    return model

ml_model = load_ml_model()

def get_latest_ingested_data() -> Dict:
    """
    Queries InfluxDB for the latest weather and cloud density data.
    """
    query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "weather_metrics")
      |> last()
    """
    try:
        tables = query_api.query(query, org=INFLUXDB_ORG)
        if not tables:
            print("No data found in InfluxDB for analysis.")
            return {}
            
        data = {}
        for record in tables[0].records:
            data[record.get_field()] = record.get_value()
            
        return data
    except Exception as e:
        print(f"Error querying InfluxDB: {e}")
        return {}

def simulate_image_processing(cloud_density: float) -> np.ndarray:
    """
    Simulates processing a satellite image and extracting features.
    """
    image_size = (100, 100)
    image_data = np.random.rand(*image_size) * 255
    feature_vector = np.random.rand(1, 5)
    return feature_vector

def store_detection_result(detection: 'DetectionOutput'):
    """
    Stores the cloudburst detection result in InfluxDB.
    """
    try:
        point = (
            Point("cloudburst_detections")
            .tag("location", LOCATION["name"])
            .tag("severity", detection.severity)
            .tag("movement_direction", detection.movement_direction)
            .field("intensity", detection.intensity)
            .field("coordinates_lon", detection.coordinates[0])
            .field("coordinates_lat", detection.coordinates[1])
            .time(detection.timestamp)
        )
        write_api.write(bucket=INFLUXDB_BUCKET, record=point)
        print(f"Detection result stored successfully at {detection.timestamp}")
    except Exception as e:
        print(f"Error storing detection result: {e}")

def run_detection_engine():
    """
    The main function for the cloudburst detection pipeline.
    """
    print(f"[{datetime.now()}] Starting cloudburst detection engine...")
    ingested_data = get_latest_ingested_data()
    
    if not ingested_data:
        print("No recent data to analyze. Detection engine skipped.")
        return

    cloud_density = ingested_data.get("cloud_density", 0)
    feature_vector = simulate_image_processing(cloud_density)
    prediction = ml_model.predict(feature_vector)[0]

    severity_map = {0: "Low", 1: "Medium", 2: "High"}
    severity = severity_map.get(prediction, "Low")
    intensity = float(np.random.rand() * 100)

    detection_coordinates = [
        LOCATION["lon"] + (np.random.rand() - 0.5) * 0.1,
        LOCATION["lat"] + (np.random.rand() - 0.5) * 0.1,
    ]
    direction_map = ["North", "South", "East", "West", "North-East", "South-West"]
    movement = np.random.choice(direction_map)
    
    from .models import DetectionOutput # Import here to avoid circular dependency
    detection_result = DetectionOutput(
        event_id=generate(),
        timestamp=datetime.utcnow(),
        severity=severity,
        coordinates=detection_coordinates,
        movement_direction=movement,
        intensity=intensity
    )

    print(f"[{datetime.now()}] Cloudburst Detection Result:")
    print(detection_result.model_dump_json(indent=2))

    store_detection_result(detection_result)
    print(f"[{datetime.now()}] Detection engine complete.")