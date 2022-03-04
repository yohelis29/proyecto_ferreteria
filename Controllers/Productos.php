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
            $data['medidas']=$this->model->getMedidas();
            $data['categorias']=$this->model->getCategorias();
            $data['proveedores']=$this->model->getProveedores();
            print_r($this->model->getMedidas());
            $this->views->getView($this, "index", $data);
        }
        public function listar()
        {
            $data = $this->model->getProductos();
            for ($i=0; $i <count($data); $i++) {
                if ($data[$i]['estado'] == 1) {
                    $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                   
                }else {
                    $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                }
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-primary" type="button" onclick="btnEditarPro(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button" onclick="btnEliminarPro(' . $data[$i]['id'] . ');"><i class="fas fa-trash-alt"></i></button>
                <div/>';
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }

        
        public function validar()
        {
            if (empty($_POST['Producto']) || empty($_POST['clave'])) {
                $msg = "¡Los campos estan vacios!";
            }else{
                $Producto = $_POST['Producto'];
                $clave = $_POST['clave'];
             
                $hash = hash("SHA256", $clave);
                $data = $this->model->getProducto($Producto, $hash);
                if ($data) {
                    $_SESSION['id_Producto'] = $data['id'];
                    $_SESSION['Producto'] = $data['Producto'];
                    $_SESSION['nombre'] = $data['nombre'];
                    $_SESSION['activo'] = true;
                    $msg = "ok";
                }else{
                    $msg =  "¡Producto o contraseña incorrecta!";
                }

            }

            //print_r($data);
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
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
           
           if (empty($codigo) || empty($nombre) || 
           empty($precio_compra) ||empty($precio_venta) || 
           empty($medida) || empty($categoria) ||
           empty($proveedor)) {
               $msg = "Todos los campos son obligatorios";
           }else {
            if ($id=="") {            
                    $data=  $this->model->registrarProducto($codigo,$nombre,$precio_compra,$precio_venta, $medida, $categoria, $proveedor);
                if ($data == "ok") {
                   $msg = "si";
                }else if($data == "existe"){
                   $msg = "El Producto ya existe";
                }else {
                    $msg ="Error al registrar el Producto";
                }    
                
            }else {
                $data=  $this->model->modificarProducto($codigo,$nombre,$precio_compra,$precio_venta, $medida, $categoria, $proveedor, $id);
                if ($data == "modificado") {
                   $msg = "modificado";
                }else if($data=="existe") {
                    $msg ="Producto ya Existe";
                }else{
                    $msg ="Error al modificar el Producto"; 
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
            $data = $this->model->eliminarPro($id);
    
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

