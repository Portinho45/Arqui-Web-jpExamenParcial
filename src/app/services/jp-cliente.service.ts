import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Subject } from 'rxjs';
import { jpCliente } from '../models/jpCliente';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class jpClienteService {
  private url=`${base_url}/jpCliente`
  private confirmarEliminacion = new Subject<Boolean>()
  private listaCambio = new Subject<jpCliente[]>()
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<jpCliente[]>(this.url);
  }
  insert(dtartist: jpCliente) {
    return this.http.post(this.url, jpCliente);
  }

  setList(listaNueva: jpCliente[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<jpCliente>(`${this.url}/${id}`);
  }

  update(jpCliente: jpCliente) {
    return this.http.put(this.url + "/" + jpCliente.id, jpCliente);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  getConfirmDelete() {
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado: Boolean) {
    this.confirmarEliminacion.next(estado);
  }
}
