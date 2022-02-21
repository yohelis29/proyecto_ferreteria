<?php
    class Principal extends Controller{
    
        public function __construct() {
            session_start();
            parent::__construct();
        }
        public function index()
        {
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
           // $data['cajas']=$this->model->getCajas();
            //print_r($this->model->getUsuario());
            $this->views->getView($this, "index", $data);
        }

     
       
    }
?>

