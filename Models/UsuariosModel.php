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

    public function getRoles()
    {
        $sql = "SELECT * FROM rol WHERE estado = 1 AND nombre !='Administrador'";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getUsuarios()
    {
 
       $sql = "SELECT u.*, c.id as id_caja, c.caja, r.id as id_rol , r.nombre as rol FROM usuarios u INNER JOIN caja c ON u.id_caja = c.id INNER JOIN rol r ON u.id_rol=r.id ";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarUsuario(string $usuario, string $nombre, string $clave, int $id_caja , int $id_rol)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->clave = $clave;
        $this->id_caja = $id_caja;
        $this->id_rol = $id_rol;
            $vericar = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
            $existe = $this->select($vericar);
            if (empty($existe)) {
            $sql = "INSERT INTO usuarios(usuario, nombre, clave, id_caja, id_rol) VALUES (?,?,?,?,?)";
            $datos = array($this->usuario, $this->nombre, $this->clave, $this->id_caja, $this->id_rol);
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
    public function modificarUsuario(string $usuario, string $nombre, int $id_caja, int $id_rol,int $id)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->id = $id;
        $this->id_caja = $id_caja;
        $this->id_rol = $id_rol;

        $vericar = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
        $comprobar = "SELECT * FROM usuarios WHERE id = '$this->id' and usuario = '$this->usuario'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (empty($existe) ||  !empty($exist)) {
        
            $sql = "UPDATE usuarios SET usuario = ?, nombre = ?, id_caja = ? , id_rol = ? WHERE id = ?";
            $datos = array($this->usuario, $this->nombre, $this->id_caja,$this->id_rol, $this->id);
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

    public function getPass(string $clave, int $id)
    {
        $sql = "SELECT * FROM usuarios WHERE clave = '$clave' AND id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function eliminarUser(int $id)
    {
        $sql = "DELETE  FROM usuarios WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function verificarPermiso(int $id_user, string $nombre){
        $sql = "SELECT p.id, p.permiso, d.id, u.id, d.id_permiso FROM permisos p INNER JOIN detalle_permisos d ON p.id = d.id_permiso INNER JOIN usuarios u ON u.id_rol=d.id_rol WHERE u.id = $id_user AND p.permiso = '$nombre'";
        $data = $this->selectAll($sql);
        return $data;
   
    }

    public function modificarPass(string $clave, int $id)
    {
        $sql = "UPDATE usuarios SET clave = ? WHERE id = ?";
            $datos = array($clave, $id);
            $data = $this->save($sql, $datos);
            return $data;
    }



}

?>