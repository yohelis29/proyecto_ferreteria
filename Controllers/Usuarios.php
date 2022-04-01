<?php
    class Usuarios extends Controller{
        public function __construct() {
            session_start();
           
            parent::__construct();
        }

        public function index()
        {
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
            $data['cajas']=$this->model->getCajas();
            //print_r($this->model->getUsuario());
            $this->views->getView($this, "index", $data);
        }
        public function listar()
        {
            $data = $this->model->getUsuarios();
            for ($i=0; $i <count($data); $i++) {
              
                if ($data[$i]['estado'] == 1) {
                   $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                  if($data[$i]['id'] ==1){
                      $data[$i]['acciones'] = '<div>
                      <span class="badge bg-primary">Administrador</span>
                      <div/>';
                  }else{

                
                $data[$i]['acciones'] = '<div>
                <a class="btn btn-dark" href="'.base_url.'Usuarios/permisos/'. $data[$i]['id'] .'"><i class="fas fa-key"></i></a>
                <button class="btn btn-primary" type="button" onclick="btnEditarUser(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button" onclick="btnEliminarUser(' . $data[$i]['id'] . ');"><i class="fas fa-trash-alt"></i></button>
                <div/>';
                  

                  }
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                }
               
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function validar()
        {
            if (empty($_POST['usuario']) || empty($_POST['clave'])) {
                $msg = "¡Los campos estan vacios!";
            }else{
                $usuario = $_POST['usuario'];
                $clave = $_POST['clave'];
             
                $hash = hash("SHA256", $clave);
                $data = $this->model->getUsuario($usuario, $hash);
                if ($data) {
                    $_SESSION['id_usuario'] = $data['id'];
                    $_SESSION['usuario'] = $data['usuario'];
                    $_SESSION['nombre'] = $data['nombre'];
                    $_SESSION['activo'] = true;
                    $msg = "ok";
                }else{
                    $msg =  "¡Usuario o contraseña incorrecta!";
                }

            }

            //print_r($data);
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function registrar()
        {
           $usuario = $_POST['usuario'];
           $nombre = $_POST['nombre'];
           $clave = $_POST['clave'];
           $confirmar = $_POST['confirmar'];
           $caja = $_POST['caja'];
           $id = $_POST['id'];
           //Encriptar contraseña
           $hash = hash("SHA256", $clave);
           if (empty($usuario) || empty($nombre) || empty($caja)) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {
                if ($clave != $confirmar) {
                   $msg = "Las contraseñas no coinciden";
                }else if($clave==""){

                    $msg = "Ingrese contraseña"; 
                }else{
                    $data=  $this->model->registrarUsuario($usuario,$nombre,$hash,$caja);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = "El usuario ya existe";
                }else {
                    $msg ="Error al registrar el usuario";
                }
                }
                
            }else {
                $data=  $this->model->modificarUsuario($usuario,$nombre,$caja, $id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg ="Usuario ya Existe";
                }else{
                    $msg ="Error al modificar el usuario"; 
                }
            }
            
           }
        
        
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();
        }
        public function editar(int $id)
        {
            $data = $this->model->editarUser($id);
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

        public function permisos($id)
        {
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
            $data['datos'] = $this->model->getPermisos();
            $permisos = $this->model->getDetallesPermisos($id);
            $data['asignados'] = array();
            foreach($permisos as $permiso){
                $data['asignados'][$permiso['id_permiso']] = true;

            }
            $data['id_usuario'] = $id;
            $this->views->getView($this, "permisos", $data);
        }

        public function registrarPermisos(){

           $msg = '';
            $id_user = $_POST['id_usuario'];
            $eliminar = $this->model->eliminarPermisos($id_user);
           if ($eliminar == 'ok') {
            foreach ($_POST['permisos'] as $id_permiso){
                $msg = $this->model->registrarPermisos($id_user, $id_permiso);

            }

            if ($msg == 'ok') {
                $msg = array('msg' => ' Permisos asignados', 'icono' => 'success' );
            } else {
                $msg = array('msg' => 'Error al asignar los Permisos anteriores', 'icono' => 'error' );
            }
            

           } else {
              $msg = array('msg' => 'Error al eliminar los Permisos anteriores', 'icono' => 'error' );
           }
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           
           
        }
        public function salir()
        {
            session_destroy();
            header("location: ".base_url);
        }
    
    }
?>

