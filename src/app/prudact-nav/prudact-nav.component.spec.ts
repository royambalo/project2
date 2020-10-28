import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrudactNavComponent } from './prudact-nav.component';

describe('PrudactNavComponent', () => {
  let component: PrudactNavComponent;
  let fixture: ComponentFixture<PrudactNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrudactNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrudactNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
