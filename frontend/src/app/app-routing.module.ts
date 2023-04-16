import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'cadastro', loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroModule)},
  {path: 'clientes', loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)},
  {path: 'mapa-clientes', loadChildren: () => import('./pages/mapa-clientes/mapa-clientes.module').then(m => m.MapaClientesModule)},
  {path: '**', loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)},
  {path: '', redirectTo: 'clientes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
