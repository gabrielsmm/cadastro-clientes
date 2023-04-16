import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaClientesComponent } from './mapa-clientes.component';

describe('MapaClientesComponent', () => {
  let component: MapaClientesComponent;
  let fixture: ComponentFixture<MapaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
