<?php
   require_once("Rest.inc.php");

   class API extends REST {
   
      public $data = "";
      
      const DB_SERVER = "localhost";
      const DB_USER = "root";
      const DB_PASSWORD = "vertrigo";
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