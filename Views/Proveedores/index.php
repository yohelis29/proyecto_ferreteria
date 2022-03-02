<?php 
    //print_r($_SESSION)
    include "Views/Templates/header.php";
?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Proveedores</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="frmProveedor();"> <i class= "fas fa-plus"></i></button>
<table class="table table-light" id="tblProveedores">
    <thead class="thead-dark">
        <tr>
            <th>Id</th>
            <th>Nombre</th>  
            <th>Teléfono</th>  
            <th>Estado</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="nuevo_Proveedor" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="title">Nuevo Proveedor</h5>
                <button class="close bg-primary" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" id="frmProveedor">
                <div class="form-floating mb-3">
                        <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="nombre">Teléfono</label>
                        <input id="telefono" class="form-control" type="text" name="telefono" placeholder="telefono">
                    </div>
                   
                    <button class="btn btn-primary mb-2" type="button" onclick="registrarProveedor(event);" id= "btnAccion">Registrar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php 
    //print_r($_SESSION)
    include "Views/Templates/footer.php";

?>