<?php
class AdministracionModel extends Query{
    
    public function __construct()
    {
        parent::__construct();
    }
    public function getEmpresa()
    {
        $sql = "SELECT * FROM configuracion";
        $data = $this->select($sql);
        return $data;
    }

    public function getDatos(string $table)
    {
        $sql = "SELECT COUNT(*) AS total FROM $table";
        $data = $this->select($sql);
        return $data;
    }
    
    public function getVentas()
    {
        $sql = "SELECT COUNT(*) AS total FROM ventas WHERE fecha > CURDATE()";
        $data = $this->select($sql);
        return $data;
    }

    public function modificar(string $nombre, string $tel, string $dir, string $mensaje, int $id)
    {
        
            $sql = "UPDATE configuracion SET nombre = ?, telefono = ?, direccion = ?, mensaje = ? WHERE id=?";
            $datos = array($nombre,$tel,$dir,$mensaje,$id);
            $data = $this->save($sql, $datos);
            if ($data == 1) {
                $res = "ok";
            }else{
                $res = "error";
            }
        return $res;
    }

    public function verificarPermiso(int $id_user, string $nombre){
        $sql = "SELECT p.id, p.permiso, d.id, u.id, d.id_permiso FROM permisos p INNER JOIN detalle_permisos d ON p.id = d.id_permiso INNER JOIN usuarios u ON u.id_rol=d.id_rol WHERE u.id = $id_user AND p.permiso = '$nombre'";
        $data = $this->selectAll($sql);
        return $data;
   
    }

    public function getStockMinimo()
    {
        $sql = "SELECT * FROM productos WHERE cantidad < 15 ORDER BY cantidad DESC LIMIT 10";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function getproductosVendidos()
    {
        $sql = "SELECT d.id_producto, d.cantidad, p.id, p.descripcion, SUM(d.cantidad) AS total FROM detalle_ventas d INNER JOIN productos p ON p.id = d.id_producto GROUP BY d.id_producto ORDER BY d.cantidad DESC LIMIT 10";
        $data = $this->selectAll($sql);
        return $data;
    }
      
}
