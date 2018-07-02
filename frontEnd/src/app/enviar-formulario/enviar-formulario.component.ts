import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Individual } from '../modelo/individual.model';
import { Artista } from '../modelo/artista.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-enviar-formulario',
  templateUrl: './enviar-formulario.component.html',
  styleUrls: ['./enviar-formulario.component.css']
})
export class EnviarFormularioComponent implements OnInit {

  artista: Individual = new Individual();
  colectivo: Artista = new Artista();
  private base64Foto: String = "";
  id: any;
  enviado:boolean;
  mensaje:string;
  id_dpto:any;
  tipo: any;

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
      alert(this.tipo);
    if(this.tipo == "ind"){
      this.formularioService.getIndividual(this.id)
      .subscribe(data => {
        this.artista = data;
        this.base64Foto = this.artista.d_foto;
        this.id_dpto =  this.artista.id_dpto;
        if (this.artista.id_estado == "ENVIADO"){
          this.showMsg = true;  
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
        }
        
      })

    }
    
    })
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
            
            //alert("Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION");
            //let link = ['home/listado-artistas/'];
            //this.router.navigate(link);
            /*alert("Para Validar su registro tiene 10 días calendario para apersonarse por oficinas de la Unidad de Coordinación de Consejos Departamentales de Cultura – UCCDC, dependiente de la Dirección General de Planificación – DGP del Ministerio de Culturas y Turismo, para presentar su documentación en fotocopias y originales, para respaldo de la actualización de su registro. "+
            "Dirección – UCCDC: Calle Potosí, casi Esq. Loayza, Edificio Aguirre 5to. Piso."+
            "Teléfonos: 2200910-2200946 – Interno: 1502 (UCCDC");*/
        console.log(response.data)
        //this.artista.numero_registro = response.data;
  
        switch (this.id_dpto) {
          case 1:
            this.mensaje = "Chuquisaca"
            alert(this.mensaje);
            break;
          case 2:
            this.mensaje = "La Paz"
            break;
          case 3:
            this.mensaje = "Cochabamaba"
            break;
          case 4:
            this.mensaje = "Oruro"
            break;
          case 5:
            this.mensaje = "Potosi"
            break;
          case 6:
            this.mensaje = "Tarija"
            break;
          case 7:
            this.mensaje = "Santa Cruz"
            break;
          case 8:
            this.mensaje = "Beni"
            break;
          case 9:
            this.mensaje = "Pando"
            break;
        }
        this.enviado = true;
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

  cancel() {
    let link = ['home/listado-artistas/'];
    this.router.navigate(link);
  }




  

}
