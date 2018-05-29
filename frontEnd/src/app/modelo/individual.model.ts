export class Individual {

    id_individual: number;

    numero_registro: string;
    d_fecha_registro: Date;
    d_fecha_renovacion: Date;
    vigencia: string = "Vigencia de 2 años";
    estado_credencial: string;
    id_dpto: number;
    id_prov: number;
    id_mun: number;

    d_cedula: string;
    d_exp: string;
    d_sexo: string;
    d_nombres: string;
    d_apellidos: string;
    d_nacimiento: number;
    d_fecha_nacimiento: Date;
    d_estado_civil: string;
    d_nro_hijos: string;
    d_profesion: string;
    
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
    id_actividad_sec: number;
    id_especialidad: number;
    id_especialidad_sec: number;
    id_especialidad_ter: number;
    d_experiencia: string;
    caegorizacion:string;

    d_foto: any;
    id_doc_respaldo: number;
    d_doc_respaldo: string;
    
    id_estado: string;
    
    id_log: number;

}