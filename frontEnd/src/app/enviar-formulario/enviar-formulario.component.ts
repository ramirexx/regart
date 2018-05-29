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
              if (this. artista.id_estado == "ENVIADO"){
                this.showMsg = true;  
              }
              
            })
    })
  }


  public enviar(): void {
    let data = {
      "id":this.id
    }
      this.formularioService.updateEstadoIndividual(data).subscribe(response => {
        console.log(response);
        if (response.status == "Success") {
          alert("Se envio el Formulario:" + this.artista.numero_registro + " para su REVISION");
          //let link = ['home/listado-artistas/'];
          //this.router.navigate(link);
          this.showMsg = true;
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
