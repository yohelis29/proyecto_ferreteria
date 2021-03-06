<?php
    class Usuarios extends Controller{
        public function __construct() {
            session_start();
           
            parent::__construct();
        }

        public function index()
        {


            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Usuarios');
          if (!empty($verificar) ) {
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
            $data['cajas']=$this->model->getCajas();
            $data['roles']=$this->model->getRoles();
            //print_r($this->model->getUsuario());
            $this->views->getView($this, "index", $data);
          } else {
             header('Location: '. base_url . 'Errors/permisos');
          }
          



            
        }
        public function listar()
        {
            $data = $this->model->getUsuarios();
            for ($i=0; $i <count($data); $i++) {
              
               
                
                if ($data[$i]['estado'] == 1) {

                    if($data[$i]['usuario'] == 'admin'){

                        if($data[$i]['rol'] == 'Administrador'){
                            $data[$i]['rol'] = '<span class="badge bg-primary">Administrador</span>';
                            $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                            $data[$i]['acciones'] ='';
                           }
    
                    } else{

                   $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';

                
                $data[$i]['acciones'] = '<div>
            
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
                $msg = "??Los campos estan vacios!";
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
                    $msg =  "??Usuario o contrase??a incorrecta!";
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
           $rol = $_POST['rol'];
           //Encriptar contrase??a
           $hash = hash("SHA256", $clave);
           if (empty($usuario) || empty($nombre) || empty($caja)) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {
                if ($clave != $confirmar) {
                   $msg = "Las contrase??as no coinciden";
                }else if($clave==""){

                    $msg = "Ingrese contrase??a"; 
                }else{
                    $data=  $this->model->registrarUsuario($usuario,$nombre,$hash,$caja,$rol);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = "El usuario ya existe";
                }else {
                    $msg ="Error al registrar el usuario";
                }
                }
                
            }else {
                $data=  $this->model->modificarUsuario($usuario,$nombre,$caja, $rol,$id );
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


        public function cambiarPass()
        {
            $actual = $_POST['clave_actual'];
            $nueva = $_POST['clave_nueva'];
            $confirmar = $_POST['confirmar_clave'];
            if (empty($actual) || empty($nueva) || empty($confirmar)) {
                $mensaje = array('msg' => 'todos los campos son obligatorios', 'icono' => 'warning');
            }else{
                if($nueva != $confirmar){
                    $mensaje = array('msg' => 'Las contrase??as no coinciden', 'icono' => 'warning');
                }else{
                $id = $_SESSION['id_usuario'];
                $hash = hash("SHA256", $actual);
                $data = $this->model->getPass($hash, $id);
                     if (!empty($data)) {
                        
                        $verificar = $this->model->modificarPass(hash("SHA256", $nueva),$id);
                          if ($verificar == 1) {
                            $mensaje = array('msg' => 'Contrase??a modificada con exito', 'icono' => 'success');
                          }else{
                            $mensaje = array('msg' => 'Error al modificar la contrase??a', 'icono' => 'error');
                          }
                    }else{
                        $mensaje = array('msg' => 'La contrase??a actual incorrecta', 'icono' => 'error');
                    }
                }
            }
            echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function salir()
        {
            session_destroy();
            header("location: ".base_url);
        }
    
    }
?>

