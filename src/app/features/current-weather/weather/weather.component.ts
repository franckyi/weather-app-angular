import { Component, OnInit } from '@angular/core';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';
import { CurrentWeatherResponse } from 'src/app/features/current-weather/weather-response';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  current: CurrentWeatherResponse | undefined;

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit(): void {
  }

  getCoords () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this._weatherHandlerService.getLocalWeather(lat, lon)
        .subscribe((data: CurrentWeatherResponse) => this.current = {
          lon: data.coord.lon,
          lat: data.coord.lat,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          visibility: data.visibility,
          speed: data.wind.speed,
          deg: data.wind.deg,
          all: data.clouds.all,
          dt: data.dt,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          name: data.name,
          // ...data
      });
      })
    }
  }

}
