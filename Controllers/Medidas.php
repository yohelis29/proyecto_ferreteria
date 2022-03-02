<?php
    class Medidas extends Controller{
        public function __construct() {
            session_start();
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
            parent::__construct();
        }

        public function index()
        {
           
            $this->views->getView($this, "index");
        }
        public function listar()
        {
            $data = $this->model->getMedidas();
            for ($i=0; $i <count($data); $i++) {
                if ($data[$i]['estado'] == 1) {
                    $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-primary" type="button" onclick="btnEditarMedida(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" type="button" onclick="btnEliminarMedida(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-success" type="button" onclick="btnReingresarMedida(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }
                
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function registrar()
        {
           
           $nombre = $_POST['nombre'];
           $nombre_corto = $_POST['nombre_corto'];
           $id = $_POST['id'];
         
           
           if ( empty($nombre) || empty($nombre_corto)) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {
                
                $data=  $this->model->registrarMedi($nombre,$nombre_corto);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = "La medida ya existe";
                }else {
                    $msg ="Error al registrar la medida";
                }
                
                
            }else {
                $data=  $this->model->modificarMedi($nombre, $nombre_corto,$id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg ="Medida ya Existe";
                }else{
                    $msg ="Error al modificar la Medida"; 
                }
            }
            
           }
        
        
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();
        }


        public function editar(int $id)
        {
            $data = $this->model->editarMedi($id);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function eliminar(int $id)
        {
            $data = $this->model->accionMedi(0, $id);
            if ($data == 1) {
                $msg ="ok";
    
            }else{
                $msg ="Error al desactivar";
    
            }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }


        public function reingresar(int $id)
        {
            $data = $this->model->accionMedi(1, $id);
            if ($data == 1) {
                $msg ="ok";
    
            } else {
                $msg = "error al reingresar";
    
            }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function salir()
        {
            session_destroy();
            header("location: ".base_url);
        }
    
    }
?>

