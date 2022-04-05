<?php
class ProveedoresModel extends Query{
    private  $nombre,  $id, $estado;
    public function __construct()
    {
        parent:: __construct();
    }

    public function getProveedor()
    {

       $sql = "SELECT * FROM proveedores";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function registrarProv(string $nombre, string $telefono)
    {
       
        $this->nombre = $nombre;
        $this->telefono = $telefono;
       
            $verificar = "SELECT * FROM proveedores WHERE nombre = '$this->nombre'";
            $existe = $this->select($verificar);
            if (empty($existe)) {
            $sql = "INSERT INTO proveedores(nombre, telefono) VALUES (?,?)";
            $datos = array($this->nombre,$this->telefono);
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
    public function modificarProv(string $nombre,string $telefono, int $id)
    { 
        


        $this->nombre = $nombre;
        $this->telefono = $telefono;
        $this->id = $id;
        $vericar = "SELECT * FROM proveedores WHERE nombre = '$this->nombre'";
        $comprobar = "SELECT * FROM proveedores WHERE id = '$this->id' and nombre = '$this->nombre'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (  empty($existe) || !empty($exist)) {

            $sql = "UPDATE proveedores SET  nombre = ?, telefono = ? WHERE id = ?";
            $datos = array( $this->nombre, $this->telefono, $this->id);
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

    public function editarProv(int $id)
    {
        $sql = "SELECT * FROM proveedores WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function accionProv(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE proveedores SET estado = ? WHERE id = ?";
        $datos = array($this->estado, $this->id);
        $data = $this->save($sql, $datos);
        return $data;
    } 


    public function verificarPermiso(int $id_user, string $nombre , string $nombre2){
        $sql = "SELECT p.id, p.permiso, d.id, u.id, d.id_permiso FROM permisos p INNER JOIN detalle_permisos d ON p.id = d.id_permiso INNER JOIN usuarios u ON u.id_rol=d.id_rol WHERE u.id = $id_user AND (p.permiso = '$nombre' OR p.permiso ='$nombre2')";
        $data = $this->selectAll($sql);
        return $data;
   
    }
}

?>