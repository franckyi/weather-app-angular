import { Component, OnInit, Input } from '@angular/core';
import { CurrentWeatherResponse } from '../weather-response';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';
// import { WeatherComponent } from '../weather/weather.component';
// import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // @Input() _weatherComponent!: WeatherComponent;

  results: any | undefined;
  // remoteWeatherData: CurrentWeatherResponse | undefined;

  constructor(
    private _weatherHandlerService: WeatherHandlerService
    // private _weatherComponent: WeatherComponent
  ) { }

  ngOnInit(): void {
  }

  passQuery(query: String) {
    console.log(query);
    this._weatherHandlerService.getWeatherByQuery(query)
    .subscribe(
      (response) => {
        console.log('✅ response received', response)
        this.results = response;
      }
      );

    }

    passSelected(i: any) {
      console.log('lat', this.results[i].lat)
      console.log('lon', this.results[i].lon)
      this._weatherHandlerService.getWeatherByCoords(this.results[i].lat, this.results[i].lon)
      .subscribe(
        (response) => {
          console.log('✅ new response received', response);

          // this.remoteWeatherData = response;
          this._weatherHandlerService.populateData(response);
        }
      );
    }

}

