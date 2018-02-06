import { TestBed, inject } from '@angular/core/testing';

import { MoviedbService } from './moviedb.service';

describe('MoviedbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviedbService]
    });
  });

  it('should be created', inject([MoviedbService], (service: MoviedbService) => {
    expect(service).toBeTruthy();
  }));
});
