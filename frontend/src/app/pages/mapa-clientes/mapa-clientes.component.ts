import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes/clientes.service';

@Component({
  selector: 'app-mapa-clientes',
  templateUrl: './mapa-clientes.component.html',
  styleUrls: ['./mapa-clientes.component.css']
})
export class MapaClientesComponent implements OnInit {

  public center: google.maps.LatLngLiteral;
  public markers: any[] = [];

  public filtro: string = '';
  public totalElements = 0;

  constructor(private clientesService: ClientesService) {

  }

  ngOnInit(): void {
    this.center = {
      lat: -13.62121,
      lng: -51.51729
    };
    this.getClientes();
  }

  getClientes(filter?: string) {
    this.clientesService.findPage(0, filter, 1000).subscribe({
      next: (data) => {
        this.clearMarkers();
        this.totalElements = data.totalElements;
        const clientes = data.content.map(({enderecos: [{id: enderecoId, ...endereco}], id, ...resto} : any) => ({id, ...resto, ...endereco, enderecoId}));
        clientes.forEach((c: any) => this.addMarker(c));
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addMarker(cliente: any) {
    this.markers.push({
      position: {
        lat: cliente.latitude,
        lng: cliente.longitude
      },
      label: cliente.nome,
      title: cliente.nome
    });
  }

  clearMarkers() {
    this.markers = [];
  }

  buscarClick() {
    this.getClientes(this.filtro);
  }

  limparFiltroClick() {
    this.filtro = '';
    this.getClientes();
  }

  onFiltroChange(filtro: string) {
    if (this.isBlank(filtro)) {
      this.getClientes();
    }
  }

  isBlank(str: string) {
    return !str || str.trim().length === 0;
  }

}
