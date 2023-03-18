import { TestBed } from '@angular/core/testing';

import { WeatherHandlerService } from './weather-handler.service';

describe('WeatherHandlerService', () => {
  let service: WeatherHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
