import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeocodingApiService } from 'src/app/services/geocoding-api.service';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    GoogleMapsModule,
    MatTooltipModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    GeocodingApiService
  ]
})
export class CadastroModule { }
