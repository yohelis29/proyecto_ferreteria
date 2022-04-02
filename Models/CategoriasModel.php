<?php
class CategoriasModel extends Query{
    private  $nombre,  $id, $estado;
    public function __construct()
    {
        parent:: __construct();
    }

    public function getCategorias()
    {
      //  $sql = "SELECT * FROM dnis";
       // $data = $this->selectAll($sql);
       // return $data;
       $sql = "SELECT * FROM categorias";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarCategoria(string $nombre)
    {
       
        $this->nombre = $nombre;
       
            $verificar = "SELECT * FROM categorias WHERE nombre = '$this->nombre'";
            $existe = $this->select($verificar);
            if (empty($existe)) {
            $sql = "INSERT INTO categorias(nombre) VALUES (?)";
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
    public function modificarCate(string $nombre, int $id)
    { 
        


        $this->nombre = $nombre;
        $this->id = $id;
        $vericar = "SELECT * FROM categorias WHERE nombre = '$this->nombre'";
        $comprobar = "SELECT * FROM categorias WHERE id = '$this->id' and nombre = '$this->nombre'";
        $existe = $this->select($vericar);
        $exist = $this->select($comprobar);
        if (  empty($existe) || !empty($exist)) {

            $sql = "UPDATE categorias SET  nombre = ? WHERE id = ?";
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

    public function editarCate(int $id)
    {
        $sql = "SELECT * FROM categorias WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function accionCate(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE categorias SET estado = ? WHERE id = ?";
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