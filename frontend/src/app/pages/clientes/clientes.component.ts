import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMapaComponent } from 'src/app/components/dialog-mapa/dialog-mapa.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: any[] = [];

  // filtro
  public filtro: string = '';

  // paginação
  public page = 0;
  public size = 5;
  public first: boolean;
  public last: boolean;
  public totalElements = 0;

  constructor(private clientesService: ClientesService,
              public dialog: MatDialog,
              public router: Router) {

  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(page?: number, filter?: string) {
    this.clientesService.findPage(page, filter).subscribe({
      next: (data) => {
        this.clientes = data.content.map(({enderecos: [{id: enderecoId, ...endereco}], id, ...resto} : any) => ({id, ...resto, ...endereco, enderecoId}));
        this.first = data.first;
        this.last = data.last;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  verEnderecoClick(cliente: any) {
    this.dialog.open(DialogMapaComponent, {
      height: '450px',
      width: '600px',
      data: cliente
    });
  }

  editarClick(cliente: any) {
    this.router.navigate(['/cadastro', { id: cliente.id}]);
  }

  excluirClick(cliente: any) {
    if (confirm(`Confirma exclusão do cliente ${cliente.nome}?`)) {
      this.clientesService.delete(cliente.id).subscribe({
        next: (data) => {
          this.getClientes(this.page, this.filtro);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  irPaginaAnterior() {
    this.page = --this.page;
    this.getClientes(this.page, this.filtro);
  }

  irPaginaPosterior() {
    this.page = ++this.page;
    this.getClientes(this.page, this.filtro);
  }

  buscarClick() {
    this.getClientes(0, this.filtro);
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
