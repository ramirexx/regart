import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarFormularioComponent } from './enviar-formulario.component';

describe('EnviarFormularioComponent', () => {
  let component: EnviarFormularioComponent;
  let fixture: ComponentFixture<EnviarFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
