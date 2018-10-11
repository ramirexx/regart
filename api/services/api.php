<?php
   require_once("Rest.inc.php");

   class API extends REST {
   
      public $data = "";
      
      const DB_SERVER = "localhost";
      //const DB_USER = "id5857866_root";
      const DB_USER = "root";
      const DB_PASSWORD = "vertrigo";
      //const DB = "id5857866_cultura_artistas2014";
      const DB = "cultura_artistas2014";


      
      

      private $db = NULL;
      private $mysqli = NULL;
      public function __construct(){
         parent::__construct();          // Init parent contructor
         $this->dbConnect();                // Initiate Database connection
      }
      /*
       *  Connect to Database
      */
      private function dbConnect(){
         $this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
      }
      
      /*
       * Dynmically call the method based on the query string
       */
      public function processApi(){
         $func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
         //print_r($_REQUEST); exit();
         if((int)method_exists($this,$func) > 0)
            $this->$func();
         else
            $this->response('',404); // If the method not exist with in this class "Page not found".
      }


      
 

#################### REST COLECTIVOS ###################
//servicio para insertar registro colectivo
//http://localhost/api/regart/insertColectivo
/*{
      "ci_usuarios": "1121212",
      "gestion":"1988",
      "d_fecha":"2134123",
      "id_dpto":1,
      "d_provincia":"234",
      "d_municipio":"sadsad",
      "d_comunidad":"sdas",
      "d_denominacion":"ADASD",
      "d_representantes":"SDFSADAD",
      "d_nom_rep_legal":"SADASDAS",
      "d_ape_rep_legal":"SDASDASD",
      "d_cedula_rep_legal":"SDASASDA",
      "d_exp":"ASD",
      "d_lugar_nac_rep_legal":213123,
      "d_fecha_nac_rep_legal":"sadasdas",
        "d_dom_rep_legal":"asdasd",
        "d_telefono_grupo":"234234",
        "d_celular_grupo":"33333",
        "d_email_grupo":"sdfsdf",
        "d_antecedentes_grupo":"sadfasd",
        "id_cat":null,
        "id_sub_cat":null,
        "d_especialidad_grupo":"sdfsdf",
        "d_biografia_grupo":"sadasd",
        "id_doc_resp":1,
        "d_doc_respaldo":"ASDSAD",
        "d_logo_grupo":"SADFSAD",
        "id_estado":1
  }*/

  
  
  

private function test(){

      function randomPassword() {
            $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            return implode($pass); //turn the array into a string
        }

//      echo json_encode($response); //T\u00e9cnologia
 //     echo json_encode($response, JSON_UNESCAPED_UNICODE); //Técnologia


      if($this->get_request_method() != "GET"){
            /*$to = "ramirolozacmj@gmail.com";
            $subject = "My subject";
            $txt = "Hello world!";
            $headers = "From: webmaster@example.com" . "\r\n" .
            "CC: somebodyelse@example.com";
            mail($to,$subject,$txt,$headers);*/
            $this->response('',406);
         }
      $x =  md5(uniqid(rand(), true));

      $ci       = "555";//=$this->_request['ci_usuario'];
      $nombres  = "Ramiro";  //= $this->_request['nombre_usuario'];
      $apellidos = "Loza ";  // = $this->_request['apellido_usuario'];
      
      $sub3 = substr($nombres,0,1);
      // $array sólo estará compuesto de 2 elementos:
      $array = explode(" ", $apellidos, 2);
      
      $sub1 = $array[0]; // Devuelve ?
      $sub1 = substr($sub1,0,1);
      $sub2 = $array[1]; // Devuelve ?
      $sub2 = substr($sub2,0,1);
      $res = $sub1 . $sub2 . $sub3 . $ci;

      $pass = randomPassword();
      $date=date("Y-m-d H:i:s", strtotime ("2years"));

         $response = array('res' => $res, "msg" => $pass, "data" => $date);
             //"{'aaa':'Tecnologia'}";
            //      echo json_encode($response); //T\u00e9cnologia
            $this->response($this->json($response), 200); // send user details
            
}
//http://localhost/api/regart/test2?id=1
private function test2(){

      if($this->get_request_method() != "POST"){
            $this->response('',406);
         }
         $customer = json_decode(file_get_contents("php://input"),true);

      $id = $customer['id'];
      $response = array('res' => $id, "msg" => "sadasdas", "data" => $id);
      $this->response($this->json($response), 200); // send user details
            
}


  private function insertColectivo(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('numero_registro','ci_usuario', 'd_modificador', 'gestion', 'd_fecha_registro','d_fecha_renovacion', 'vigencia','id_dpto','dptoProv','id_prov','prov',
      'id_mun','d_denominacion','integrantes','id_sector','id_sub_sector','id_actividad','trayectoria','institucion','eta','acreditacion',
      'd_nom_rep_legal','d_ape_rep_legal','d_cedula_rep_legal','d_expedicion','d_lugar_nac_rep_legal','d_fecha_nac_rep_legal','d_dom_rep_legal',
      'd_telefono_grupo','d_celular_grupo','d_email_grupo','d_logo_grupo','d_foto_grupo','estado', 'estado_credencial');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO tb_colectivo(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $z = $this->mysqli->insert_id;
         $success = array('status' => "Success", "msg" => "Colectivo Created Successfully.", "data" => $z);
         $this->response($this->json($success),200);
      }else
         $this->response('error',204);   //"No Content" status
   }


   private function updateColectivo(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $id = $customer['id'];
      $column_names = array('numero_registro','ci_usuario', 'd_modificador', 'gestion', 'd_fecha_registro','d_fecha_renovacion', 'vigencia','id_dpto','dptoProv','id_prov','prov',
      'id_mun','d_denominacion','integrantes','id_sector','id_sub_sector','id_actividad','trayectoria','institucion','eta','acreditacion',
      'd_nom_rep_legal','d_ape_rep_legal','d_cedula_rep_legal','d_expedicion','d_lugar_nac_rep_legal','d_fecha_nac_rep_legal','d_dom_rep_legal',
      'd_telefono_grupo','d_celular_grupo','d_email_grupo','d_logo_grupo','d_foto_grupo','estado', 'estado_credencial');
      $keys = array_keys($customer['data']);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer['data'][$desired_key];
         }
         $columns = $columns.$desired_key."='".$$desired_key."',";
      }
      $query = "UPDATE tb_colectivo SET ".trim($columns,',')."WHERE id_colectivo=$id" ;
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Colectivo Actualizado Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('error',204);   //"No Content" status
   }

   
