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

    public function registrarRol(string $nombre)
    {
       
        $this->nombre = $nombre;
       
            $verificar = "SELECT * FROM rol WHERE nombre = '$this->nombre'";
            $existe = $this->select($verificar);
            if (empty($existe)) {
            $sql = "INSERT INTO rol(nombre) VALUES (?)";
            $datos = array($this->nombre);
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
    public function modificarRol(string $nombre, int $id)
    { 
        


        $this->nombre = $nombre;
        $this->id = $id;
        $vericar = "SELECT * FROM rol WHERE nombre = '$this->nombre'";
        $comprobar = "SELECT * FROM rol WHERE id = '$this->id' and nombre = '$this->nombre'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (  empty($existe) || !empty($exist)) {

            $sql = "UPDATE rol SET  nombre = ? WHERE id = ?";
            $datos = array( $this->nombre, $this->id);
            $data = $this->save($sql, $datos);
            if ($data == 1 ) {
                $res = "modificado";
            } else {
                $res = "error";
            }
        }else{
       
            $res = "existe";
        }
        return $res;
    }

    public function editarRol(int $id)
    {
        $sql = "SELECT * FROM rol WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function accionRol(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE rol SET estado = ? WHERE id = ?";
        $datos = array($this->estado, $this->id);
        $data = $this->save($sql, $datos);
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