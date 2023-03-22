import { Component, OnInit, Input } from '@angular/core';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';
import { CurrentWeatherResponse } from 'src/app/features/current-weather/weather-response';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  // @Input() remoteWeatherData!: CurrentWeatherResponse;
  current: CurrentWeatherResponse | undefined;
  iconUrl: String | undefined;
  description: String | undefined;

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit() {
    this.getCoords ()
  }

  replaceData(newData: CurrentWeatherResponse) {
    this._weatherHandlerService.getWeatherByCoords(newData.coord.lat, newData.coord.lon)
    .subscribe(
      (response) => {                           //next() callback
        console.warn('✅ response received', response)
        this.current = response;
        this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
        this.description = this.current?.weather[0]?.description;
      }
    )
  }

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
            this.populateData(response);
          }
        )
      })
    }

  }

  populateData(response: CurrentWeatherResponse) {
    this.current = response;
    console.log('current', this.current);
    this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
    this.description = this.current?.weather[0]?.description;
  }





}
