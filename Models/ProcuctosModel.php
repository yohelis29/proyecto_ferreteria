<?php
class ProductosModel extends Query{
    private $Producto, $nombre, $clave, $id_caja, $id, $estado;
    public function __construct()
    {
        parent:: __construct();
    }
    public function getProducto(string $Producto, string $clave)
    {
        $sql = "SELECT * FROM Productos WHERE Producto = '$Producto' AND clave = '$clave'";
        $data = $this->select($sql);
        return $data;
    }
    public function getMedidas()
    {
        $sql = "SELECT * FROM medidas WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getCategorias()
    {
        $sql = "SELECT * FROM medidas WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    
    public function registrarProducto(string $Producto, string $nombre, string $clave, int $id_caja)
    {
        $this->Producto = $Producto;
        $this->nombre = $nombre;
        $this->clave = $clave;
        $this->id_caja = $id_caja;
            $vericar = "SELECT * FROM Productos WHERE Producto = '$this->Producto'";
            $existe = $this->select($vericar);
            if (empty($existe)) {
            $sql = "INSERT INTO Productos(Producto, nombre, clave, id_caja) VALUES (?,?,?,?)";
            $datos = array($this->Producto, $this->nombre, $this->clave, $this->id_caja);
            $data = $this->save($sql, $datos);
            if ($data == 1) {
                $res = "ok";
            }else{
                $res = "error";
            }
            }else{
            $res = "existe";
            }
            return $res;
    }
    public function modificarProducto(string $Producto, string $nombre, int $id_caja, int $id)
    {
        $this->Producto = $Producto;
        $this->nombre = $nombre;
        $this->id = $id;
        $this->id_caja = $id_caja;

        $vericar = "SELECT * FROM Productos WHERE Producto = '$this->Producto'";
        $comprobar = "SELECT * FROM Productos WHERE id = '$this->id' and Producto = '$this->Producto'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (empty($existe) ||  !empty($exist)) {
        
            $sql = "UPDATE Productos SET Producto = ?, nombre = ?, id_caja = ? WHERE id = ?";
            $datos = array($this->Producto, $this->nombre, $this->id_caja, $this->id);
            $data = $this->save($sql, $datos);
            if ($data == 1 ) {
                $res = "modificado";
            } else {
                $res = "error";
            }
     }else{
       
        $res = "existe";
    } return $res;
}

    public function editarUser(int $id)
    {
        $sql = "SELECT * FROM Productos WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function eliminarUser(int $id)
    {
        $sql = "DELETE  FROM Productos WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

}

?>