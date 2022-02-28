<?php
    class Clientes extends Controller{
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
            $data = $this->model->getClientes();
            for ($i=0; $i <count($data); $i++) {
                if ($data[$i]['estado'] == 1) {
                    $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                   
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                }
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-primary" type="button" onclick="btnEditarCli(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button" onclick="btnEliminarCli(' . $data[$i]['id'] . ');"><i class="fas fa-trash-alt"></i></button>
                <div/>';
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function validar()
        {
            if (empty($_POST['dni']) || empty($_POST['clave'])) {
                $msg = "¡Los campos estan vacios!";
            }else{
                $dni = $_POST['dni'];
                $clave = $_POST['clave'];
             
                $hash = hash("SHA256", $clave);
                $data = $this->model->getdni($dni, $hash,);
                if ($data) {
                    $_SESSION['id_dni'] = $data['id'];
                    $_SESSION['dni'] = $data['dni'];
                    $_SESSION['nombre'] = $data['nombre'];
                    $_SESSION['activo'] = true;
                    $msg = "ok";
                }else{
                    $msg =  "¡dni o contraseña incorrecta!";
                }

            }

            //print_r($data);
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function registrar()
        {
           $dni = $_POST['dni'];
           $nombre = $_POST['nombre'];
           $telefono = $_POST['telefono'];
           $direccion = $_POST['direccion'];
           $id = $_POST['id'];
           //Encriptar contraseña
           
           if (empty($dni) || empty($nombre) || empty($telefono)  || empty($direccion)) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {
                
                $data=  $this->model->registrarCliente($dni,$nombre,$telefono,$direccion);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = "El dni ya existe";
                }else {
                    $msg ="Error al registrar el Cliente";
                }
                
                
            }else {
                $data=  $this->model->modificarCliente($dni,$nombre,$telefono,$direccion, $id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg ="dni ya Existe";
                }else{
                    $msg ="Error al modificar el Cliente"; 
                }
            }
            
           }
        
        
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();
        }
        public function editar(int $id)
        {
            $data = $this->model->editarCli($id);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function eliminar(int $id)
        {
            $data = $this->model->eliminarUser($id);
    
                $msg = "ok";
            
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

