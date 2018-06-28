import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoColectivoComponent } from './listado-colectivo.component';

describe('ListadoColectivoComponent', () => {
  let component: ListadoColectivoComponent;
  let fixture: ComponentFixture<ListadoColectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoColectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoColectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
