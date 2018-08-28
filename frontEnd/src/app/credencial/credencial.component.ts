import { Component, OnInit } from '@angular/core';
import { Individual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Colectivo } from '../modelo/colectivo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { environment }     from '../../environments/environment';


@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  artista: Individual = new Individual();
  colectivo: Colectivo = new Colectivo();
  private base64Foto:String="";
  imagePath:string;
  qr: string = "";
  depto: string;
  tipo:string = "ind";
  id_dpto:any;
  exp:string;
  showInd: boolean = true;

  imgFirma: any;

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
      console.log("*****************"+params['tipo']+this.tipo)
      if(this.tipo == "ind"){
        this.showInd = true;
        console.log("INDIVIDUAL")
        if (id != undefined) {
          console.log(id);
          this.formularioService.getFormIndividual(id)
            .subscribe(artista => {
              this.artista = artista;
              //this.imagePath = this.artista.d_foto;
              this.base64Foto = this.artista.d_foto;
              
              this.qr = "Pagina Web: "+ environment.urlApp+"regart/#/ver-artista/"+id;//this.artista.d_nombres + this.artista.d_apellidos 
              this.exp = this.getExp(this.artista.d_exp);

              if(this.artista.gestion == "2018" || this.artista.gestion == "2017"){
                console.log("this.artista.gestion: WILMA ALANOCA");
                this.imgFirma = "assets/img/firma.png"
              }else if(this.artista.gestion == "2015" || this.artista.gestion == "2016"){
                console.log("this.artista.gestion: MARCO MACHICAO")
                this.imgFirma = "assets/img/machicao.png"
              }else if(this.artista.gestion == "2012" || this.artista.gestion == "2013" || this.artista.gestion == "2014"){
              console.log("this.artista.gestion: PABLO GROUX")
              this.imgFirma = "assets/img/groux.png"
              }
  
              
            })
        }
      }else{
        this.showInd = false ;
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
  } getExp(x){
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


  

}
