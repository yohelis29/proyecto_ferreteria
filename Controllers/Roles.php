<?php
    class Roles extends Controller{
        public function __construct() {
            session_start();
           
            parent::__construct();
        }

        public function index()
        {
      
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Roles');
          if (!empty($verificar) ) {
            $data['permisos']=$this->model->getPermisos();
            $this->views->getView($this, "index", $data);
          } else {
             header('Location: '. base_url . 'Errors/permisos');
          }
          


        }
        public function listar()
        {
            $data = $this->model->getRoles();
            for ($i=0; $i <count($data); $i++) {
              
                if ($data[$i]['estado'] == 1) {
                   $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                  if($data[$i]['id'] ==1){
                      $data[$i]['acciones'] = '<div>
                      <span class="badge bg-primary">Administrador</span>
                      <div/>';
                  }else{

                
                $data[$i]['acciones'] = '<div>
                <a class="btn btn-dark" href="'.base_url.'Roles/permisos/'. $data[$i]['id'] .'"><i class="fas fa-key"></i></a>
                <button class="btn btn-primary" type="button" onclick="btnEditarRol(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button" onclick="btnEliminarRol(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                <div/>';
                  

                  }
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-success" type="button" onclick="btnReingresarRol(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
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

               
                
                $data=  $this->model->registrarRol($nombre);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   
                   $msg = array('msg' => 'El Rol ya existe', 'icono' => 'error' );
                
            }
    
            }else {
              

                $data=  $this->model->modificarRol($nombre,$id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg = array('msg' => 'Rol ya Existe', 'icono' => 'error' );
                
                }else{
                  
                    $msg = array('msg' => 'Error al modificar el Rol', 'icono' => 'error' );
                }
            
            }
        }
            
           
        
      
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();

        
        }


        public function editar(int $id)
        {
         

            $data = $this->model->editarRol($id);
        
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();

        }

        public function eliminar(int $id)
        {

            $data = $this->model->accionRol(0, $id);
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
   

            $data = $this->model->accionRol(1, $id);
            if ($data == 1) {
                $msg ="ok";
    
            } else {
                $msg = "error al reingresar";
    
            }

    
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
            $data['id_rol'] = $id;
            $this->views->getView($this, "permisos", $data);
        }

        public function registrarPermisos(){

           $msg = '';
            $id_rol = $_POST['id_rol'];
            $eliminar = $this->model->eliminarPermisos($id_rol);
           if ($eliminar == 'ok') {
            foreach ($_POST['permisos'] as $id_permiso){

                $msg = $this->model->registrarPermisos($id_rol, $id_permiso);
            

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
