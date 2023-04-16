import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mapa',
  templateUrl: './dialog-mapa.component.html',
  styleUrls: ['./dialog-mapa.component.css']
})
export class DialogMapaComponent implements OnInit {

  public center: google.maps.LatLngLiteral;
  public marker = {
    position: {
      lat: 0,
      lng: 0
    },
    label: '' ,
    title: ''
  }

  constructor(public dialogRef: MatDialogRef<DialogMapaComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.center = {
      lat: this.data.latitude,
      lng: this.data.longitude
    };
    this.marker.position = {
      lat: this.data.latitude,
      lng: this.data.longitude
    };
    this.marker.label = this.data.nome;
    this.marker.title = this.data.nome;
  }

}
