<?php
    class Proveedores extends Controller{
        public function __construct() {
            session_start();
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
            parent::__construct();
        }

        public function index()
        {
           

            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Ver_Proveedores' , 'Crear_Proveedor');
          if (!empty($verificar) ) {
              $this->views->getView($this, "index");
          } else {
             header('Location: '. base_url . 'Errors/permisos');
          }
        }
        public function listar()
        {
            $data = $this->model->getProveedor();
            for ($i=0; $i <count($data); $i++) {
                if ($data[$i]['estado'] == 1) {
                    $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-primary" type="button" onclick="btnEditarProv(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" type="button" onclick="btnEliminarProv(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-success" type="button" onclick="btnReingresarProv(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }
                
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function registrar()
        {
           
           $nombre = $_POST['nombre'];
           $telefono = $_POST['telefono'];
           $id = $_POST['id'];
         
           
           if ( empty($nombre) || empty($telefono)) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {

                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Proveedor','Crear_Proveedor');
              if (!empty($verificar) ) {
                
                $data=  $this->model->registrarProv($nombre,$telefono);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = array('msg' => ' El proveedor ya existe', 'icono' => 'error' );
                }else {
                    $msg = array('msg' => ' Error al registrar el proveedor', 'icono' => 'error' );
                }
            } else {
                $msg = array('msg' => ' No tienes Permisos para registrar Proveedores', 'icono' => 'warning' );
              }    
                
            }else {

                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Proveedor','Crear_Proveedor');
              if (!empty($verificar) ) {
                $data=  $this->model->modificarProv($nombre, $telefono,$id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg = array('msg' => 'Proveedor ya Existe', 'icono' => 'error' );
                }else{
                    $msg = array('msg' => 'Error al modificar el proveedor', 'icono' => 'error' );
                }

            } else {
                $msg = array('msg' => ' No tienes Permisos para Editar Proveedores', 'icono' => 'warning' );
              } 
            }
            
           }
        
        
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();
        }


        public function editar(int $id)
        {
            $data = $this->model->editarProv($id);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function eliminar(int $id)
        {

            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Proveedor','Crear_Proveedor');
          if (!empty($verificar) ) {
            $data = $this->model->accionProv(0, $id);
            if ($data == 1) {
                $msg ="ok";
    
            }else{
                $msg ="Error al desactivar";
    
            }

        } else {
            $msg = array('msg' => ' No tienes Permisos para Desactivar Proveedores', 'icono' => 'warning' );
          } 
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }


        public function reingresar(int $id)
        {
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Proveedor','Crear_Proveedor');
          if (!empty($verificar) ) {
            $data = $this->model->accionProv(1, $id);
            if ($data == 1) {
                $msg ="ok";
    
            } else {
                $msg = "error al reingresar";
    
            }

        } else {
            $msg = array('msg' => ' No tienes Permisos para Reingresar Proveedores', 'icono' => 'warning' );
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

