import { TestBed } from '@angular/core/testing';

import { TurnServiceService } from './turn-service.service';

describe('TurnServiceService', () => {
  let service: TurnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
