<?php
class UsuariosModel extends Query{
    private $usuario, $nombre, $clave, $id_caja, $id, $estado;
    public function __construct()
    {
        parent:: __construct();
    }
    public function getUsuario(string $usuario, string $clave)
    {
        $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave'";
        $data = $this->select($sql);
        return $data;
    }
    public function getCajas()
    {
        $sql = "SELECT * FROM caja WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getUsuarios()
    {
      //  $sql = "SELECT * FROM usuarios";
       // $data = $this->selectAll($sql);
       // return $data;
       $sql = "SELECT u.*, c.id as id_caja, c.caja FROM usuarios u INNER JOIN caja c WHERE u.id_caja = c.id";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarUsuario(string $usuario, string $nombre, string $clave, int $id_caja)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->clave = $clave;
        $this->id_caja = $id_caja;
            $vericar = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
            $existe = $this->select($vericar);
            if (empty($existe)) {
            $sql = "INSERT INTO usuarios(usuario, nombre, clave, id_caja) VALUES (?,?,?,?)";
            $datos = array($this->usuario, $this->nombre, $this->clave, $this->id_caja);
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
    public function modificarUsuario(string $usuario, string $nombre, int $id_caja, int $id)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->id = $id;
        $this->id_caja = $id_caja;

        $vericar = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
        $comprobar = "SELECT * FROM usuarios WHERE id = '$this->id' and usuario = '$this->usuario'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (empty($existe) ||  !empty($exist)) {
        
            $sql = "UPDATE usuarios SET usuario = ?, nombre = ?, id_caja = ? WHERE id = ?";
            $datos = array($this->usuario, $this->nombre, $this->id_caja, $this->id);
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
        $sql = "SELECT * FROM usuarios WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function eliminarUser(int $id)
    {
        $sql = "DELETE  FROM usuarios WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

}

?>