import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Individual } from '../modelo/individual.model';
import { Colectivo } from '../modelo/colectivo.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-enviar-formulario',
  templateUrl: './enviar-formulario.component.html',
  styleUrls: ['./enviar-formulario.component.css']
})
export class EnviarFormularioComponent implements OnInit {

  artista: Individual = new Individual();
  colectivo: Colectivo = new Colectivo();
  private base64Foto: String = "";
  id: any;
  enviado:boolean;
  mensaje:any;
  id_dpto:any;
  tipo: any;
  x: any;
  exp:string;
  depto:string;

  constructor(
    private formularioService: FormularioService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  showMsg: boolean;

  ngAfterContentInit() {
    console.log('-ngAfterViewInit');

    this.route.params.subscribe(params => {
      
      //console.log("REVISION :",params);
      this.id = params['id'];
      this.tipo = params['tipo'];
    if(this.tipo == "ind"){
      this.formularioService.getIndividual(this.id)
      .subscribe(data => {
        this.artista = data;
        this.base64Foto = this.artista.d_foto;
        this.id_dpto =  this.artista.id_dpto;
        if (this.artista.id_estado == "ENVIADO"){
          this.showMsg = true; 
          console.log("---->"+this.artista.id_dpto)
          this.mensaje = this.getMsg(this.artista.id_dpto);
        }
        
      })

    }else{
      this.formularioService.getFormColectivo(this.id)
      .subscribe(data => {
        this.colectivo = data;
        this.base64Foto = this.colectivo.d_logo_grupo;
        this.id_dpto =  this.colectivo.id_dpto;
        if (this.colectivo.estado == "ENVIADO"){
          this.showMsg = true; 
          this.mensaje = this.getMsg(this.artista.id_dpto);
        }
        
      })

    }
    
    })
  }
getMsg(x){
  switch (x) {
    
    case "1":
    console.log(x);
    this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION. Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
    "de la Secretaría de Culturas y Turismo del Gobierno Autónomo Departamental de Chuquisaca,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de ésta forma su registro."+
      "Lugar: Calle San Alberto Nº 413 (Ex Casa Capellanica)"
      break;
    case "2":
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION. Para Validar su registro tiene 10 días calendario para apersonarse por oficinas"+
      "de la Unidad de Coordinación de Consejos Departamentales de Cultura – UCCDC, dependiente"+
      "de la Dirección General de Planificación – DGP del Ministerio de Culturas y Turismo,"+ 
      "para presentar su documentación en fotocopias y originales, para respaldo de la actualización de su registro."+
      "Dirección – UCCDC: Calle Potosí, casi Esq. Loayza, Edificio Aguirre 5to. Piso. Teléfonos: 2200910-2200946 – Interno: 1502 (UCCDC)"
      break;
    case "3":
      this.mensaje = "e envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
      "de la Dirección de Cultura y Turismo del Gobierno Autónomo Departamental de Cochabamba,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de ésta forma su registro."+
      "Lugar: Calle Benjamín Blanco entre Calle Litoral y Av. Oquendo Sud (Parada a Chapare) a lado de la FELCC, laguna Alalay.)"
      break;
    case "4":
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
      "de la Secretaría de Cultura y Turismo del Gobierno Autónomo Departamental de Oruro,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de ésta forma su registro."+
      "Lugar: Plaza 10 de Febrero.)"
      //alert(this.mensaje);
      break;
    case "5":
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
      "de la Unidad de Cultura dependiente de la Dirección de Gestión Cultural y Patrimonio"+
      "del Gobierno Autónomo Departamental de Potosí, para presentar su documentación física"+
      "en fotocopias y originales, respaldando de ésta forma su registro. Lugar: Plaza Simón Bolívar, Edificio IV Centenario."
      //alert(this.mensaje);
      break;
    case "6":
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas de la"+
      "Dirección de Gestión Cultural y Patrimonio del Gobierno Autónomo Departamental de Tarija,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de esta forma su registro."+
      "Lugar: Calle Ingavi entre Sucre y Gral. Trigo (Teatro de la Cultura – Casa Dorada)."
      //alert(this.mensaje);
      break;
    case "7":
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
      "de la Unidad Regional San Cruz dependiente del Ministerio de Culturas y Turismo,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de ésta forma su registro."+
      "Lugar: Calle Murillo No. 119 entre las calles Bolívar y Arenales."
      //alert(this.mensaje);
      break;
    case 8:
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
      "de la Dirección Departamental de Educación y Cultura del Gobierno Autónomo Departamental de Beni,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de ésta forma su registro."+
      "Lugar: Museo Etno Arqueológico del Beni “Kenneth Lee”, Av. Ganadera, Cel.72810045."
      //alert(this.mensaje);
      break;
    case 9:
      this.mensaje = "Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION"+
      "Para Validar su registro tiene 10 días calendario, para apersonarse por oficinas"+
      "de la Dirección de Cultura y Turismo del Gobierno Autónomo Departamental de Pando,"+
      "para presentar su documentación física en fotocopias y originales, respaldando de ésta forma su registro."+
      "Lugar: Coliseo Ernesto Nishikawa Pardo, ubicado en la calle Tarija frente al SEDEGES."
      //alert(this.mensaje);
      break;
  } 

  return this.mensaje;
}


  public enviar(): void {
    if(this.tipo == "ind"){
      console.log("ENVIA INDIVIDUAL")
      let data = {
        id:this.id,
        cod:this.artista.numero_registro
      }
      console.log(data)
        this.formularioService.updateEstadoIndividual(data).subscribe(response => {
          console.log(response);
          if (response.status == "Success") {
            this.showMsg = true;
            //alert("Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION");
            //let link = ['home/listado-artistas/'];
            //this.router.navigate(link);
            /*alert("Para Validar su registro tiene 10 días calendario para apersonarse por oficinas de la Unidad de Coordinación de Consejos Departamentales de Cultura – UCCDC, dependiente de la Dirección General de Planificación – DGP del Ministerio de Culturas y Turismo, para presentar su documentación en fotocopias y originales, para respaldo de la actualización de su registro. "+
            "Dirección – UCCDC: Calle Potosí, casi Esq. Loayza, Edificio Aguirre 5to. Piso."+
            "Teléfonos: 2200910-2200946 – Interno: 1502 (UCCDC");*/
        console.log(response.data)
        this.artista.numero_registro = response.data
        this.artista.id_estado = "ENVIADO";
        //this.artista.numero_registro = response.data;
        console.log(this.artista.id_dpto)
        this.mensaje = this.getMsg(this.artista.id_dpto);
        this.enviado = true;
        this.showMsg = true; 
            //this.showMsg = true;
          } else {
            alert("No se pudo realizar la actualizacion!")
            this.enviado = false;
          }
        }, err => {
          alert("ERROR DE ACTUALIZACION " +err)
          console.log("error", err);
          //let link = ['home/listado-artistas/'];
          //this.router.navigate(link);
        });
    }else{
      console.log("ENVIA COLECTIVO")
    }
    

  }
  getExp(x){
    switch (x) {
      case "1":
        this.depto = "CH"
        break;
      case "2":
        this.depto = "LP"
        break;
      case "3":
        this.depto = "CBBA"
        break;
      case "4":
        this.depto = "OR"
        break;
      case "5":
        this.depto = "PT"
        break;
      case "6":
        this.depto = "TJA"
        break;
      case "7":
        this.depto = "SCZ"
        break;
      case "8":
        this.depto = "BN"
        break;
      case "9":
        this.depto = "PD"
        break;
        
    }
    console.log(this.depto)
    return this.depto;
  }


  cancel() {
    let link = ['home/listado-artistas/'];
    this.router.navigate(link);
  }




  

}
