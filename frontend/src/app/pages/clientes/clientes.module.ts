import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule} from './clientes-routing.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogMapaModule } from 'src/app/components/dialog-mapa/dialog-mapa.module';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { DialogConfirmacaoModule } from 'src/app/components/dialog-confirmacao/dialog-confirmacao.module';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    HeaderModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    DialogMapaModule,
    DialogConfirmacaoModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ClientesModule { }
