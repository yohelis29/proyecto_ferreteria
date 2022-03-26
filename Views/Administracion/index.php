<?php include "Views/Templates/header.php"; ?>

<div class="card">
    <div class="card-header bg-dark text-white">
        Datos de la Empresa
    </div>
    <div class="card-body">
        <form id="frmEmpresa">
            <div class="form-group">
                <input id="id" class="form-control" type="hidden" name="id">
                <label for="nombre">Nombre</label>
                <input id="nombre" class="form-control" type="text" name="nombre">
            </div>
            <div class="form-group">
            <label for="telefono">Telefono</label>
                <input id="telefono" class="form-control" type="text" name="telefono">
            </div>
            <div class="form-group">
            <label for="direccion">Direccion</label>
                <input id="direccion" class="form-control" type="text" name="direccion">
            </div>
            <div class="form-group">
                <label for="my-textarea">Mensaje</label>
                <textarea id="my-textarea" class="form-control" name="mensaje" rows="3"></textarea>
            </div>
            <button class="btn btn-primary" type="button">Modificar</button>
        </form>
    </div>
</div>

<?php include "Views/Templates/footer.php"; ?>