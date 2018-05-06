import { Component, OnInit } from '@angular/core';
import { Individual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ver-individual',
  templateUrl: './ver-individual.component.html',
  styleUrls: ['./ver-individual.component.css']
})
export class VerIndividualComponent implements OnInit {

  artista: Individual = new Individual();

  qr: string = "";
  
  constructor(private formularioService: FormularioService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      console.log("REVISION :", params);
      let id = params['id'];
      if (id != undefined) {
        console.log(id);
        this.formularioService.getIndividual(id)
          .subscribe(artista => {
            this.artista = artista;
            this.qr = this.artista.d_nombres + this.artista.d_apellidos 
          })
      }
    })
  }

  volver(){
    let link = ['home/listado-artistas/'];
    this.router.navigate(link);
  }
}
