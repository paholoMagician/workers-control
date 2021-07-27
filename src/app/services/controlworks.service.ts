import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ControlworksService {

  // MODO DESARROLLO
  private apiURL = 'http://localhost:5000/api';


  constructor(private http: HttpClient) { }


  //#region  TRABAJOS CONTROL
  // getTrabajo(opt) {
  //   return this.http.get( this.apiURL + '/trabajos/gettrabajo/' + opt );
  // }

  // postTrabajo(post) {
  //   return this.http.post( this.apiURL + '/trabajos/trabajossave/', post );
  // }

  // updateTrabajo(id, update) {
  //   return this.http.post( this.apiURL + '/trabajos/trabajosput/' + id, update );
  // }

  // deleteTrabajo(optdel) {
  //   return this.http.get( this.apiURL + '/trabajos/delTrabajo/' + optdel );
  // }
  //#endregion

  //#region TRABAJDORES CONTROL
  getTrabajadores() {
    return this.http.get( this.apiURL + '/workers/getTrabajadores/' );
  }

  postTrabajadores(post) {
    return this.http.post( this.apiURL + '/workers/save_worker', post, {observe: 'events', reportProgress: true} );
  }

  // updateTrabajadores(id, upd) {
  //   return this.http.put( this.apiURL + '/workers/puttransprod/' + id , upd );
  // }

  // deleteTrabajadores(opt) {
  //   return this.http.get( this.apiURL + '/workers/delWorkers/' + opt );
  // }

  //#endregion

}
