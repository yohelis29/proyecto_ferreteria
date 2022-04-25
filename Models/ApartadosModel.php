<?php
class ApartadosModel extends Query{
   
    public function __construct()
    {
        parent:: __construct();
    }


   public function getProductos(int $id)
   {
       $sql = "SELECT * FROM productos WHERE id = $id";
       $data = $this->select($sql);
    return $data;
   }

   public function consultarDetalle(int $id_producto, int $id_usuario)
   {
       $sql = "SELECT * FROM detalle_temp_apartado WHERE id_producto = $id_producto AND id_usuario = $id_usuario ";
       $data = $this->select($sql);
       return $data;
   }

   public function registrarDetalle( int $id_producto, int $id_usuario, string $precio, int $cantidad){
      
    $sql = "INSERT INTO detalle_temp_apartado(id_producto, id_usuario, precio, cantidad) VALUES (?,?,?,?)";
    $datos = array($id_producto,$id_usuario,$precio,$cantidad);
    $data = $this->save($sql, $datos);
    if ($data == 1) {
        $res = "ok";
    }else{
        $res = "error";
    }
    return $res;

  

}
   
   public function getDetalle( int $id)
   {
       $sql = "SELECT d.*, p.id AS id_pro, p.descripcion FROM detalle_temp_apartado d INNER JOIN productos p ON d.id_producto = p.id WHERE d.id_usuario = $id";
       $data = $this->selectAll($sql);
       return $data;
   }

   public function calcularApartado( int $id_usuario)
   {
       $sql = "SELECT sub_total, SUM(sub_total) AS total FROM detalle_temp_apartado WHERE id_usuario = $id_usuario";
       $data = $this->select($sql);
       return $data;
   }

   public function deleteDetalle(int $id)
   {
    $sql = "DELETE FROM detalle WHERE id = ?";
    $datos = array($id);
    $data = $this->save($sql, $datos);
    if ($data == 1) {
        $res = "ok";
    }else{
        $res = "error";
    }
    return $res;
   }
 

   public function actualizarDetalle(string $table,string $precio, int $cantidad, string $sub_total, int $id_producto, int $id_usuario){
      
    $sql = "UPDATE $table SET precio = ?, cantidad = ?, sub_total = ? WHERE id_producto = ? AND id_usuario = ?";
    $datos = array($precio,$cantidad,$sub_total,$id_producto,$id_usuario);
    $data = $this->save($sql, $datos);
    if ($data == 1) {
        $res = "modificado";
    }else{
        $res = "error";
    }
    return $res;

   }



  public function registrarDetalleVenta(int $id_venta, int $id_pro, int $cantidad, string $desc ,string $precio, string $sub_total){
    $sql = "INSERT INTO detalle_ventas(id_venta, id_producto, cantidad, descuento, precio, sub_total) VALUES (?,?,?,?,?,?)";
    $datos = array($id_venta, $id_pro, $cantidad,$desc ,$precio, $sub_total);
    $data = $this->save($sql, $datos);
    if ($data == 1) {
        $res = "";
    }else{
        $res = "error";
    }
    return $res;
  }
   
  public function getEmpresa(){
      $sql = "SELECT * FROM configuracion";
      $data = $this->select($sql);
      return $data;

  }

  public function vaciarDetalle(string $table, int $id_usuario){
    $sql = "DELETE FROM $table WHERE id_usuario = ?";
    $datos = array($id_usuario);
    $data = $this->save($sql, $datos);
    if ($data == 1) {
        $res = "ok";
    }else{
        $res = "error";
    }
    return $res;
  }


    public function getProVenta(int $id_venta){
        $sql = "SELECT v.*, d.*, p.id, p.descripcion  FROM ventas v INNER JOIN detalle_ventas d ON v.id = d.id_venta INNER JOIN productos p ON p.id = d.id_producto  WHERE v.id = $id_venta";
        $data = $this->selectAll($sql);
        return $data;
    
  
      }

    public function getHistorialVentas()
    {
        $sql = "SELECT c.id, c.nombre, v.* FROM clientes c INNER JOIN ventas v ON v.id_cliente = c.id";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function actualizarStock(int $cantidad, int $id_pro){
        $sql = "UPDATE productos SET cantidad = ? WHERE id = ?";
        $datos = array($cantidad, $id_pro);
        $data = $this->save($sql, $datos);
        return $data;
      }

 
    public function registraVenta(int $id_cliente,string $total){
        $sql = "INSERT INTO ventas(id_cliente,total) VALUES (?,?)";
        $datos = array($id_cliente, $total);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "ok";
        }else{
            $res = "error";
        }
        return $res;
       }


}

?>
