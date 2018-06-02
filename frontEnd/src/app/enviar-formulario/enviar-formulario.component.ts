import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Individual } from '../modelo/individual.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-enviar-formulario',
  templateUrl: './enviar-formulario.component.html',
  styleUrls: ['./enviar-formulario.component.css']
})
export class EnviarFormularioComponent implements OnInit {

  artista: Individual = new Individual();
  private base64Foto: String = "";
  id: any;

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

      this.formularioService.getIndividual(this.id)
            .subscribe(data => {
              this.artista = data;
              this.base64Foto = this.artista.d_foto;
              if (this.artista.id_estado == "ENVIADO"){
                this.showMsg = true;  
              }
              
            })
    })
  }


  public enviar(): void {
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
          alert("Para Validar su registro tiene 10 días calendario para apersonarse por oficinas de la Unidad de Coordinación de Consejos Departamentales de Cultura – UCCDC, dependiente de la Dirección General de Planificación – DGP del Ministerio de Culturas y Turismo, para presentar su documentación en fotocopias y originales, para respaldo de la actualización de su registro. "+
          "Dirección – UCCDC: Calle Potosí, casi Esq. Loayza, Edificio Aguirre 5to. Piso."+
          "Teléfonos: 2200910-2200946 – Interno: 1502 (UCCDC");
        
          //this.showMsg = true;
        } else {
          alert("No se pudo realizar la actualizacion!")
        }
      }, err => {
        alert("ERROR DE ACTUALIZACION " +err)
        console.log("error", err);
        //let link = ['home/listado-artistas/'];
        //this.router.navigate(link);
      });

  }

  cancel() {
    let link = ['home/listado-artistas/'];
    this.router.navigate(link);
  }




  

}
