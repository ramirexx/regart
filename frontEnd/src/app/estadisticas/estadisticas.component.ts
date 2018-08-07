import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

lista1: any[];
deptoNombre: string [] = [];
deptoTotal: number [] = [];
coloBack: any[]=[];
hoverBack: any[]=[];

 /* SELECT id_dpto, COUNT(id_dpto) AS count
FROM tb_individual c
GROUP BY id_dpto*/

  data: any;
  constructor(
    private formularioService: FormularioService,
  ) {
    /*this.data = {
     
      labels: ['Chuquisaca','La Paz','Cochabamaba','Oruro','Potosi','Tarija','Santa Cruz','Beni','Pando' ],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };*/
   }

getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  

  ngOnInit() {
      
      
    this.formularioService.getDeptoIndividual()
    .subscribe(data => { this.lista1 = data
    for(let i = 0; i < this.lista1.length; i++){
        this.deptoNombre.push(this.lista1[i].Departamento);
        let totalNumber = parseInt(this.lista1[i].total);
        this.deptoTotal.push(totalNumber);
        this.coloBack.push(this.getRandomColor());
        this.hoverBack.push("#36A2EB");
        console.log(this.deptoNombre);
        console.log(this.deptoTotal);
        console.log(this.coloBack);
        this.data = {
     
            labels: this.deptoNombre,
                  datasets: [
                      {
                          data: this.deptoTotal,
                          backgroundColor:this.coloBack,
                          hoverBackgroundColor:this.hoverBack
                      }]    
                  };
    }
    },
      err => console.log(err),
      () => console.log("done loanding", this.lista1));


}


}


