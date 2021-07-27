import { Component, OnInit } from '@angular/core';
import { CodecGenerateService } from '../services/codec-generate.service';
import Swal from 'sweetalert2'
import { ControlworksService } from '../services/controlworks.service';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  public _IMGE;
  public _nombres;
  public usermail;
  public fechInit;
  public Trab_estate;
  public Trab_pass;
  public Trab_codecs;
  public TrabObserver;
  public Trab_Cargo;

  constructor( private cGen: CodecGenerateService,
               private controlworks: ControlworksService ) { }

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


  public arrWorkers: any = [];
  public upload;
  public uploadTotal;
  public porcentUploadTotal;

  saveWorkers() {

    this.arrWorkers = {
      user_mail:this.usermail,
	    foto_worker:this._IMGE,
      fecha_ing: this.fechInit,
      estado:'',
      nombres:this._nombres,
      observacion:'',
      insignia:0.00,
      codec_trabajos:'',
      userpass: this.Trab_pass,
      codec_worker: this.Trab_codecs,
      cargo : this.Trab_Cargo
    }

    console.log(this.arrWorkers);

    this.controlworks.postTrabajadores( this.arrWorkers ).subscribe ( trab => {

      if( trab.type == HttpEventType.UploadProgress ) {

        this.upload = trab.loaded / 1000000;
        this.uploadTotal = trab.total / 1000000; //total bytes to upload
        this.porcentUploadTotal = (this.upload / this.uploadTotal) * 100;
        console.log(this.porcentUploadTotal);

      }

      if (trab.type === HttpEventType.Response) {
        Swal.fire({
          icon: 'success',
          title: 'Bien..!',
          text: 'Trabajador creado con éxito'
        })

        this.controlworks.getTrabajadores().subscribe( y => {
          console.log(y);
        })

      }

    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops..!',
        html: '<span class="h5"> Algo ha salido mal, consulta con el departamento de sistemas'
                 +'<br>Razones del siguiente error: <ol style="text-align: left;"> '+
                 '<li> Correo de usuario o código de trabajdor repetidos. </li><li> Sin conexión a internet. </li>' +' </ol></span>'
      })
    } )

    // console.log(this.arrWorkers);


 }

}
