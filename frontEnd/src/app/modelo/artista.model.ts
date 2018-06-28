export class Artista {

    id_colectivo: number;
    numero_registro: string;
    d_fecha_registro: Date;
    d_fecha_renovacion: Date;
    vigencia: string = "Vigencia de 2 años";
    estado_credencial: string;
    
    id_dpto: number;
    dptoProv: number;
    id_prov: number;
    prov: any;
    id_mun: number;

    denominacion: string;
    integrantes: string;

    id_sector: number;
    id_sub_sector: number;
    id_actividad: number;
    trayectoria: number;

    institucion: string;
    eta:string;
    acreditacion: string;

    d_nom_rep_legal: string;
    d_ape_rep_legal: string;
    d_cedula_rep_legal: string;
    d_expedicion: string;
    d_lugar_nac_rep_legal: string;
    d_fecha_nac_rep_legal: Date;
    d_dom_rep_legal: string;

    d_telefono_grupo: number;
    d_celular_grupo: number;
    d_email_grupo: string;
    
    
    d_logo_grupo: any;
    //d_logo: any;

    estado: string;

    id_log: number;

    zzz: string;

}