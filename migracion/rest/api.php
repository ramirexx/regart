<?php
   require_once("Rest.inc.php");

   class API extends REST {
   
      public $data = "";
      
      const DB_SERVER = "localhost";
      //const DB_USER = "id5857866_root";
      const DB_USER = "root";
      const DB_PASSWORD = "vertrigo";
      //const DB = "id5857866_cultura_artistas";
      const DB = "cultura_artistas";


      
      

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
//recupera datos de un artista por ci
//http://localhost/migracion/rest/individual?ci=2638925
private function individual(){
      if($this->get_request_method() != "GET"){
         $this->response('',406);
      }
      $ci = (int)$this->_request['ci'];
      if($ci > 0){
         $query="SELECT ci_usuarios, gestion, d_fecha, id_dpto, d_nombres, d_apellidos, d_cedula, d_exp, d_sexo,
		 d_nacimiento, d_fecha_nacimiento, d_domicilio, d_telf, d_celular, d_email FROM tb_individual c where c.d_cedula=$ci";
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