//Servicio para recuperar colectivos
//http://localhost/api/regart/listacolectivos
      private function listacolectivos(){
         if($this->get_request_method() != "GET"){
            $this->response('',406);
         }
         $query="SELECT * FROM tb_colectivo order by id_colectivo ";
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         if($r->num_rows > 0){
            $result = array();
            while($row = $r->fetch_assoc()){
               $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
         }
         $this->response('',204);   // If no records "No Content" status
      }

      private function listaColectivoUsuario(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
            }
            $ci = (int)$this->_request['ci'];
            if($ci > 0){   
            $query="SELECT * FROM tb_colectivo where ci_usuario = $ci";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
      
            if($r->num_rows > 0){
               $result = array();
               while($row = $r->fetch_assoc()){
                  $result[] = $row;
                  $this->response($this->json($result), 200); // send user details   
               }
            }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                              $this->response($this->json($error), 202); // send user details
            }
            }
            $this->response('',204);   // If no records "No Content" status
         }

//Servicio para recuperar colectivo por id
//http://localhost/api/regart/colectivo?id=1
      private function colectivo(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
            }
            $id = (int)$this->_request['id'];
            if($id > 0){   
               $query="SELECT distinct * FROM tb_colectivo c where c.id_colectivo=$id";
               $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
               if($r->num_rows > 0) {
                  $result = $r->fetch_assoc();   
                  $this->response($this->json($result), 200); // send user details
               }
            }
            $this->response('',204);   // If no records "No Content" status
         }

         private function listaIndiUsuario(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
            }
            $ci = (int)$this->_request['ci'];
            if($ci > 0){   
            $query="SELECT * FROM tb_individual where ci_usuario = $ci";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
      
            if($r->num_rows > 0){
               $result = array();
               while($row = $r->fetch_assoc()){
                  $result[] = $row;
                  $this->response($this->json($result), 200); // send user details   
               }
            }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                              $this->response($this->json($error), 202); // send user details
            }
            }
            $this->response('',204);   // If no records "No Content" status
         }

##############INDIVIDUAL###################
//Servicio para registrar individiual
//http://localhost/api/regart/insertIndividual
/*{
      "numero_registro": "1121212",
      "ci_usuarios": "1121212",
      "gestion":"1988",
      "d_fecha_registro":"2134123",
      "d_fecha_renovacion":"2134123",
      "id_dpto":1,
      "d_provincia":"234",
      "d_municipio":"sadsad",
      "d_nombres":"ADASD",
      "d_apellidos":"SDFSADAD",
      "d_cedula":"SADASDAS",
      "d_exp":"SDASDASD",
      "d_sexo":"SDASASDA",
      "d_nacimiento":"ASD",
      "d_fecha_nacimiento":23424234,
      "d_estado_civil":"asdsadsad",
        "d_domicilio":"asdasd",
        "d_telefono":"234234",
        "d_celular":"33333",
        "d_email":"sdfsdf",
        "id_cat":null,
        "id_sub_cat":null,
        "id_doc_resp":1,
        "d_doc_respaldo":"ASDSAD",
        "d_foto_individual":"SADFSAD",
        "id_estado":1
  }*/

