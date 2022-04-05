<?php
    class Productos extends Controller{
        public function __construct() {
            session_start();
            parent::__construct();
        }

        public function index()
        {
            if (empty($_SESSION['activo'])) {
                header("location: " . base_url);
            }
          
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Ver_Productos' , 'Crear_Producto');
          if (!empty($verificar) ) {
            $data['medidas'] = $this->model->getMedidas();
            $data['categorias'] = $this->model->getCategorias();
            $data['proveedores'] = $this->model->getProveedores();
            //print_r($this->model->getProducto());
            $this->views->getView($this, "index", $data);
          } else {
             header('Location: '. base_url . 'Errors/permisos');
          }


        }

        public function listar()
        {
            $data = $this->model->getProductos();
            for ($i=0; $i <count($data); $i++) {
                $data[$i]['imagen'] = '<img class="img-thumbnail" src="'. base_url. "Assets/img/". $data[$i]['foto'].'" width="100">';
                if ($data[$i]['estado'] == 1) {
                    $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-primary" type="button" onclick="btnEditarPro(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" type="button" onclick="btnEliminarPro(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                    $data[$i]['acciones'] = '<div>
                    <button class="btn btn-success" type="button" onclick="btnReingresarPro(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                    <div/>';
                }
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        public function registrar()
        {
           $codigo = $_POST['codigo'];
           $nombre = $_POST['nombre'];
           $precio_compra = $_POST['precio_compra'];
           $precio_venta = $_POST['precio_venta'];
           $medida = $_POST['medida'];
           $categoria = $_POST['categoria'];
           $proveedor = $_POST['proveedor'];
           $id = $_POST['id'];
           $img = $_FILES['imagen'];
           $name = $img['name'];
           $tmpname = $img['tmp_name'];
           $destino ="Assets/img/".$name;
           $fecha = date("YmdHis");
          
           
           if (empty($codigo) || empty($nombre) || empty($precio_compra) || empty($precio_venta)) {
               $msg = "Todos los campos son obligatorios";
           }else {
               if(!empty($name)){
                   $imgNombre = $fecha . ".jpg";
                   $destino ="Assets/img/".$imgNombre;
               }else if(!empty($_POST['foto_actual']) && empty($name)){
                   $imgNombre = $_POST['foto_actual'];

               }else{
                   $imgNombre = "default.jpg";
               }
            if ($id=="") {
                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Producto','Crear_Producto');
              if (!empty($verificar) ) {
               $data=  $this->model->registrarProducto($codigo,$nombre,$precio_compra,$precio_venta,$medida,$categoria,$proveedor,$imgNombre);
                if ($data == "ok") {
                if(!empty($name)){
                    move_uploaded_file($tmpname, $destino);
                }
                
                    $msg = "si";
               
                }else if($data == "existe"){
                  
                   $msg = array('msg' => 'El Producto ya existe', 'icono' => 'error' );
                }else {
             
                    $msg = array('msg' => 'Error al registrar el Producto', 'icono' => 'error' );
                }


                           } else {
                $msg = array('msg' => ' No tienes Permisos para registrar productos', 'icono' => 'warning' );
              }  
            }else {

                $id_user = $_SESSION['id_usuario'];
                $verificar=$this->model->verificarPermiso($id_user, 'Crear_Producto','Crear_Producto');
              if (!empty($verificar) ) {
                $imgDelete = $this->model->editarPro($id);

                if ($imgDelete['foto'] != 'default.jpg' || $imgDelete['foto'] != "default.jpg" ) {
                    if (file_exists("Assets/img/" . $imgDelete['foto'])) {
                        unlink("Assets/img/" . $imgDelete['foto']);
                    }
                }
                $data=  $this->model->modificarProducto($codigo,$nombre,$precio_compra,$precio_venta,$medida,$categoria,$proveedor,$imgNombre,$id);
                if ($data == "modificado") {
                    if(!empty($name)){
                        move_uploaded_file($tmpname, $destino);
                    }
                 $msg = "modificado";
                }else if($data=="existe") {
        
                $msg = array('msg' => ' Producto ya Existe', 'icono' => 'error' );
                 }else{
                $msg = array('msg' => 'Error al modificar el Producto', 'icono' => 'error' );
                }
               
            } else {
                $msg = array('msg' => ' No tienes Permisos para editar productos', 'icono' => 'warning' );
              }  
            }
            
           }
        
        
           echo json_encode($msg, JSON_UNESCAPED_UNICODE);
           die();
        }
        public function editar(int $id)
        {
            $data = $this->model->editarPro($id);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function eliminar(int $id)
        {
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Producto','Crear_Producto');
          if (!empty($verificar) ) {

            $data = $this->model->accionPro(0, $id);
            if ($data == 1) {
                $msg ="ok";
    
            }else{
                $msg ="Error al desactivar";
    
            }

        } else {
            $msg = array('msg' => ' No tienes Permisos para Desactivar Productos', 'icono' => 'warning' );
          }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }
        public function reingresar(int $id)
        {
            $id_user = $_SESSION['id_usuario'];
            $verificar=$this->model->verificarPermiso($id_user, 'Crear_Categoria','Crear_Producto');
          if (!empty($verificar) ) {

            $data = $this->model->accionPro(1, $id);
            if ($data == 1) {
                $msg ="ok";
    
            } else {
                $msg = "error al reingresar";
    
            }
        } else {
            $msg = array('msg' => ' No tienes Permisos para Reingresar Productos', 'icono' => 'warning' );
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

