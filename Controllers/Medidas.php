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
           
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Ver_Medidas' , 'Crear_Medida');
          if (!empty($verificar) ) {
              $this->views->getView($this, "index");
          } else {
             header('Location: '. base_url . 'Errors/permisos');
          }
           
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

                
                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Medida','Crear_Medida');
              if (!empty($verificar) ) {
                
                
                $data=  $this->model->registrarMedi($nombre,$nombre_corto);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                    $msg = array('msg' => 'La medida ya existe', 'icono' => 'error' );
                }else {
                    $msg = array('msg' => ' Error al registrar la medida', 'icono' => 'error' );
                }
                
            } else {
                $msg = array('msg' => ' No tienes Permisos para registrar Medidas', 'icono' => 'warning' );
              }   

            }else {
                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Medida','Crear_Medida');
              if (!empty($verificar) ) {
                $data=  $this->model->modificarMedi($nombre, $nombre_corto,$id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg = array('msg' => ' Medida ya Existe', 'icono' => 'error' );
                }else{
                    $msg = array('msg' => 'Error al modificar la medida', 'icono' => 'error' );
                }

            } else {
                $msg = array('msg' => ' No tienes Permisos para editar medidas', 'icono' => 'warning' );
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

            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Medida','Crear_Medida');
          if (!empty($verificar) ) {

            $data = $this->model->accionMedi(0, $id);
            if ($data == 1) {
                $msg ="ok";
    
            }else{
                $msg ="Error al desactivar";
    
            }

        } else {
            $msg = array('msg' => ' No tienes Permisos para Desactivar Medidas', 'icono' => 'warning' );
          }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }


        public function reingresar(int $id)
        {

            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Medida','Crear_Medida');
          if (!empty($verificar) ) {

            $data = $this->model->accionMedi(1, $id);
            if ($data == 1) {
                $msg ="ok";
    
            } else {
                $msg = "error al reingresar";
    
            }

        } else {
            $msg = array('msg' => ' No tienes Permisos para Reingresar Medidas', 'icono' => 'warning' );
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

