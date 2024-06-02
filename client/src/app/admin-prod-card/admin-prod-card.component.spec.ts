import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdCardComponent } from './admin-prod-card.component';

describe('AdminProdCardComponent', () => {
  let component: AdminProdCardComponent;
  let fixture: ComponentFixture<AdminProdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProdCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
