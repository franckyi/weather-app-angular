export interface CurrentWeatherResponse {
  "coord": {
    "lon": Number,
    "lat": Number
  },
  "weather": [
    {
      "description": String,
      "icon": String
    }
  ],
  "main": {
    "temp": Number,
    "feels_like": Number,
    "temp_min": Number,
    "temp_max": Number,
    "pressure": Number,
    "humidity": Number
  },
  "visibility": Number,
  "wind": {
    "speed": Number,
    "deg": Number
  },
  "clouds": {
    "all": Number
  },
  "dt": Number,
  "sys": {
    "country": String,
    "sunrise": Number,
    "sunset": Number
  },
  "timezone": Number,
  "name": String,
}