private function insertIndividual(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('numero_registro','ci_usuario', 'd_modificador', 'gestion', 'd_fecha_registro', 'd_fecha_renovacion','vigencia','comunidad',
      'tipo_artista', 'e_id_pais', 'e_pais_localidad', 'e_cod_localidad','id_dpto', 'id_prov','prov','dptoProv','id_mun',
      'd_nombre_artistico','d_nombres','d_apellidos','d_cedula','d_exp','d_sexo','d_nacimiento','d_fecha_nacimiento','d_estado_civil','d_nro_hijos','d_profesion','d_domicilio',
      'd_telefono','d_celular','d_email','d_pagina_web','d_youtube','d_otros','d_institucion','d_agrupaciones','id_sector','id_sub_sector','id_actividad','actividad_sec', 'id_especialidad',
      'id_especialidad_sec','id_especialidad_ter','d_experiencia','categorizacion','id_doc_resp','d_doc_respaldo','d_foto','d_foto_artista','id_estado','estado_credencial');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      
      $query = "INSERT INTO tb_individual(".trim($columns,',').") VALUES(".trim($values,',').")";
      
      
      if(!empty($customer)){
      
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $z = $this->mysqli->insert_id;

      /**
       * REGISTRA LOG
       */
      $keys = array($customer);
      foreach ($keys as $row){
      $usuario= $row["d_modificador"];
      $registro= $row["numero_registro"];
      $estado=$row["id_estado"];
      }	
      $query2 ="INSERT INTO registro_log (usuario, numero_registro, estado_registro) VALUES('$usuario','$registro','$estado')";
      $r2 = $this->mysqli->query($query2) or die($this->mysqli->error.__LINE__);

         $success = array('status' => "Success", "msg" => $r2, "data" => $z);
         //"Artista Created Successfully."
         $this->response($this->json($success),200);
      }else
         $this->response('error',204);   //"No Content" status
   }


   
   private function updateIndividual(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      //$id = (int)$this->customer['id'];
      $id = $customer['id'];
      $column_names = array('numero_registro','ci_usuario', 'd_modificador', 'gestion', 'd_fecha_registro', 'd_fecha_renovacion','vigencia','id_dpto','comunidad',
      'tipo_artista', 'e_id_pais', 'e_pais_localidad', 'e_cod_localidad','id_prov','prov','dptoProv', 'id_mun',
      'd_nombre_artistico','d_nombres','d_apellidos','d_cedula','d_exp','d_sexo','d_nacimiento','d_fecha_nacimiento','d_estado_civil','d_nro_hijos','d_profesion','d_domicilio',
      'd_telefono','d_celular','d_email','d_pagina_web','d_youtube','d_otros','d_institucion','d_agrupaciones','id_sector','id_sub_sector','id_actividad','actividad_sec', 'id_especialidad',
      'id_especialidad_sec','id_especialidad_ter','d_experiencia','categorizacion','id_doc_resp','d_doc_respaldo','d_foto','d_foto_artista','id_estado');
      $keys = array_keys($customer['data']);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer['data'][$desired_key];
         }
         $columns = $columns.$desired_key."='".$$desired_key."',";
      }
      $query = "UPDATE tb_individual SET ".trim($columns,',')." WHERE id_individual=$id";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         /**
          * registra log
          */
      $keys = array($customer);
      foreach ($keys as $input){
      $usuario= "TEST";//$input['d_modificador'];
      $registro= $input['numero_registro'];
      $estado=$input['id_estado'];
      }	
      $query2 ="INSERT INTO registro_log (usuario, numero_registro, estado_registro) VALUES('$usuario','$registro','$estado')";
      $r2 = $this->mysqli->query($query2) or die($this->mysqli->error.__LINE__);


         $success = array('status' => "Success", "msg" => "Artista Actualizado Successfully" , "data" => $customer);//"Artista Actualizado Successfully."
         $this->response($this->json($success),200);
      }else
         $this->response('error',204);   //"No Content" status
   }



   //Servicio para recuperar individual por id
//http://localhost/api/regart/individual?id=1
private function individual(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $id = (int)$this->_request['id'];
      if($id > 0){   
         $query="SELECT distinct * FROM tb_individual c where c.id_individual=$id";
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         if($r->num_rows > 0) {
            $result = $r->fetch_assoc();   
            $this->response($this->json($result), 200); // send user details
         }
      }
      $this->response('',204);   // If no records "No Content" status
   }

