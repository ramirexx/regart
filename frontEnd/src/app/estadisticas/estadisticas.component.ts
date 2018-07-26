import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

 /* SELECT id_dpto, COUNT(id_dpto) AS count
FROM tb_individual c
GROUP BY id_dpto*/

  data: any;
  constructor() {
    this.data = {
     
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
            };
   }

  ngOnInit() {
  }

}
