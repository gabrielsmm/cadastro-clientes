import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaClientesComponent } from './mapa-clientes.component';

const routes: Routes = [
    {path: '', component: MapaClientesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaClientesRoutingModule { }