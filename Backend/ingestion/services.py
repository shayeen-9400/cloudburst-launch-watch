import requests
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
from datetime import datetime
from config import INFLUXDB_URL, INFLUXDB_TOKEN, INFLUXDB_ORG, INFLUXDB_BUCKET, OPENWEATHER_API_KEY, LOCATION

# InfluxDB Client Setup
influx_client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
write_api = influx_client.write_api(write_options=SYNCHRONOUS)

def fetch_weather_data(lat: float, lon: float):
    """Fetches weather data (rainfall, humidity, pressure) from OpenWeatherMap."""
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        weather_data = {
            "temperature": data.get("main", {}).get("temp"),
            "humidity": data.get("main", {}).get("humidity"),
            "pressure": data.get("main", {}).get("pressure"),
            "rainfall_1h": data.get("rain", {}).get("1h", 0),
        }
        return weather_data
    except requests.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None

def fetch_satellite_data():
    """Simulates fetching satellite data (cloud density)."""
    cloud_density = requests.get("https://jsonplaceholder.typicode.com/posts/1", timeout=5).json()
    return {"cloud_density": len(str(cloud_density))}

def write_to_database(data: dict):
    """Writes a single data point to the InfluxDB time-series database."""
    try:
        point = (
            Point("weather_metrics")
            .tag("location", LOCATION["name"])
            .field("temperature", data.get("temperature", 0.0))
            .field("humidity", data.get("humidity", 0.0))
            .field("pressure", data.get("pressure", 0.0))
            .field("cloud_density", data.get("cloud_density", 0.0))
            .field("rainfall_1h", data.get("rainfall_1h", 0.0))
            .time(datetime.utcnow())
        )
        write_api.write(bucket=INFLUXDB_BUCKET, record=point)
        print(f"Successfully wrote data point at {datetime.now()}")
    except Exception as e:
        print(f"Error writing to InfluxDB: {e}")

def run_data_ingestion():
    """Orchestrates the data collection and storage pipeline."""
    print(f"[{datetime.now()}] Starting data ingestion...")
    weather_data = fetch_weather_data(LOCATION["lat"], LOCATION["lon"])
    satellite_data = fetch_satellite_data()
    
    if weather_data and satellite_data:
        combined_data = {**weather_data, **satellite_data}
        write_to_database(combined_data)
    else:
        print("Failed to fetch all data sources. Skipping write to database.")
    print(f"[{datetime.now()}] Data ingestion complete.")