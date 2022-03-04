<?php 
    //print_r($_SESSION)
    include "Views/Templates/header.php";
?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Productos</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="frmProducto();"> <i class= "fas fa-plus"></i></button>
<table class="table table-light" id="tblProductos">
    <thead class="thead-dark">
        <tr>
            <th>Id</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>   
            <th>Stock</th>
            <th>Estado</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="nuevo_producto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="title">Registrar Producto</h5>
                <button class="close bg-primary" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" id="frmProducto">
                    <div class="form-group">
                        <label for="codigo">Codigo de barras</label>
                        <input type="hidden" id="id" name="id">
                        <input id="codigo" class="form-control" type="text" name="codigo" placeholder="Código de barras">
                    </div>
                    <div class="form-group">
                        <label for="nombre">Descripción</label>
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre del producto">
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                              <label for="precio_compra">Precio Compra</label>
                              <input type="text" name="precio_compra" id="precio_compra" class="form-control" placeholder="Precio Compra" aria-describedby="helpId">                    
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="precio_venta">Precio Venta</label>
                                <input type="text" name="precio_venta" id="precio_venta" class="form-control" placeholder="Precio venta" aria-describedby="helpId">                    
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="medida">Medidas</label>
                                <select id="medida" class="form-control" name="medida">
                                <?php foreach ($data['medidas'] as $row) { ?>
                                        <option value="<?php echo $row['id']; ?>"><?php echo $row['nombre']; ?></option>
                                <?php } ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="categoria">Categorias</label>
                                <select id="categoria" class="form-control" name="categoria">
                                <?php foreach ($data['categorias'] as $row) { ?>
                                        <option value="<?php echo $row['id']; ?>"><?php echo $row['nombre']; ?></option>
                                <?php } ?>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                    <div class="col-6">
                            <div class="form-group">
                                <label for="proveedor">Proveedor</label>
                                <select id="proveedor" class="form-control" name="proveedor">
                                <?php foreach ($data['proveedores'] as $row) { ?>
                                        <option value="<?php echo $row['id']; ?>"><?php echo $row['nombre']; ?></option>
                                <?php } ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary mb-2" type="button" onclick="registrarPro(event);" id= "btnAccion">Registrar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php 
    //print_r($_SESSION)
    include "Views/Templates/footer.php";

?>