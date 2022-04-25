<?php
//print_r($_SESSION)
include "Views/Templates/header.php";
?>

<div class="container">
    <div id='calendar'></div>
</div>

<div class="modal fade" id="my_modal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-info">
                <h5 class="modal-title" id="titulo"></h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formulario">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <label for="codigo" class="form-label">Buscar Producto</label>
                                <input type="hidden" id="id" name="id"></input>
                                <input type="text" class="form-control" id="codigo" name="codigo"
                                    onkeyup="buscarCodigoVenta(event)"> </input>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-floating mb-3">
                                <label for="nombre" class="form-label">Descripción del Producto</label>
                                <input type="text" class="form-control" id="nombre" name="nombre"
                                    placeholder="Descripcion del Producto" disabled> </input>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <label for="cantidad">Cantidad</label>
                                <input id="cantidad" class="form-control" type="number" name="cantidad" onkeyup="ingresarApartado(event)"></input>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <label for="precio">Precio</label>
                                <input id="precio" class="form-control" type="text" name="precio"
                                    placeholder="Precio venta" disabled></input>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <label for="sub_total">Sub Total</label>
                                <input id="sub_total" class="form-control" type="text" name="sub_total"
                                    placeholder="Sub Total" disabled></input>
                            </div>

                        </div>
                        <div class="col-md-12 mb-2">
                            <div class="form-group">
                                <label for="select_cliente">Buscar Cliente</label>
                                <select id="select_cliente" class="form-controls select2 select2-hidden-accessible"
                                    name="select_cliente" style="width: 100%;">

                                </select>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <label for="start" class="form-label">Fecha</label>
                                <input type="date" class="form-control" id="start" name="start"> </input>

                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <label for="abono" class="form-label">Monto Abonar</label>
                                <input type="text" class="form-control" id="abono" name="abono"> </input>

                            </div>
                        </div>

                    </div>

                    <div class="table-resposive">
                        <table class="table table-light table-bordered table-hover">
                            <thead class=" thead-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Sub Total</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody id="tblDetalleApart">
                            </tbody>
                        </table>
                    </div>

                    <div class="form-floating mb-3">
                        <label for="total">Total a Pagar</label>
                        <input id="total" class="form-control" type="text" disabled >
                    </div>



                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning" type="button" data-dismiss="modal">Cancelar</button>

                    <button class="btn btn-danger" type="button" id="btnEliminar">Eliminar</button>
                    <button class="btn btn-info" id="btnAccion" type="button">Registrar</button>

                </div>
            </form>

        </div>
    </div>
</div>


<?php
//print_r($_SESSION)
include "Views/Templates/footer.php";
?>