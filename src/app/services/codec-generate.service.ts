import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodecGenerateService {

  constructor() { }

  codecGenerate(ncode) {
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ012346789";
    var contrasenia = "";
    for (let i=0; i<=ncode; i++) {
      contrasenia +=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    } 
    console.log(contrasenia)
    return contrasenia
  }

}
