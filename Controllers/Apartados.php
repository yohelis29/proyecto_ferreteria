<?php
    class Apartados extends Controller{
      public function __construct()
      {
        session_start();
        if (empty($_SESSION['activo'])) {
          header("location: ".base_url);
        }
        parent:: __construct();
      } 
      public function index()
      {
       $this->views->getView($this, "index");
      }

      public function ingresarApartado(){
        $id = $_POST['id'];
       $datos = $this->model->getProductos($id);
       $id_producto = $datos['id'];
       $id_usuario = $_SESSION['id_usuario'];
       $precio = $datos['precio_venta'];
       $cantidad = $_POST['cantidad'];
       $comprobar=$this->model->consultarDetalle($id_producto, $id_usuario);
      
       
       if (empty($comprobar)){
          if($datos['cantidad']>=$cantidad){

           $data = $this->model->registrarDetalle($id_producto, $id_usuario, $precio, $cantidad);
           if ($data == "ok"){
            $msg = array ('msg'=> 'Producto Ingresado' , 'icono'=> 'success');
          }else{
               $msg = array ('msg'=> 'Error al Ingresar el Producto' , 'icono'=> 'error');
          }
        }else{
            $msg = array('msg' => 'El producto tiene un Stock de: ' . $datos['cantidad'] , 'icono' => 'warning');
        }

      }else{
          
          $total_cantidad = $comprobar['cantidad'] + $cantidad;
           if($datos['cantidad'] >= $total_cantidad ){
          $sub_total= $total_cantidad * $precio;
          $data = $this->model->actualizarDetalle('detalle_temp',$precio, $total_cantidad, $sub_total,$id_producto, $id_usuario);
          if ($data == "modificado"){
             $msg = "modificado";
          }else{
              $msg = "Error al modificar el Producto";
           }
        }else{
            $msg = array('msg' => 'El producto tiene un Stock de: ' . $datos['cantidad'], 'icono' => 'warning');
        }
       }
   

      echo json_encode($msg, JSON_UNESCAPED_UNICODE);
      die();

   }

   public function listar()
   {
    $id_usuario = $_SESSION['id_usuario'];
    $data['detalle'] = $this->model->getDetalle($id_usuario);
    $total = 0.00;
    for ($i=0; $i < count( $data['detalle']) ; $i++) { 
       $precio =  $data['detalle'][$i]['precio'];
       $cantidad =  $data['detalle'][$i]['cantidad'];
       $total = $total + ($precio * $cantidad);
    }
    $data['total_pagar'] = number_format($total, 2, '.', ',');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    die();
}
public function registrar()
    {
        $id_cliente = $_POST['select_cliente'];
        $abono = $_POST['abono'];
        $start = $_POST['start'];
        if (empty($caja)) {
            $msg = "Todos los campos son obligatorios";
        }else{
            
                    $data = $this->model->registrarApartado($id_cliente, $f_retiro, $abono);
                    if ($data == "ok") {
                        $msg = "Apartado";
                     }else {
                         $msg ="Error al apartar";
                     }
                     
            
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
      
    }
?>