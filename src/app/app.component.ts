import { Component, OnInit, Input } from '@angular/core';
import { WeatherHandlerService } from 'src/app/features/service/weather-handler.service';
import { CurrentWeatherResponse } from 'src/app/features/current/weather-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  current: CurrentWeatherResponse | undefined;
  iconUrl: String | undefined;
  description: String | undefined;

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit() {
    console.warn('ngOnInit works!')
    this.getCoords ()
  }

  getCoords () {
    console.log('✅ called getCoords()')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log('✅ inside geolocation', lat, lon)
        this._weatherHandlerService.getWeatherByCoords(lat, lon)
        .subscribe(
          (response) => {
            console.log('✅ received response', response);
            this.current = response;
            console.log('current', this.current);
            this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
            this.description = this.current?.weather[0]?.description;
          }
        )
      })
    }

  }


}
