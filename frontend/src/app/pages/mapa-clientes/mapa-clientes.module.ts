import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaClientesComponent } from './mapa-clientes.component';
import { MapaClientesRoutingModule } from './mapa-clientes-routing.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MapaClientesComponent
  ],
  imports: [
    CommonModule,
    MapaClientesRoutingModule,
    HeaderModule,
    GoogleMapsModule,
    FormsModule
  ]
})
export class MapaClientesModule { }
