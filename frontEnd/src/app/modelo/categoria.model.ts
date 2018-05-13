export class Categoria{
 id_cat: number;
 d_desc_cat: string;
}

export class SubCategoria{
    id_sub_cat: number;
    id_cat: number;
    d_desc_sub_cat: string;
   }

export class Actividad{
    id_actividad: number
    id_sub_cat: number;
    d_desc_act: string;
   }

export class Especialidad{
    id_especialidad: number;
    id_actividad: number
    d_desc_esp: string;
   }