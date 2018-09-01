import { Calendar } from "primeng/primeng";

export class Individual {

    id_individual: number;
    numero_registro: string;
    ci_usuario: any;
    gestion: string;
    d_fecha_registro: Date;
    d_fecha_renovacion: Date;
    vigencia: string = "Vigencia de 2 años";
    estado_credencial: string;
    //residencia:string;
    comunidad: string;
    tipo_artista: string;
    e_id_pais: number;
    e_pais_localidad:string;
    e_cod_localidad:string;

    id_dpto: number;
    dptoProv: number;
    id_prov: number;
    prov: any;
    id_mun: number;

    d_cedula: string;
    d_exp: string;
    d_sexo: string;
    d_nombre_artistico: string;
    d_nombres: string;
    d_apellidos: string;
    d_nacimiento: number;
    d_fecha_nacimiento: Date;
    //d_estado_civil: string;
    //d_nro_hijos: string;
    //d_profesion: string;

    d_domicilio: string;
    d_telefono: string;
    d_celular: string;
    d_email: string;
    d_pagina_web: string;
    d_youtube: string;
    d_otros: string;

    d_institutucion: string;
    d_agrupaciones: string;
    id_sector: number;
    id_sub_sector: number;
    id_actividad: number;
    actividad_sec: string;
    actividad_ter: string;
    actividad_cua: string;
    id_especialidad: number;
    id_especialidad_sec: number;
    id_especialidad_ter: number;
    id_especialidad_cua: number;
    id_especialidad_qui: number;
    d_experiencia: string;
    caegorizacion: string;

    d_foto: any;
    d_foto_artista: any;
    id_doc_resp: string;
    d_doc_respaldo: string;

    id_estado: string;

    id_log: number;

}

export class FormIndividual {

    numero_registro: string;
    d_fecha_registro: Date;
    gestion: string;
    vigencia: string = "Vigencia de 2 años";
    estado_credencial: string;
    id_dpto: number;
    depProv: number;
    id_prov: number;
    id_mun: number;

    d_cedula: string;
    d_exp: string;
    d_nombres: string;
    d_apellidos: string;
    d_nacimiento: string;
    d_fecha_nacimiento: Date;
    d_estado_civil: string;

    d_domicilio: string;
    d_telefono: string;
    d_celular: string;
    d_email: string;
    d_pagina_web: string;
    d_youtube: string;
    d_otros: string;

    d_institucion: string;
    d_agrupaciones: string;
    id_sector: number;
    id_sub_sector: number;
    id_actividad: number;
    actividad_sec: string;
    id_especialidad: number;
    id_especialidad_sec: number;
    id_especialidad_ter: number;
    d_experiencia: string;
    caegorizacion: string;

    d_foto: any;
    d_foto_artista: any;
    id_estado: string;

    Departamento: string;
    Provincia: string;
    Localidad: string;
    d_desc_cat: string;
    d_desc_sub_cat: string;
    d_desc_act: string;
    d_desc_esp: string;

}

export class Resumen {
    id_artista: number;
    resumen: string;
}
export class Trayectoria {
    id_artista: number;
    gestion: string;
    fecha: Date;
    lugar: string;
    actividad: string;
}

export class Curso {
    id_artista: number;
    institucion: string;
    nombre_curso: string;
    desde: Date;
    hasta: Date;
}

export class Formacion {
    resumen: string;
    id_artista: number;
    universidad: string;
    grado: string;
    fecha_emision: Date;
}

export class Premios {
    id_artista: number;
    institucion: string;
    distincion: string;
    lugar: string;
    fecha: Date;
}  

export class Produccion {
    id_artista: number;
    gestion: string;
    fecha: Date;
    lugar: string;
    act_pub_exp: string;
    bien: string;
}

export class Representacion {
    id_artista: number;
    fecha: Date;
    lugar: string;
    actividad: string;
    recursos: string;
}