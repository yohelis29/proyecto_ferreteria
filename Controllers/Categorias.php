<?php
    class Categorias extends Controller{
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
          $verificar=$this->model->verificarPermiso($id_user, 'Ver_Categorias' , 'Crear_Categoria');
        if (!empty($verificar) ) {
            $this->views->getView($this, "index");
        } else {
           header('Location: '. base_url . 'Errors/permisos');
        }
        
        }
        public function listar()
        {
            $data = $this->model->getCategorias();
            for ($i=0; $i <count($data); $i++) {
                if ($data[$i]['estado'] == 1) {
                    $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-primary" type="button" onclick="btnEditarCate(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" type="button" onclick="btnEliminarCate(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-success" type="button" onclick="btnReingresarCate(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }
                
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function registrar()
        {
           
       

           $nombre = $_POST['nombre'];
           $id = $_POST['id'];
         
           
           if ( empty($nombre) ) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {

                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Categoria','Crear_Categoria');
              if (!empty($verificar) ) {
                
                $data=  $this->model->registrarCategoria($nombre);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = "La categoría ya existe";
                }else {
                    $msg ="Error al registrar la Categoría";
                }
            } else {
                $msg = array('msg' => ' No tienes Permisos para registrar categorías', 'icono' => 'warning' );
              }    
                
            }else {
                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Categoria','Crear_Categoria');
              if (!empty($verificar) ) {

                $data=  $this->model->modificarCate($nombre,$id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg ="categoría ya Existe";
                }else{
                    $msg ="Error al modificar la Categoría"; 
                }
            } else {
                $msg = array('msg' => ' No tienes Permisos para editar categorías', 'icono' => 'warning' );
              }    
                
            }
            
           }
        
      
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();

        
        }


        public function editar(int $id)
        {
         

            $data = $this->model->editarCate($id);
        
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();

        }

        public function eliminar(int $id)
        {
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Categoria','Crear_Categoria');
          if (!empty($verificar) ) {

            $data = $this->model->accionCate(0, $id);
            if ($data == 1) {
                $msg ="ok";
    
            }else{
                $msg ="Error al desactivar";
    
            }
        } else {
            $msg = array('msg' => ' No tienes Permisos para Desactivar Categorías', 'icono' => 'warning' );
          }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }


        public function reingresar(int $id)
        {
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Categoria','Crear_Categoria');
          if (!empty($verificar) ) {

            $data = $this->model->accionCate(1, $id);
            if ($data == 1) {
                $msg ="ok";
    
            } else {
                $msg = "error al reingresar";
    
            }

        } else {
            $msg = array('msg' => ' No tienes Permisos para Reingresar Categorías', 'icono' => 'warning' );
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

