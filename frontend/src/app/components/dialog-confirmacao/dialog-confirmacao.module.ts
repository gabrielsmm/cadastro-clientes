import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmacaoComponent } from './dialog-confirmacao.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    DialogConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    DialogConfirmacaoComponent
  ]
})
export class DialogConfirmacaoModule { }
