import { Component, OnInit } from '@angular/core';
import { SearchResponse } from './search-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getRemoteWeather(query: String) {
    console.log(query)
    // https://api.openweathermap.org/geo/1.0/direct?q=${text.value}&limit=5&appid=${core.API_KEY}
  }

}

