<?php 
    //print_r($_SESSION)
    include "Views/Templates/header.php";
?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Clientes</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="frmCliente();"> <i class= "fas fa-plus"></i></button>
<table class="table table-light" id="tblClientes">
    <thead class="thead-dark">
        <tr>
            <th>Id</th>
            <th>Dni</th>
            <th>Nombre</th>
            <th>Telefono</th> 
            <th>Direccion</th>    
            <th>Estado</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="nuevo_Cliente" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="title">Nuevo Cliente</h5>
                <button class="close bg-primary" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" id="frmCliente">
                    <div class="form-group">
                        <label for="dni">Dni</label>
                        <input type="hidden" id="id" name="id">
                        <input id="dni" class="form-control" type="text" name="dni" placeholder="Documento de identidad">
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="telefono">Telefono</label>
                        <input id="telefono" class="form-control" type="text" name="telefono" placeholder="Telefono">
                    </div>
                   <div class="form-group">
                       <label for="direccion">Direccion</label>
                       <textarea id="direccion" class="form-control" name="direccion" rows="3" placeholder="Direccion"></textarea>
                   </div>
                    <button class="btn btn-primary mb-2" type="button" onclick="registrarCli(event);" id= "btnAccion">Registrar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php 
    //print_r($_SESSION)
    include "Views/Templates/footer.php";

?>