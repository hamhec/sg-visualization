import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgNgxComponent } from './sg-ngx.component';

describe('SgNgxComponent', () => {
  let component: SgNgxComponent;
  let fixture: ComponentFixture<SgNgxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgNgxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgNgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
