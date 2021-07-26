import { Component, OnInit } from '@angular/core';
import { CodecGenerateService } from '../services/codec-generate.service';
import Swal from 'sweetalert2'
import { ControlworksService } from '../services/controlworks.service';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  public _IMGE;
  public _nombres;
  public _user_email;
  public _fecha_init;
  public Trab_estate;
  public Trab_pass;
  public Trab_codecs;
  public TrabObserver;
  public Trab_Cargo;

  constructor( private cGen: CodecGenerateService, private controlworks: ControlworksService ) { }

  ngOnInit() {
  }

  genCodec() {
    
    if( (this._nombres == undefined || this._nombres == '') &&
        (this.Trab_Cargo == undefined || this.Trab_Cargo == ''))
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Campos faltantes Nombres o el Cargo!',
        footer: 'El código de trabajador necesita un nombre de referencia y un cargo para ser generado'
      })
    }
    else {      
      this.Trab_codecs = (this._nombres.substr(0,2)).toUpperCase() +'-'+ this.cGen.codecGenerate(20)+'-'+(this.Trab_Cargo.substr(0,5)).toUpperCase();
      console.log(this.Trab_codecs.length);
    }

  }

  encodeImageFileAsURL() {

    const filesSelected = document.getElementById('fileUp') as HTMLInputElement;
    const fileId = filesSelected.files;
    let base;
    if (fileId.length > 0) {

      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        base = fileReader.result;
        document.getElementById('imgTest').style.backgroundImage = `url(${base})`;
      };

      fileReader.onloadend = () => {
        this._IMGE = fileReader.result;
        console.log(this._IMGE);
      };

      const a = fileReader.readAsDataURL(fileId[0]);

    }

  }
  // let arr = {
  //   nombre_trabajo      : "",
  //   descripcion_trabajo : "",
  //   fecha_init          : "",
  //   fecha_fin           : "",
  //   cliente_nombre      : "",
  //   codec_trabajadores  : this,
  //   estado_proyecto     : 0.00
  // }

  public arrWorkers: any = [];

  saveWorkers() {
    let a = <HTMLInputElement> document.getElementById('pass');
    let fech = <HTMLInputElement> document.getElementById('fechInit');
    console.log(fech.value);

    this.arrWorkers = {
      user_email:this._user_email,
	    foto_worker:this._IMGE,
      fecha_ing: fech.value.replace (/-/g, ''),
      estado:'',
      nombres:this._nombres,
      observacion:'',
      insignia:0.00,
      codec_trabajos:'',
      userpass: a.value,
      codec_worker: this.Trab_codecs,
      cargo : this.Trab_Cargo
    }

    console.log(this.arrWorkers);
    
    this.controlworks.postTrabajadores( this.arrWorkers ).subscribe ( trab => {

      console.log(trab);

      Swal.fire({
        icon: 'success',
        title: 'Bien..!',
        text: 'Trabajador creado con éxito'
      })

    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops..!',
        html: '<span class="note">Algo ha salido mal, consulta con el departamento de sistemas, o revisa tu conexión a internet</span>'
      })
    } )

    // console.log(this.arrWorkers);
    

 }

}
