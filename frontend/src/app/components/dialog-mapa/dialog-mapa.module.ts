import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMapaComponent } from './dialog-mapa.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    DialogMapaComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    GoogleMapsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    DialogMapaComponent
  ]
})
export class DialogMapaModule { }
