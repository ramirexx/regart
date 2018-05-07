<?php
   require_once("Rest.inc.php");

   class API extends REST {
   
      public $data = "";
      
      const DB_SERVER = "localhost";
      const DB_USER = "root";
      const DB_PASSWORD = "vertrigo";
      /*const DB = "angularcode_customer";*/
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

//      echo json_encode($response); //T\u00e9cnologia
 //     echo json_encode($response, JSON_UNESCAPED_UNICODE); //Técnologia


      if($this->get_request_method() != "GET"){
            $this->response('',406);
         }
         $x =  md5(uniqid(rand(), true));
         $response = array('status' => $x, "msg" => "Colectivo Created Successfully.", "data" => null);
             //"{'aaa':'Tecnologia'}";
            //      echo json_encode($response); //T\u00e9cnologia
            $this->response($this->json($response), 200); // send user details
            
}


  private function insertColectivo(){
      if($this->get_request_method() != "POST"){
         $this->response('',406);
      }

      $customer = json_decode(file_get_contents("php://input"),true);
      $column_names = array('ci_usuarios', 'd_modificador', 'gestion', 'd_fecha', 'id_dpto', 'd_provincia', 'd_municipio', 'd_comunidad', 'd_denominacion',
      'd_representantes','d_nom_rep_legal','d_ape_rep_legal','d_cedula_rep_legal','d_exp','d_lugar_nac_rep_legal','d_fecha_nac_rep_legal','d_dom_rep_legal',
      'd_telefono_grupo','d_celular_grupo','d_email_grupo','d_antecedentes_grupo','id_cat','id_sub_cat','d_especialidad_grupo','d_biografia_grupo',' 	id_doc_resp',
      'd_doc_respaldo','d_logo_grupo','id_estado');
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
         $success = array('status' => "Success", "msg" => "Colectivo Created Successfully.", "data" => $customer);
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
      $column_names = array('numero_registro','ci_usuario', 'd_modificador', 'gestion', 'd_fecha_registro', 'd_fecha_renovacion','id_dpto', 'd_provincia', 'd_municipio',
      'd_nombres','d_apellidos','d_cedula','d_exp','d_sexo','d_nacimiento','d_fecha_nacimiento','d_estado_civil','d_nro_hijos','d_profesion','d_domicilio',
      'd_telefono','d_celular','d_email','d_pagina_web','d_youtube','d_otros','d_institucion','d_agrupaciones','id_cat','id_sub_cat','id_sub_sector','d_actividad',
      'd_producto','d_experiencia','d_ingresos','d_gastos','d_empleos_directos','d_empleos_indirectos','d_fuente_financiamiento',
      'id_doc_resp','d_doc_respaldo','d_foto','id_estado');
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
         $success = array('status' => "Success", "msg" => "Artista Created Successfully.", "data" => $customer);
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

   //Servicio para recuperar colectivos
//http://localhost/api/regart/listacolectivos
private function listaIndividual(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $query="SELECT * FROM tb_individual order by id_individual";
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

      
##############CATEGORIAS##################
//Servicio para recuperar categorias
//http://localhost/api/regart/listaCategorias

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



      //subcategorias
      //http://localhost/api/regart/subCategorias?id=1
      private function subCategorias(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $id = (int)$this->_request['id'];
               if($id >0){
                  $query="SELECT id_sub_cat, d_desc_sub_cat FROM tb_sub_cat WHERE id_cat =$id";
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  if($r->num_rows > 0){
                        $result = array();
                        while($row = $r->fetch_assoc()){
                           $result[] = $row;
                        }
                        $this->response($this->json($result), 200); // send user details
                     }
               }
            $this->response('',204);   // If no records "No Content" status
         }

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




#####################USUARIO###########################
//Servicioo prta listar los usuarios

      private function listaUsuarios(){
            if($this->get_request_method() != "GET"){
               $this->response('',406);
               }
               $query="SELECT * FROM usuarios  ORDER BY ci_usuarios";
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
      $column_names = array('ci_usuarios','nom_ape_usuarios','nick_usuario','pass_usuario','id_nivel','id_dpto');
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

                  $query = "SELECT ci_usuarios, nom_ape_usuarios, nick_usuario, id_nivel, id_dpto FROM usuarios WHERE nick_usuario = '$user' AND pass_usuario = '$pass' LIMIT 1";
                  //$query = "SELECT ci_usuarios, nom_ape_usuarios, nick_usuario, id_nivel, id_dpto FROM usuarios";
                  $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                  if($r->num_rows > 0){
                        $result = $r->fetch_assoc();  
                        $token =  md5(uniqid(rand(), true)); 
                        //$result = mysql_fetch_array($sql,MYSQL_ASSOC);("'.$date.'"
                        $query2 = "INSERT INTO usuario_log (token, usuario) VALUES('$token','$user')";
                        $r2 = $this->mysqli->query($query2) or die($this->mysqli->error.__LINE__);
                        
                        //$query3 = "SELECT ci_usuarios, nom_ape_usuarios, nick_usuario, id_nivel, id_dpto, token FROM usuarios, usuario_log WHERE nick_usuario.usuarios = '$user' AND usuario.usuario_log = '$user' LIMIT 1";
                        $query3 =" SELECT a.nom_ape_usuarios, a.nick_usuario, a.id_nivel, a.id_dpto, b.token FROM usuarios a , usuario_log  b WHERE a.nick_usuario = b.usuario AND a.nick_usuario = '$user' LIMIT 1";
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