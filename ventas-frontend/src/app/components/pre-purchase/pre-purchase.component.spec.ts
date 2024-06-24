import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePurchaseComponent } from './pre-purchase.component';

describe('PrePurchaseComponent', () => {
  let component: PrePurchaseComponent;
  let fixture: ComponentFixture<PrePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrePurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
