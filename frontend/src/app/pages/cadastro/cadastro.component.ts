import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente.model';
import { GeocodingApiService } from 'src/app/services/geocoding-api.service';
import { ValidaCepService } from 'src/app/services/valida-cep.service';
import { CadastroService } from './cadastro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public showErro: boolean = false;
  public showSucesso: boolean = false;
  public showMap: boolean = false;
  public msgErro: string = '';
  public titulo: string = 'Cadastro de clientes';

  public clienteId: number;
  public isEditar: boolean = false;

  public center: google.maps.LatLngLiteral;
  public marker = {
    position: {
      lat: 0,
      lng: 0
    },
    label: '' ,
    title: ''
  }

  public cadastroForm = new FormGroup({
    nome: new FormControl(this.cliente.nome, [Validators.required]),
    cnpj: new FormControl(this.cliente.cnpj, [Validators.required]),
    estado: new FormControl(this.cliente.estado, [Validators.required]),
    cidade: new FormControl(this.cliente.cidade, [Validators.required]),
    bairro: new FormControl(this.cliente.bairro, [Validators.required]),
    logradouro: new FormControl(this.cliente.logradouro, [Validators.required]),
    complemento: new FormControl(this.cliente.complemento),
    cep: new FormControl(this.cliente.cep, [Validators.required])
  });

  constructor(private geocodingApiService: GeocodingApiService,
              private cadastroService: CadastroService,
              private validaCepService: ValidaCepService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.verificarEdicao();
    this.cadastroForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (this.cadastroForm.valid) this.atualizarMapa();
    });
  }

  verificarEdicao() {
    const clienteId = this.route.snapshot.paramMap.get('id');
    if (clienteId) {
      this.cadastroService.find(clienteId).subscribe({
        next: (data: any) => {
          this.isEditar = true;
          this.titulo = `Editar cliente ${data.nome}`;
          this.clienteId = data.id;
          this.cadastroForm.get('nome')?.setValue(data.nome);
          this.cadastroForm.get('cnpj')?.setValue(data.cnpj);
          this.cadastroForm.get('estado')?.setValue(data.estado);
          this.cadastroForm.get('cidade')?.setValue(data.cidade);
          this.cadastroForm.get('bairro')?.setValue(data.bairro);
          this.cadastroForm.get('logradouro')?.setValue(data.logradouro);
          this.cadastroForm.get('complemento')?.setValue(data.complemento);
          this.cadastroForm.get('cep')?.setValue(data.cep);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onSubmit() {
    this.cliente = new Cliente(this.cadastroForm.value);
    this.cliente.latitude = this.center.lat;
    this.cliente.longitude = this.center.lng;
    if (this.isEditar) {
      this.cliente.id = this.clienteId;
      this.editar(this.cliente);
    } else {
      this.inserir(this.cliente);
    }
  }

  inserir(cliente: Cliente) {
    this.cadastroService.create(cliente).subscribe({
      next: (data) => {
        this.cadastroForm.reset();
        this.showErro = false;
        this.showSucesso = true;
        setTimeout(() => {
          this.router.navigate(['/clientes']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        if (err.error.errors) {
          this.msgErro = err.error.errors[0].message;
          this.showErro = true;
        } else if (err.error) {
          this.msgErro = err.error.message;
          this.showErro = true;
        }
      }
    });
  }

  editar(cliente: Cliente) {
    this.cadastroService.update(cliente).subscribe({
      next: (data) => {
        this.cadastroForm.reset();
        this.showErro = false;
        this.showSucesso = true;
        setTimeout(() => {
          this.router.navigate(['/clientes']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        if (err.error.errors) {
          this.msgErro = err.error.errors[0].message;
          this.showErro = true;
        } else if (err.error) {
          this.msgErro = err.error.message;
          this.showErro = true;
        }
      }
    });
  }

  validarCep(event: any) {
    const cep = event.target.value.replace('-', '');
    if (cep.length === 8) {
      this.validaCepService.validarCep(cep).subscribe({
        next: (data) => {
          if (data.erro) {
            this.msgErro = 'CEP inválido';
            this.showErro = true;
            this.cadastroForm.get('estado')?.setValue('');
            this.cadastroForm.get('cidade')?.setValue('');
            this.cadastroForm.get('bairro')?.setValue('');
            this.cadastroForm.get('logradouro')?.setValue('');
            this.cadastroForm.get('complemento')?.setValue('');
          } else {
            this.showErro = false;
            this.cadastroForm.get('estado')?.setValue(data.uf);
            this.cadastroForm.get('cidade')?.setValue(data.localidade);
            this.cadastroForm.get('bairro')?.setValue(data.bairro);
            this.cadastroForm.get('logradouro')?.setValue(data.logradouro);
            this.cadastroForm.get('complemento')?.setValue(data.complemento);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  atualizarMapa() {
    const cliente = new Cliente(this.cadastroForm.value);
    this.geocodingApiService
    .findFromAddress(cliente.estado, cliente.cidade, cliente.bairro, cliente.logradouro, cliente.complemento, cliente.cep)
    .subscribe(response => {
      if (response.status == 'OK') {
        this.center = {
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
        };
        this.marker.position = {
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
        };
        this.marker.label = cliente.nome;
        this.marker.title = cliente.nome;
        this.showMap = true;
      } else if (response.status == 'ZERO_RESULTS') {
        console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        this.showMap = false;
      } else {
        console.log('geocodingAPIService', 'Other error', response.status);
        this.showMap = false;
      }
    });
  }

}