import { TestBed } from '@angular/core/testing';

import { StoreSerService } from './store-ser.service';

describe('StoreSerService', () => {
  let service: StoreSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
