import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiBaseURL : string = environment.apiBaseURL + '/api/clientes'

  constructor(private http: HttpClient) {
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiBaseURL}`, cliente);
  }

  atualizar(cliente: Cliente) : Observable<any> {
    return this.http.post<Cliente>(`${this.apiBaseURL}/${cliente.id}`, cliente);
  }

  getClientes(): Observable<Cliente[]> {    
    return this.http.get<Cliente[]>(this.apiBaseURL);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiBaseURL}/${id}`)
  }

  deletar(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseURL}/${cliente.id}`)
  }
}

