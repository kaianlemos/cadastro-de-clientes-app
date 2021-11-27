import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})

export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: Boolean = false;
  errors: String[];
  id: number;

  constructor(
    private servico: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params
      .subscribe(params => {
        if (params && params['id']) {
          this.servico
            .getClienteById(params['id'])
            .subscribe(
              response => this.cliente = response,
              errorResponse => this.cliente = new Cliente
            )
        }
      })
  }

  onSubmit() {
    if (this.id){
      this.servico
      .atualizar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {this.errors=['Erro ao atualizar cliente.']})
    }


    this.servico
      .salvar(this.cliente)
      .subscribe(resposta => {
        this.success = true
        this.errors = [];
        this.cliente = resposta;
      }, respostaErro => {
        this.errors = respostaErro.error.errors;
        this.success = false;
      })
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista'])
  }
}

