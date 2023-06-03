import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMapaComponent } from 'src/app/components/dialog-mapa/dialog-mapa.component';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente.model';
import { DialogConfirmacaoComponent } from 'src/app/components/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];

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
        this.clientes = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  verEnderecoClick(cliente: Cliente) {
    this.dialog.open(DialogMapaComponent, {
      height: '450px',
      width: '600px',
      data: cliente
    });
  }

  editarClick(cliente: Cliente) {
    this.router.navigate(['/cadastro', { id: cliente.id}]);
  }

  excluirClick(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      minWidth: '200px',
      data: {texto: `Confirma exclusão do cliente ${cliente.nome}?`}
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.clientesService.delete(cliente.id).subscribe({
          next: (data) => {
            this.getClientes(this.page, this.filtro);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
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
