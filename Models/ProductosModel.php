<?php
class ProductosModel extends Query{
    private $codigo, $nombre, $precio_compra,$precio_venta, $id_medida, $id_categoria,$id_proveedor, $id, $estado;
    public function __construct()
    {
        parent:: __construct();
    }
    
    public function getMedidas()
    {
        $sql = "SELECT * FROM medidas WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getCategorias()
    {
        $sql = "SELECT * FROM Categorias WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function getProveedores()
    {
        $sql = "SELECT * FROM Proveedores";
        $data = $this->selectAll($sql);
        return $data;
    }


    public function getProductos()
    {
        $sql = "SELECT p.*, m.id AS id_medida, m.nombre AS Medida, c.id AS id_categoria, c.nombre AS Categoria FROM productos p INNER JOIN medidas m ON p.id_medida = m.id
        INNER JOIN categorias c ON p.id_categoria = c.id INNER JOIN proveedores prov ON p.id_proveedor = prov.id
        WHERE p.estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }

    
    public function registrarProducto(string $codigo, string $nombre, string $precio_compra,string $precio_venta, int $id_medida, int $id_categoria, int $id_proveedor)
    {
        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->precio_compra = $precio_compra;
        $this->precio_venta = $precio_venta;
        $this->id_medida = $id_medida;
        $this->id_categoria = $id_categoria;
        $this->id_proveedor = $id_proveedor;
        
        $vericar = "SELECT * FROM Productos WHERE codigo = '$this->codigo'";
            $existe = $this->select($vericar);
            if (empty($existe)) {
            $sql = "INSERT INTO productos(codigo, descripcion, precio_compra, precio_venta, id_medida, id_categoria, id_proveedor ) VALUES (?,?,?,?,?,?,?)";
            $datos = array($this->codigo, $this->nombre, $this->precio_compra, $this->precio_venta, $this->id_medida,$this->id_categoria,$this->id_proveedor);
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
    public function modificarProducto(string $codigo, string $nombre, string $precio_compra,string $precio_venta, int $id_medida, int $id_categoria, int $id_proveedor, int $id)
    {
        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->precio_compra = $precio_compra;
        $this->precio_venta = $precio_venta;
        $this->id_medida = $id_medida;
        $this->id_categoria = $id_categoria;
        $this->id_proveedor = $id_proveedor;
        $this->id = $id;

        $vericar = "SELECT * FROM Productos WHERE Producto = '$this->Producto'";
        $comprobar = "SELECT * FROM Productos WHERE id = '$this->id' and Producto = '$this->Producto'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (empty($existe) ||  !empty($exist)) {
        
            $sql = "UPDATE productos SET codigo = ?, descripcion = ?, precio_compra = ?, precio_venta = ?, id_medida = ?, id_categoria = ?, id_proveedor = ? WHERE id = ?";
            $datos = array($this->codigo, $this->nombre, $this->precio_compra, $this->precio_venta, $this->id_medida,$this->id_categoria,$this->id_proveedor, $this->id);
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

    public function editarPro(int $id)
    {
        $sql = "SELECT * FROM productos WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function eliminarPro(int $id)
    {
        $sql = "DELETE  FROM Productos WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

}

?>