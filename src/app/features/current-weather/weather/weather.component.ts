import { Component, OnInit, Input } from '@angular/core';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';
import { CurrentWeatherResponse } from 'src/app/features/current-weather/weather-response';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  current: CurrentWeatherResponse | undefined;
  iconUrl: String | undefined;
  description: String | undefined;
  // @Input

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit() {
    this.getCoords ()
  }

  getCoords () {
    console.warn('called getCoords()')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this._weatherHandlerService.getWeatherByCoords(lat, lon)
        .subscribe(
          (response) => {
            console.log('populated with this:', this.current);
            this.current = response;
            this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
            this.description = this.current?.weather[0]?.description;
            // this._weatherHandlerService.populateData(response);
          }
        )
      })
    }

  }




}
