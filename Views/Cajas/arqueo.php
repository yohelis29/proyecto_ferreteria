<?php include "Views/Templates/header.php"; ?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active ">Arqueo de Caja</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="arqueoCaja();"><i class="fas fa-plus"></i></button>
<button class="btn btn-warning mb-2" type="button" onclick="cerrarCaja();">Cerrar caja</button>
<table class="table table-light" id="t_arqueo">
    <thead class="thead-dark">
        <tr>
            <th>Id</th>
            <th>Monto_inicial</th>
            <th>Monto_final</th>
            <th>Fecha_apertura</th>
            <th>Fecha_cierre</th>
            <th>Total ventas</th>
            <th>Monto Total</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div class="modal fade" id="abrir_caja" tabindex="-1" aria-labelledby="my_modal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title" id="title">Arqueo Caja</h5>
                <button class="close bg-primary" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" id="frmAbrirCaja" onclick="abrirArqueo(event);">
                    <div class="form-floating mb-3">
                        <input type="hidden" id="id" name="id">
                        <div class="form-group">
                        <label for="monto_inicial">Monto Inicial</label>
                        <input id="monto_inicial" class="form-control" type="text" name="monto_inicial" placeholder="Monto Inicial" required>
                    </div>
                    
                    <div id='ocultar_campos'>
                        <div class="form-group">
                            <label for="monto_final">Monto Final</label>
                            <input id="monto_final" class="form-control" type="text" disabled>
                        </div>
                        <div class="form-group">
                            <label for="total_ventas">Total Ventas</label>
                            <input id="total_ventas" class="form-control" type="text" disabled>
                        </div>
                        <div class="form-group">
                            <label for="monto_general">Monto Total</label>
                            <input id="monto_general" class="form-control" type="text" disabled>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit" id="btnAccion">Abrir</button>
                    <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>