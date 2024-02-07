import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMap } from './world-map.component';

describe('SvgMap', () => {
  let component: SvgMap;
  let fixture: ComponentFixture<SvgMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgMap]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
