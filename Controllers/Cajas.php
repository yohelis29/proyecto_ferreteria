<?php
class Cajas extends Controller{
    public function __construct() {
        session_start();
        if (empty($_SESSION['activo'])) {
            header("location: ".base_url);
        }
        parent::__construct();
    }
    public function index()
    {
        $this->views->getView($this, "index");
    }

    public function listar()
    {
        $data = $this->model->getCajas('caja');
        for ($i=0; $i < count($data); $i++) { 
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-primary" type="button" onclick="btnEditarCaja(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button" onclick="btnEliminarCaja(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                <div/>';
            }else{
                $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-success" type="button" onclick="btnReingresarCaja(' . $data[$i]['id'] . ');"><i class="fas fa-circle"></i></button>
                <div/>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function registrar()
    {
        $caja = $_POST['nombre'];
        $id = $_POST['id'];
        if (empty($caja)) {
            $msg = "Todos los campos son obligatorios";
        }else{
            if ($id == "") {
                    $data = $this->model->registrarCaja($caja);
                    if ($data == "ok") {
                        $msg = "si";
                     }else if($data == "existe"){
                        $msg = "La ya existe";
                     }else {
                         $msg ="Error al registrar caja";
                     }
                     
            }else{
                $data = $this->model->modificarCaja($caja, $id);
                if ($data == "modificado") {
                    $msg = "modificado";
                 }else if($data=="existe") {
                     $msg ="Ya existe";
                 }else{
                     $msg ="Error al modificar"; 
                 }
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function editar(int $id)
    {
        $data = $this->model->editarCaja($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function eliminar(int $id)
    {
        $data = $this->model->accionCaja(0, $id);
        if ($data == 1) {
            $msg = "ok";

        }else{
            $msg = "error";

        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function reingresar(int $id)
    {
        $data = $this->model->accionCaja(1, $id);
        if ($data == 1) {
            $msg = "ok";

        } else {
            $msg = "error";

        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
}