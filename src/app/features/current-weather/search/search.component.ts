import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from '../weather-response';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit(): void {
  }

  passQuery(query: String) {
    console.log(query);
    this._weatherHandlerService.getRemoteWeather(query)
    .subscribe(
      (response) => {                           //next() callback
        console.warn('✅ response received')
        console.log(response)
        // this.current = response;
        // console.log('current', this.current);
        // this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
        // this.description = this.current?.weather[0]?.description;

      }
    );

  }

}

