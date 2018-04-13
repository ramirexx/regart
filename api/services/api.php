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