import { Component, OnInit } from '@angular/core';
import { Individual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Artista } from '../modelo/artista.model';
import { DomSanitizer } from '@angular/platform-browser';
import { environment }     from '../../environments/environment';


@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  artista: Individual = new Individual();
  colectivo: Artista = new Artista();
  private base64Foto:String="";
  imagePath:string;
  qr: string = "";
  depto: string;
  tipo:any;
  id_dpto:any;

  constructor(private formularioService: FormularioService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      console.log("REVISION :", params);
      let id = params['id'];
      this.tipo = params['tipo'];
      if(this.tipo == "ind"){
        if (id != undefined) {
          console.log(id);
          this.formularioService.getFormIndividual(id)
            .subscribe(artista => {
              this.artista = artista;
              //this.imagePath = this.artista.d_foto;
              this.base64Foto = this.artista.d_foto;
              
              this.qr = "Pagina Web: "+ environment.urlApp+"regart/#/ver-artista/"+id;//this.artista.d_nombres + this.artista.d_apellidos 
              //this.depto = this.getDepto(this.artista.id_dpto);
  
              
            })
        }
      }else{
        if (id != undefined) {
          console.log(id);
          this.formularioService.getFormColectivo(id)
            .subscribe(artista => {
              this.colectivo = artista;
              this.base64Foto = this.colectivo.d_logo_grupo;
              //this.id_dpto =  this.colectivo.id_dpto;
              this.qr = "Pagina Web:"+ environment.urlApp+"regart/#/ver-artista/"+id;//this.artista.d_nombres + this.artista.d_apellidos 
              this.depto = this.getDepto(this.colectivo.id_dpto);
  
              
            })
        }
      }
      
    })
  }

  getDepto(x){
    switch (x) {
      case "1":
        this.depto = "Chuquisaca"
        break;
      case "2":
        this.depto = "La Paz"
        break;
      case "3":
        this.depto = "Cochabamaba"
        break;
      case "4":
        this.depto = "Oruro"
        break;
      case "5":
        this.depto = "Potosi"
        break;
      case "6":
        this.depto = "Tarija"
        break;
      case "7":
        this.depto = "Santa Cruz"
        break;
      case "8":
        this.depto = "Beni"
        break;
      case "9":
        this.depto = "Pando"
        break;
        
    }
    console.log(this.depto)
    return this.depto;
  }
  

}