private function formularioIndividual(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $id = (int)$this->_request['id'];
      if($id > 0){  
            $query="SELECT 
            tb_individual.id_individual,
            tb_individual.numero_registro,
            tb_individual.ci_usuario,
            tb_individual.d_modificador,
            tb_individual.gestion,
            tb_individual.d_fecha_registro,
            tb_individual.d_fecha_validez,
            tb_individual.d_fecha_renovacion,
            tb_individual.vigencia,
            tb_individual.comunidad,
            tb_individual.tipo_artista,
            tb_individual.e_id_pais,
            tb_individual.e_pais_localidad,
            tb_individual.e_cod_localidad,
            tb_individual.id_dpto,
            tb_individual.id_prov,
            tb_individual.dptoProv,
            tb_individual.prov,
            tb_individual.id_mun,
            tb_individual.d_nombre_artistico,
            tb_individual.d_nombres,
            tb_individual.d_apellidos,
            tb_individual.d_cedula,
            tb_individual.d_exp,
            tb_individual.d_sexo,
            tb_individual.d_nacimiento,
            tb_individual.d_fecha_nacimiento,
            tb_individual.d_estado_civil,
            tb_individual.d_nro_hijos,
            tb_individual.d_profesion,
            tb_individual.d_domicilio,
            tb_individual.d_telefono,
            tb_individual.d_celular,
            tb_individual.d_email,
            tb_individual.d_pagina_web,
            tb_individual.d_youtube,
            tb_individual.d_otros,
            tb_individual.d_institucion,
            tb_individual.d_agrupaciones,
            tb_individual.id_sector,
            tb_individual.id_sub_sector,
            tb_individual.id_actividad,
            tb_individual.actividad_sec,
            tb_individual.id_especialidad,
            tb_individual.id_especialidad_sec,
            tb_individual.id_especialidad_ter,
            tb_individual.d_experiencia,
            tb_individual.categorizacion,
            tb_individual.id_doc_resp,
            tb_individual.d_doc_respaldo,
            tb_individual.d_foto,
            tb_individual.d_foto_artista,
            tb_individual.id_estado,
            tb_individual.estado_credencial,
            departamentos.Departamento,
            provincias.Provincia,
            provincias.Prov,
            provincias.DepProv,
            tb_sub_cat.d_desc_sub_cat,
            tb_actividad.d_desc_act,
            tb_categoria.d_desc_cat,
  localidades.Localidad,
tb_pais.pais_nombre
          FROM
            departamentos
            RIGHT OUTER JOIN tb_individual ON (departamentos.idDep = tb_individual.id_dpto)
            LEFT OUTER JOIN provincias ON (tb_individual.id_prov = provincias.IdProv)
            LEFT OUTER JOIN localidades ON (tb_individual.id_mun = localidades.IdLoc)
            INNER JOIN tb_categoria ON (tb_individual.id_sector = tb_categoria.id_cat)
            INNER JOIN tb_sub_cat ON (tb_individual.id_sub_sector = tb_sub_cat.id_sub_cat)
            INNER JOIN tb_actividad ON (tb_individual.id_actividad = tb_actividad.id_actividad)
 LEFT OUTER JOIN tb_pais ON (tb_individual.e_id_pais = tb_pais.id)
          WHERE
            tb_individual.id_individual = $id LIMIT 1";
 //$query="SELECT a.id_estado, a.numero_registro,a.d_fecha_registro, a.gestion, a.d_fecha_validez, a.comunidad, a.id_dpto, a.id_prov, a.id_mun, a.d_nombre_artistico, a.d_nombres, d_apellidos, a.d_cedula, a.d_exp,a.d_sexo,a.d_nacimiento,a.d_fecha_nacimiento, a.d_domicilio, a.d_telefono, a.d_celular, a.d_email, a.d_pagina_web, a.d_youtube, a.d_otros, a.d_institucion, a.id_sector, a.id_actividad, a.d_agrupaciones,  a.d_experiencia, a.d_foto, a.d_foto_artista, a.id_sector, a.id_sub_sector, a.id_actividad, a.id_especialidad, a.d_agrupaciones,  a.d_experiencia, a.vigencia, b.Departamento, c.Provincia, d.Localidad, e.d_desc_cat, f.d_desc_sub_cat, g.d_desc_act, h.d_desc_esp
 //FROM tb_individual a , departamentos b , provincias c, localidades d, tb_categoria e, tb_sub_cat f, tb_actividad g, tb_especialidad h  WHERE a.id_dpto = b.idDep AND a.id_prov = c.idProv AND a.id_mun = d.idLoc  AND a.id_sector = e.id_cat AND a.id_sub_sector = f.id_sub_cat AND a.id_actividad = g.id_actividad AND a.id_individual =$id LIMIT 1";
 //        $query="SELECT d_fecharegistro as fechaReg,  FROM tb_individual c where c.id_individual=$id";
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         if($r->num_rows > 0) {
            $result = $r->fetch_assoc();   
            $this->response($this->json($result), 200); // send user details
         }
      }
      $this->response('',204);   // If no records "No Content" status
   }

   //Servicio para recuperar colectivos
//http://localhost/api/regart/listacolectivos
private function listaIndividual(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $query="SELECT * FROM tb_individual WHERE id_estado IN ('ENVIADO','BORRADOR') order by id_individual";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
      

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      else{
            $error = array('status' => "empty", "msg" => "NO se encontraron datos");
            $this->response($this->json($error), 202); // send user details  
      }
      $this->response('',204);   // If no records "No Content" status
   }

   private function listaIndividualEnviado(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $query="SELECT * FROM tb_individual WHERE id_estado IN ('ENVIADO','APROBADO') order by id_individual";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
      

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      else{
            $error = array('status' => "empty", "msg" => "NO se encontraron datos");
            $this->response($this->json($error), 202); // send user details  
      }
      $this->response('',204);   // If no records "No Content" status
   }
//// ultimo cambio para lista por dpto
   private function listaIndividualByDpto(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $dpto = (int)$this->_request['cod'];
            if($dpto > 0){   
            
      $query="SELECT * FROM tb_individual WHERE id_estado IN ('ENVIADO','APROBADO') AND id_dpto ='$dpto' order by id_individual";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
      

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      else{
            $error = array('status' => "empty", "msg" => "NO se encontraron datos");
            $this->response($this->json($error), 202); // send user details  
      }
      }
      $this->response('',204);   // If no records "No Content" status
   }



   private function updateEstado(){
      if($this->get_request_method() != "POST"){
            $this->response('',406);
      }
         $obj = json_decode(file_get_contents("php://input"),true);
         //$id = (int)$this->customer['id'];
         $keys = array($obj);
         foreach ($keys as $input)
         {
               $id     = $input['id'];
               $cod    = $input['cod'];
         }
         $correlativo = $cod."-".$id;
         $correlativo2 = (string)$correlativo;

         //fecha de caducidad 2 años en adelante
         //$date=date("Y-m-d H:i:s", strtotime ("5years"));

         //$query="UPDATE tb_individual SET id_estado='ENVIADO', numero_registro= '$correlativo2', d_fecha_validez = '$date' WHERE id_individual=$id";
         $query="UPDATE tb_individual SET id_estado='ENVIADO', numero_registro= '$correlativo2' WHERE id_individual=$id";

         if(!empty($obj)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Estado Actualizado Successfully.", "data" => $correlativo2);
            $this->response($this->json($success),200);
         }else
            $this->response($this->json($obj), 400);
            //$this->response('error',204);   //"No Content" status

   }

   private function aprobarFormIndividual(){
      if($this->get_request_method() != "POST"){
            $this->response('',406);
      }
         $obj = json_decode(file_get_contents("php://input"),true);
         //$id = (int)$this->customer['id'];
         $keys = array($obj);
         foreach ($keys as $input)
         {
               $id     = $input['id'];
         }
         $correlativo = $cod."-".$id;
         $correlativo2 = (string)$correlativo;

         //fecha de caducidad 2 años en adelante
         $date=date("Y-m-d H:i:s", strtotime ("5years"));

         $query="UPDATE tb_individual SET id_estado='APROBADO', d_fecha_validez = '$date' WHERE id_individual=$id";

         if(!empty($obj)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Aprobado Successfully.", "data" => $correlativo2);
            $this->response($this->json($success),200);
         }else
            $this->response($this->json($obj), 400);
            //$this->response('error',204);   //"No Content" status

   }

   private function listaIndividualUsuario(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $ci = (int)$this->_request['ci'];
      if($ci > 0){   
      $query="SELECT * FROM tb_individual where ci_usuario = $ci";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details   
      }else{
            $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                        $this->response($this->json($error), 202); // send user details
      }
      }
      $this->response('',204);   // If no records "No Content" status
   }
      
