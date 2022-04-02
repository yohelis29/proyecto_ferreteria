<?php
class RolesModel extends Query{
    private $usuario, $nombre, $clave, $id_caja, $id, $estado;
    public function __construct()
    {
        parent:: __construct();
    }
 


    public function getRoles()
    {
       $sql = "SELECT * FROM rol";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function getModulos()
    {
       $sql = "SELECT * FROM modulos WHERE estado = 1";
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

    public function getPermisos()
    {
        $sql = "SELECT * FROM permisos ";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function registrarPermisos(int $id_rol, int $id_permiso)
    {

        $sql = "INSERT INTO detalle_permisos (id_rol, id_permiso) VALUES (?,?)";
        $datos = array ($id_rol, $id_permiso);
        $data = $this->save($sql, $datos);
        if($data == 1){
            $res = 'ok';
        }else{
            $res = 'error';
        }
        return $res;
    }

    public function eliminarPermisos(int $id_rol)
    {

        $sql = "DELETE FROM detalle_permisos WHERE id_rol = ?";
        $datos = array ($id_rol);
        $data = $this->save($sql, $datos);
        if($data == 1){
            $res = 'ok';
        }else{
            $res = 'error';
        }
        return $res;
    }

    public function getDetallesPermisos(int $id_rol)
    {
        $sql = "SELECT * FROM detalle_permisos WHERE id_rol = $id_rol";
        $data = $this->selectAll($sql);
        return $data;
    }


    public function verificarPermiso(int $id_user, string $nombre){
        $sql = "SELECT p.id, p.permiso, d.id, u.id, d.id_permiso FROM permisos p INNER JOIN detalle_permisos d ON p.id = d.id_permiso INNER JOIN usuarios u ON u.id_rol=d.id_rol WHERE u.id = $id_user AND p.permiso = '$nombre'";
        $data = $this->selectAll($sql);
        return $data;
   
    }
}

?>