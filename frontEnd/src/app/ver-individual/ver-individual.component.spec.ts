import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIndividualComponent } from './ver-individual.component';

describe('VerIndividualComponent', () => {
  let component: VerIndividualComponent;
  let fixture: ComponentFixture<VerIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
