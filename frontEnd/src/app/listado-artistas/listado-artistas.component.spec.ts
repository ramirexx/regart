import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArtistasComponent } from './listado-artistas.component';

describe('ListadoArtistasComponent', () => {
  let component: ListadoArtistasComponent;
  let fixture: ComponentFixture<ListadoArtistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoArtistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
