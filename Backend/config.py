import os
from dotenv import load_dotenv

load_dotenv()

# InfluxDB Configuration
INFLUXDB_URL = os.getenv("INFLUXDB_URL", "http://localhost:8086")
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_ORG = os.getenv("INFLUXDB_ORG", "your_org")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET", "cloudburst_data")

# API Keys
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

# Geographical Data (Example for a specific location)
LOCATION = {
    "lat": 19.0760,
    "lon": 72.8777,
    "name": "Mumbai"
}