##############CATEGORIAS##################
//Servicio para recuperar categorias
//http://localhost/api/regart/listaCategorias

//Servicios para guardar categoria
//http://localhost/api/regart/insertCategorias
/*{
   "d_desc_cat": "Artes marciales"
}*/
private function insertCategorias(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('d_desc_cat');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO tb_categoria(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

      private function listaCategorias(){
         if($this->get_request_method() != "GET"){
            $this->response('',406);
            }
            $query="SELECT c.id_cat, c.d_desc_cat FROM tb_categoria c  ORDER BY c.id_cat";
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         if($r->num_rows > 0){
            $result = array();
            while($row = $r->fetch_assoc()){
               $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
         }
         $this->response('',204);   // If no records "No Content" status
      }

  //Servicios para guardar subcategoria
//http://localhost/api/regart/insertCategorias
/*{
      "id_cat": 1,
   "d_desc_sub_cat":"sdfsadsa"
   }*/
   private function insertSubCategorias(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_cat', 'd_desc_sub_cat');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO tb_sub_cat(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}


      //subcategorias
      //http://localhost/api/regart/subCategorias?cat=1
      private function subCategorias(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $id = (int)$this->_request['sec'];
               if($id >0){
                  $query="SELECT id_sub_cat, d_desc_sub_cat FROM tb_sub_cat WHERE id_cat =$id";
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  if($r->num_rows > 0){
                        $result = array();
                        while($row = $r->fetch_assoc()){
                           $result[] = $row;
                        }
                        $this->response($this->json($result), 200); // send user details
                     }else{
                        $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                        $this->response($this->json($error), 202); // send user details
                     }
               }
            $this->response('',204);   // If no records "No Content" status
         }

            //renombrado 4 cambio
         private function subCategoriasActividad2(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
                  $query="SELECT * FROM tb_sub_cat ORDER BY d_desc_sub_cat";
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  if($r->num_rows > 0){
                        $result = array();
                        while($row = $r->fetch_assoc()){
                           $result[] = $row;
                        }
                        $this->response($this->json($result), 200); // send user details
                     }else{
                        $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                        $this->response($this->json($error), 202); // send user details
                     }
            $this->response('',204);   // If no records "No Content" status
         }

      private function listaSubCategorias(){
         if($this->get_request_method() != "GET"){
            $this->response('',406);
            }
            $query="SELECT a.id_sub_cat, a.id_cat, a.d_desc_sub_cat, b.d_desc_cat FROM tb_sub_cat a, tb_categoria b WHERE a.id_cat = b.id_cat ORDER BY id_cat";
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         if($r->num_rows > 0){
            $result = array();
            while($row = $r->fetch_assoc()){
               $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
         }
         $this->response('',204);   // If no records "No Content" status
      }


/*
{
   "id_sub_cat": 1,
"d_desc_act":"SADA"
}
*/
private function insertActividad(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_sub_cat', 'd_desc_act');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO tb_actividad(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Actividad Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}


      //http://localhost/api/regart/actividades?id=1
      private function actividades(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $id = (int)$this->_request['sub'];
               if($id >0){
                  $query="SELECT * FROM tb_actividad WHERE id_sub_cat =$id";
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  if($r->num_rows > 0){
                        $result = array();
                        while($row = $r->fetch_assoc()){
                           $result[] = $row;
                        }
                        $this->response($this->json($result), 200); // send user details
                     }else{
                        $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                        $this->response($this->json($error), 202); // send user details
                     }
               }
            $this->response('',204);   // If no records "No Content" status
         }

         private function listaActividades(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $query="SELECT a.id_actividad, a.id_sub_cat, a.d_desc_act,  b.d_desc_sub_cat FROM tb_actividad a, tb_sub_cat  b WHERE a.id_sub_cat = b.id_sub_cat ORDER BY id_cat";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
   
            if($r->num_rows > 0){
               $result = array();
               while($row = $r->fetch_assoc()){
                  $result[] = $row;
               }
               $this->response($this->json($result), 200); // send user details
            }
            $this->response('',204);   // If no records "No Content" status
         }   

         private function listaActividadesSecundarias(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $query="SELECT * FROM tb_actividad ORDER BY d_desc_act ASC";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
   
            if($r->num_rows > 0){
               $result = array();
               while($row = $r->fetch_assoc()){
                  $result[] = $row;
               }
               $this->response($this->json($result), 200); // send user details
            }
            $this->response('',204);   // If no records "No Content" status
         }   



private function insertEspecialidad(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_actividad', 'd_desc_esp');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO tb_especialidad(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Actividad Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function listaEspecialidades(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $query="SELECT a.id_especialidad, a.d_desc_esp,  b.d_desc_act FROM tb_especialidad a, tb_actividad  b WHERE a.id_actividad = b.id_actividad ORDER BY id_especialidad";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      $this->response('',204);   // If no records "No Content" status
   }

   //http://localhost/api/regart/espacialidad?act=1
   private function especialidad(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['act'];
         if($id >0){
            $query="SELECT * FROM tb_especialidad WHERE id_actividad =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }




#####################USUARIO###########################
//Servicioo prta listar los usuarios

      private function listaUsuarios(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $query="SELECT * FROM usuarios, niveles WHERE usuarios.id_nivel = niveles.id_nivel  ORDER BY ci_usuario";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
   
            if($r->num_rows > 0){
               $result = array();
               while($row = $r->fetch_assoc()){
                  $result[] = $row;
               }
               $this->response($this->json($result), 200); // send user details
            }
            $this->response('',204);   // If no records "No Content" status
         }

//servicio para insertar un usuario
private function insertUsusario(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('ci_usuario','nombre_usuario','apellido_usuario','email_usuario','nick_usuario','pass_usuario','id_nivel','id_dpto');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO usuarios(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "User Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function updateUsuario(){
      if($this->get_request_method() != "POST"){
            $this->response('',406);
      }
         $obj = json_decode(file_get_contents("php://input"),true);
         //$id = (int)$this->customer['id'];
         $keys = array($obj);
         foreach ($keys as $input)
         {
               $id     = $input['id'];
         }
         $correlativo = $cod."-".$id;
         $correlativo2 = (string)$correlativo;

         $query="UPDATE tb_individual SET id_estado='ENVIADO', numero_registro= '$correlativo2' WHERE id_individual=$id";

         if(!empty($obj)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Estado Actualizado Successfully.", "data" => $correlativo2);
            $this->response($this->json($success),200);
         }else
            $this->response($this->json($obj), 400);
            //$this->response('error',204);   //"No Content" status

   }



//servicio que recupera usuario por ci
//http://localhost/api/regart/usuario?ci=3395116
private function usuario(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $id = (int)$this->_request['ci'];
      if($id > 0){   
         $query="SELECT distinct * FROM usuarios u where u.ci_usuarios=$id";
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         if($r->num_rows > 0) {
            $result = $r->fetch_assoc();   
            $this->response($this->json($result), 200); // send user details
         }
      }
      $this->response('',204);   // If no records "No Content" status
   }


private function deleteUsuario(){
      if($this->get_request_method() != "DELETE"){
            $this->response('',406);
      }
      $ci = (int)$this->_request['ci'];
      if($ci > 0){
            $query="DELETE FROM usuarios WHERE ci_usuario = $ci";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
            $this->response($this->json($success),200);
      }else
            $this->response('',204);	// If no records "No Content" status
}


   private function insertUsuarioPublico(){

      function randomPassword() {
            $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            return implode($pass); //turn the array into a string
        }

      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $obj = json_decode(file_get_contents("php://input"),true);
      $keys = array($obj);
      foreach ($keys as $input)
      {
            $ci         = $input['ci'];
            $nombres    = $input['nombre'];
            $apellidos  = $input['apellido'];
            $email      = $input['email'];
            //$tipo       = $input['tipo'];
            $id_dpto    = $input['id_dpto'];
      }
                  // $array sólo estará compuesto de 2 elementos:
                  $array = explode(" ", $apellidos, 2);
                  $sub1 = $array[0]; // Devuelve x    
                  $sub1 = substr($sub1,0,1);
                  $sub2 = $array[1]; // Devuelve x
                  $sub2 = substr($sub2,0,1);
                  $sub3 = substr($nombres,0,1);
                  $nickUsuario = $sub1 . $sub2 . $sub3 . $ci;
                  $passUsuario = randomPassword();
            
			$query = "INSERT INTO usuarios (ci_usuario,nombre_usuario, apellido_usuario, email_usuario, nick_usuario, pass_usuario, id_nivel, id_dpto, tipo_registro) VALUES ('$ci','$nombres','$apellidos','$email','$nickUsuario','$passUsuario',4,'$id_dpto','Nuevo Registro')";
                  if(!empty($obj)){

                                         
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  
                  $response = array('status' => "Success", "msg" => "Usuario Creado", "data" => $obj);
                  $to = "marco.silove@gmail.com"; // this is your Email address
                  $from = "Ministerio de Culturas y Turismo"; // this is the sender's Email address
                  $first_name = $nombres;
                  $last_name = $apellidos;
                  $subject = "Creación de Cuenta del Sistema Plurinacional de Artistas";
                  //$subject2 = "Copy of your form submission";
                  $message = "Estimado(a) ".$nombres . " " . $apellidos . "\n\n".
                  "La creación de su cuenta fue realizada con éxito"."\n\n". 
                  "Estas son sus credenciales para acceder al sistema:" . "\n\n" ."Usuario:".$nickUsuario. "\n\n". "Contraseña:".$passUsuario."\n\n". 
                  "https://regart.000webhostapp.com"."\n\n". 
                  "Ministerio de Culturas y Turismo";
                  $headers = "De:" . $from;
                  mail($to,$subject,$message,$headers);
                  //mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
                  //echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    
 
                  $this->response($this->json($response), 200);
                  
			}else
			
			// If invalid inputs "Bad Request" status message and reason
			$error = array("msg" => "Invalid input parameter");
			$arr_res = array();
			$arr_res['error']  = $error;
			$arr_res['result'] = array('status' => "Failed");
                  $this->response($this->json($arr_res), 400);
                  
      
}   

private function resetPassword(){

      function randomPassword() {
            $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            return implode($pass); //turn the array into a string
        }

      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $obj = json_decode(file_get_contents("php://input"),true);
      $keys = array($obj);
      foreach ($keys as $input)
      {
            //$usuario    = $input['usuario'];
            $email = $input['email'];
      }
            $query="SELECT nombre_usuario FROM usuarios where email_usuario = '$email' LIMIT 1";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0) {
               $result = $r->fetch_assoc();
               //obtenemos el nombre de usuario
               $keys = array($result);
               foreach ($keys as $row)
               {
               $name= $row["nombre_usuario"];
               }	   
               //$response = array('status' => "ok", "data" => $result);
               //genera password
               $passUsuario = randomPassword();
               $query2="UPDATE usuarios SET pass_usuario='$passUsuario' WHERE email_usuario='$email'";
               //$query = "INSERT INTO usuarios (ci_usuario,nombre_usuario, apellido_usuario, email_usuario, nick_usuario, pass_usuario, id_nivel, id_dpto, tipo_registro) VALUES ('$ci','$nombres','$apellidos','$email','$nickUsuario','$passUsuario',4,'$id_dpto','$tipo')";
               $r2 = $this->mysqli->query($query2) or die($this->mysqli->error.__LINE__);
                  
               $response = array('status' => "ok", "msg" => "reset Password to ".$passUsuario, "data" => $name);

               /*$to = "ramirolozacmj@gmail.com"; // this is your Email address
               $from = "Ministerio de Culturas y Turismo"; // this is the sender's Email address
               $first_name = $nombres;
               $last_name = $apellidos;
               $subject = "Reestablecimiento de contraseña Sistema REGART";
               $message = "Estimado(a) ".$nombres . " " . $apellidos . "\n\n".
               "La creación de su cuenta fue realizada con exito"."\n\n". 
               "Estas son sus credenciales para acceder al sistema:" . "\n\n" ."Usuario:".$nickUsuario. "\n\n". "Contraseña:".$passUsuario."\n\n". 
               "https://regart.000webhostapp.com"."\n\n". 
               "Ministerio de Culturas y Turismo";
               $headers = "De:" . $from;
               mail($to,$subject,$message,$headers);
               }
               $this->response($this->json($result), 200); // send user details*-/*/
               $this->response($this->json($response), 200);
            }
            else{
                  $error = array('status' => "Error", "msg" => "Datos invalidos");
                  $this->response($this->json($error), 202);	// If no records
                  
/*                  $arr_res['error']  = $error;
			$arr_res['result'] = array('status' => "Failed");
                  $this->response('',204);*/
            }
            
            
}   

   private function accesAuth(){
      // Cross validation if the request method is POST else it will return "Not Acceptable" status
      if($this->get_request_method() != "POST"){
            $this->response('',406);
      }
      $obj = json_decode(file_get_contents("php://input"),true);
      //$user = $obj.nick_usuario;
      $keys = array($obj);
      foreach ($keys as $row)
      {
      
      $pass= $row["password"];
      $user= $row["usuario"];
      }		
      //$password = $this->_request['pass_usuario'];
      
      // Input validations
      if(!empty($user) and !empty($pass)){
            //if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                  //$query="SELECT distinct * FROM usuarios u where u.ci_usuarios=$id";
         //$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         //if($r->num_rows > 0) {

                  $query = "SELECT ci_usuario, nombre_usuario, apellido_usuario, nick_usuario, id_nivel, id_dpto FROM usuarios WHERE nick_usuario = '$user' AND pass_usuario = '$pass' LIMIT 1";
                  //$query = "SELECT ci_usuarios, nom_ape_usuarios, nick_usuario, id_nivel, id_dpto FROM usuarios";
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  if($r->num_rows > 0){
                        $result = $r->fetch_assoc();  
                        $token =  md5(uniqid(rand(), true)); 
                        //$result = mysql_fetch_array($sql,MYSQL_ASSOC);("'.$date.'"
                        $query2 = "INSERT INTO usuario_log (token, usuario) VALUES('$token','$user')";
                        $r2 = $this->mysqli->query($query2) or die($this->mysqli->error.__LINE__);
                        
                        //$query3 = "SELECT ci_usuarios, nom_ape_usuarios, nick_usuario, id_nivel, id_dpto, token FROM usuarios, usuario_log WHERE nick_usuario.usuarios = '$user' AND usuario.usuario_log = '$user' LIMIT 1";
                        $query3 =" SELECT a.ci_usuario, a.nombre_usuario, a.apellido_usuario, a.nick_usuario, a.id_nivel, a.id_dpto, b.token FROM usuarios a , usuario_log  b WHERE a.nick_usuario = b.usuario AND a.nick_usuario = '$user' LIMIT 1";
                        $r3 = $this->mysqli->query($query3) or die($this->mysqli->error.__LINE__);
                        if($r3->num_rows>0){
                              $result = $r3->fetch_assoc();   

                              $response = array('status' => "ok", "data" => $result);
                        }
                        // If success everythig is good send header as "OK" and user details
                        $this->response($this->json($response), 200);
                        
                  }
                  $error = array('status' => "Error", "msg" => "Datos invalidos");
                  $this->response($this->json($error), 202);	// If no records "No Content" status
            //}
      }
      
      // If invalid inputs "Bad Request" status message and reason
      $error = array('status' => "Error", "msg" => "Invalid User or Password");
      $this->response($this->json($error), 400);
}

private function updatePassword(){

      if($this->get_request_method() != "POST"){
            $this->response('',406);
      }
         $obj = json_decode(file_get_contents("php://input"),true);
         //$id = (int)$this->customer['id'];
         $keys = array($obj);
         foreach ($keys as $input)
         {
               $id     = $input['id'];
               $pass     = $input['pass'];
         }

         $query="UPDATE usuarios SET pass_usuario='$passUsuario' WHERE ci_usuario='$id'";

         if(!empty($obj)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Estado Actualizado Successfully.");
            $this->response($this->json($success),200);
         }else
            $this->response($this->json($obj), 400);
            //$this->response('error',204);   //"No Content" status

   }

private function profesiones(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $query="SELECT * FROM profesiones ORDER BY profesion";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      $this->response('',204);   // If no records "No Content" status
   }


private function comunidades(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $query="SELECT * FROM comunidades  ORDER BY id_comunidad";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      $this->response('',204);   // If no records "No Content" status
   }

private function departamentos(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $query="SELECT idDep as codigo, Departamento as descripcion FROM departamentos  ORDER BY idDep";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      $this->response('',204);   // If no records "No Content" status
   }

//http://localhost/api/regart/provincias?dep=2
private function provincias(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['dep'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM provincias WHERE DepProv =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }


   //http://localhost/api/regart/localidades?pro=5
private function localidades(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['pro'];
         $idDep = (int)$this->_request['dep'];
         if($id >0){
            $query="SELECT ProvLoc as id,IdLoc as codigo, Localidad as descripcion FROM localidades WHERE ProvLoc =$id AND DepLoc =$idDep";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => $idDep);
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }

   private function paises(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $query="SELECT id as id, pais_nombre as pais FROM tb_pais  ORDER BY id";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

      if($r->num_rows > 0){
         $result = array();
         while($row = $r->fetch_assoc()){
            $result[] = $row;
         }
         $this->response($this->json($result), 200); // send user details
      }
      $this->response('',204);   // If no records "No Content" status
   }
   //http://localhost/api/regart/paisLocalidad?loc=2
   private function paisLocalidad(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['loc'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM tb_localidad WHERE pais_id =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }


//SERVICIOS PARA HOJA ARTISTICA

private function insertResumen(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','resumen');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_resumen_art(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Resumen Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function resumen(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_resumen_art WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }



//servicio para CURSOS
private function insertCurso(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','institucion','nombre_curso','desde','hasta');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_cursos(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Curso Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function curso(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_cursos WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }


private function insertFormacion(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','universidad','grado','fecha_emision');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_formacion(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Formacion Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function formacion(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_formacion WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }

private function insertPremio(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','institucion','distincion','lugar','fecha');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_premios(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Premio Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function premio(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_premios WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($result), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }

private function insertProduccion(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','gestion','fecha','lugar','act_pub_exp','bien');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_produccion(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Produccion Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}
private function produccion(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_produccion WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($result), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }

private function insertTrayectoria(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','gestion','fecha','lugar','actividad');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_trayectoria(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Produccion Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function trayectoria(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_trayectoria WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($result), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }

   
   private function insertRep(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }
      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('id_artista','fecha','lugar','actividad','recursos');
      $keys = array_keys($customer);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
         }else{
            $$desired_key = $customer[$desired_key];
         }
         $columns = $columns.$desired_key.',';
         $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO ha_representacion(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($customer)){
         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
         $success = array('status' => "Success", "msg" => "Representacion Created Successfully.", "data" => $customer);
         $this->response($this->json($success),200);
      }else
         $this->response('',204);   //"No Content" status
}

private function representacion(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
         $id = (int)$this->_request['id'];
         if($id >0){
            //$query="SELECT Prov as codigo, IdProv as id, Provincia as descripcion FROM provincias WHERE DepProv =$id";
            $query="SELECT * FROM ha_representacion WHERE id_artista =$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }else{
                  $error = array('status' => "empty", "msg" => "NO se encontraron datos");
                  $this->response($this->json($error), 202); // send user details
               }
         }
      $this->response('',204);   // If no records "No Content" status
   }

   private function deptoindividual(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
         }
            $query="SELECT count(tb_individual.id_dpto) as total, departamentos.Departamento FROM tb_individual
            RIGHT OUTER JOIN  departamentos ON (departamentos.idDep = tb_individual.id_dpto)  GROUP BY departamentos.Departamento
            ORDER BY departamentos.idDep ASC";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0){
                  $result = array();
                  while($row = $r->fetch_assoc()){
                     $result[] = $row;
                  }
                  $this->response($this->json($result), 200); // send user details
               }
      $this->response('',204);   // If no records "No Content" status
}




      /*
       * Encode array into JSON
      */
      private function json($data){
         if(is_array($data)){
            return json_encode($data);
         }
      }
   }

   // Initiiate Library
   
   $api = new API;
   $api->processApi();
?>