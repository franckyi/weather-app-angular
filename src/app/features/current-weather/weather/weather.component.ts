import { Component, OnInit } from '@angular/core';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';
import { CurrentWeatherResponse } from 'src/app/features/current-weather/weather-response';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  // current: CurrentWeatherResponse | undefined;

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit() {
    this.getCoords ()
  }

  current = this._weatherHandlerService.current;
  iconUrl = this._weatherHandlerService.iconUrl;
  description = this._weatherHandlerService.description;

  getCoords () {
    console.warn('called getCoords()')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this._weatherHandlerService.getWeatherByCoords(lat, lon)
        .subscribe(
          (response) => {                           //next() callback
            console.warn('✅ response received');
            this._weatherHandlerService.populateData(response);
          }
        )
      })
    }

  }




}
