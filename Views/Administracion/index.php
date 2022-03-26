<?php include "Views/Templates/header.php"; ?>

<div class="card">
    <div class="card-header bg-dark text-white">
        Datos de la Empresa
        
    </div>
    <div class="card-body">
        <form id="frmEmpresa">
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input id="id" class="form-control" type="hidden" name="id" value="<?php echo $data['id']?>">
                    <label for="nombre">Nombre</label>
                    <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre" value="<?php echo $data['nombre']?>">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="telefono">Telefono</label>
                    <input id="telefono" class="form-control" type="text" name="telefono" placeholder="Telefono" value="<?php echo $data['telefono']?>">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                     <label for="direccion">Direccion</label>
                     <input id="direccion" class="form-control" type="text" name="direccion" placeholder="Direccion" value="<?php echo $data['direccion']?>">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="my-textarea">Mensaje</label>
                    <textarea id="my-textarea" class="form-control" name="mensaje" placeholder="Mensaje" rows="3"><?php echo $data['mensaje']?></textarea>
                </div>
            </div>

            </div>            
            <button class="btn btn-primary" type="button" onclick="modificarEmpresa()">Modificar</button>
        </form>
    </div>
</div>

<?php include "Views/Templates/footer.php"; ?>