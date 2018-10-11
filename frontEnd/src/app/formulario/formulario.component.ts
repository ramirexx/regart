import { Component, OnInit } from '@angular/core';
import { FormIndividual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  artista: FormIndividual = new FormIndividual();
  private base64Foto:String="";
  imagePath:string;
  depto: string;
  pro: string;
  mun: string;
  qr: string = "";
  exp:string;
  nac:string;

  imgFirma: any;


  constructor(private formularioService: FormularioService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      console.log("REVISION :", params);
      let id = params['id'];
      if (id != undefined) {
        console.log(id);
        this.formularioService.getFormIndividual(id)
          .subscribe(artista => {
            this.artista = artista;
            console.log(this.artista)
            this.imagePath = this.artista.d_foto;
            this.base64Foto = this.artista.d_foto;
            
            this.qr = "Identificación:" + this.artista.d_cedula + "," + " "+  "Nombre:" + this.artista.d_nombres + " " + this.artista.d_apellidos+ "," + " " + "Sector:" + this.artista.d_desc_cat + "," + " " + "Actividad:" + this.artista.d_desc_sub_cat + "," + " " + "Especialidad:" + this.artista.d_desc_act
            //this.qr = this.artista.d_nombres + this.artista.d_apellidos + this.artista.d_cedula
            //this.depto = this.getDepto(this.artista.d_nacimiento);
            this.nac = this.getNac(this.artista.d_nacimiento);
            this.exp = this.getExp(this.artista.d_exp);
            console.log(this.artista.id_dpto)
            console.log(this.depto)

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
    })
  }


  getNac(x){
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

handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64Foto= btoa(binaryString);
         
         this.artista.d_foto = this.base64Foto
         console.log(btoa(binaryString));
 }

}
