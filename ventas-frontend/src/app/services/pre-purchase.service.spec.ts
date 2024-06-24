import { TestBed } from '@angular/core/testing';

import { PrePurchaseService } from './pre-purchase.service';

describe('PrePurchaseService', () => {
  let service: PrePurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrePurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
