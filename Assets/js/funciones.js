let tblUsuarios, tblClientes,tblCajas, tblCategorias, tblMedidas, tblProveedores, 
tblProductos, tblRoles, t_historial_c;
document.addEventListener("DOMContentLoaded", function () {
    $("#cliente").select2();
    tblUsuarios = $('#tblUsuarios').DataTable( {
        ajax: {
            url: base_url + "Usuarios/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'usuario'},
            {'data' : 'nombre'},
            {'data' : 'caja'},
            {'data' : 'rol'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );

    tblRoles = $('#tblRoles').DataTable( {
        ajax: {
            url: base_url + "Roles/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'nombre'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );

    
    tblClientes = $('#tblClientes').DataTable( {
        ajax: {
            url: base_url + "Clientes/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'dni'},
            {'data' : 'nombre'},
            {'data' : 'telefono'},
            {'data' : 'direccion'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );
    tblCajas = $('#tblCajas').DataTable( {
        ajax: {
            url: base_url + "Cajas/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'caja'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );
// Tabla Categorias
    tblCategorias = $('#tblCategorias').DataTable( {
        ajax: {
            url: base_url + "Categorias/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'nombre'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );

    // Tabla Medidas
    tblMedidas = $('#tblMedidas').DataTable( {
        ajax: {
            url: base_url + "Medidas/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'nombre'},
            {'data' : 'nombre_corto'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );

     // Tabla Proveedores
     tblProveedores = $('#tblProveedores').DataTable( {
        ajax: {
            url: base_url + "Proveedores/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'nombre'},
            {'data' : 'telefono'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );
      // Tabla productos
      tblProductos = $('#tblProductos').DataTable( {
        ajax: {
            url: base_url + "Productos/listar" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'imagen'},
            {'data' : 'codigo'},
            {'data' : 'descripcion'},
            {'data' : 'precio_venta'},
            {'data' : 'cantidad'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );
    //Fin productos
    t_historial_c= $('#t_historial_c').DataTable( {
        ajax: {
            url: base_url + "Compras/listar_historial" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'total'},
            {'data' : 'fecha'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );
})

function frmUsuario() {
    document.getElementById("title").innerHTML="Registrar usuario";
    document.getElementById("btnAccion").innerHTML="Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo_usuario").modal("show");
    document.getElementById("id").value = "";
}
function registrarUser(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    const caja = document.getElementById("caja");
    const rol = document.getElementById("rol");

    if (usuario.value == "" || nombre.value == "" || caja.value == "" ) {
        Swal.fire({
          
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Usuarios/registrar";
        const frm = document.getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Usuario registrado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nuevo_usuario").modal("hide");
                  tblUsuarios.ajax.reload();
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Usuario modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    $("#nuevo_usuario").modal("hide");
                  tblUsuarios.ajax.reload();
                    
                }else{
                    Swal.fire({
                       
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                }
            }
        }
    }


}
function btnEditarUser(id) {
    document.getElementById("title").innerHTML="Editar usuario";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Usuarios/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                usuario = document.getElementById("id").value = res.id;
                usuario = document.getElementById("usuario").value = res.usuario;
                nombre = document.getElementById("nombre").value = res.nombre;
                caja = document.getElementById("caja").value = res.id_caja;
                document.getElementById("claves").classList.add("d-none");
                $("#nuevo_usuario").modal("show");
            }
        }
    
}
function btnEliminarUser(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡El usuario se eliminara de forma permanente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Usuarios/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Usuario eliminado con éxito',
                        'success'
                      )
                      tblUsuarios.ajax.reload();
                }else{ Swal.fire(
                    'Mensaje',
                    res,
                    'error'
                  )}
            }
        }
          
        }
      })
}
////Fin Usuario
function frmCliente() {
    document.getElementById("title").innerHTML="Nuevo Cliente";
    document.getElementById("btnAccion").innerHTML="Registrar";
    
        document.getElementById("frmCliente").reset();
        $("#nuevo_Cliente").modal("show");
    document.getElementById("id").value = "";
}

function registrarCli(e) {
    e.preventDefault();
    const dni = document.getElementById("dni");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
  

    if (dni.value == "" || nombre.value == "" || telefono.value == "" || direccion.value == "" ) {
        Swal.fire({
          
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Clientes/registrar";
        const frm = document.getElementById("frmCliente");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Cliente registrado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nuevo_Cliente").modal("hide");
                   tblClientes.ajax.reload();
                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Cliente modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                  tblClientes.ajax.reload();
                  $("#nuevo_Cliente").modal("hide");
                   
                }else{
                    Swal.fire({
                       
                        icon: res.icono,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                }
            }
        }
    }


}
function btnEditarCli(id) {
    document.getElementById("title").innerHTML="Editar Cliente";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Clientes/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("dni").value = res.dni;
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("telefono").value = res.telefono;
                document.getElementById("direccion").value = res.direccion;
                $("#nuevo_Cliente").modal("show");
               
            }
        }
    
}
function btnEliminarCli(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡El cliente se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Clientes/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Cliente desactivado con éxito',
                        'success'
                      )
                      tblClientes.ajax.reload();
                }else{ Swal.fire(
                    res.msg,
                    res,
                    res.icono
                  )}
            }
        }
          
        }
      })
}
function btnReingresarCli(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Clientes/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Cliente activado con éxito',
                                'success'
                              )
                              tblClientes.ajax.reload();
                        }else{ Swal.fire(
                      
                            res.msg,
                            res,
                            res.icono
                          )}
                    }
                }
            }
        }
    })
}
///Fin cliente

function frmCaja() {
    document.getElementById("title").textContent = "Nuevo Caja";
    document.getElementById("btnAccion").textContent = "Registrar";
    document.getElementById("frmCaja").reset();
    document.getElementById("id").value = "";
    $('#nuevoCaja').modal('show');

}
function registrarCaja(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    if (nombre.value == "") {
        Swal.fire({
          
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Cajas/registrar";
        const frm = document.getElementById("frmCaja");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Caja registrada correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nuevoCaja").modal("hide");
                   tblCajas.ajax.reload();                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Caja modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    $("#nuevoCaja").modal("hide");
                    tblCajas.ajax.reload();
                   
                }else{
                    Swal.fire({
                       
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                }
            }
        }
    }
}
function btnEditarCaja(id) {
    document.getElementById("title").textContent = "Actualizar caja";
    document.getElementById("btnAccion").textContent = "Modificar";
    const url = base_url + "Cajas/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("nombre").value = res.caja;
            $('#nuevoCaja').modal('show');
        }
    }
}
function btnEliminarCaja(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡La caja se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Cajas/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Caja desactivada con éxito',
                        'success'
                      )
                      //tblCajas.ajax.reload();
                }else{ Swal.fire(
                    'Mensaje',
                    res,
                    'error'
                  )}
            }
        }
          
        }
      })
}
function btnReingresarCaja(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Cajas/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Caja activado con éxito',
                                'success'
                              )
                              tblCajas.ajax.reload();
                        }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                          )}
                    }
                }
            }
        }
    })
}//Fin Cajas

//--------------------------------------------------------------------------------------------------------------
//Comienzo Categorias
function frmCategoria() {
    document.getElementById("title").innerHTML="Nueva Categoria";
    document.getElementById("btnAccion").innerHTML="Registrar";
        document.getElementById("frmCategoria").reset();
          document.getElementById("id").value = ""; 
        $("#nueva_Categoria").modal("show");
     

 
}

function registrarCate(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    
    if ( nombre.value == "" ) {
        Swal.fire({
          
            icon: 'error',
            title:'¡Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Categorias/registrar";
        const frm = document.getElementById("frmCategoria");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Categoría registrada correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nueva_Categoria").modal("hide");
                   tblCategorias.ajax.reload();
                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Categoría modificada correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                  tblCategorias.ajax.reload();
                  $("#nueva_Categoria").modal("hide");
                   
                }else{
                    Swal.fire({
                        icon: res.icono,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 3000
                        
                    }) 
                }
            }
        }
    }


}
function btnEditarCate(id) {
    document.getElementById("title").innerHTML="Editar Categoria";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Categorias/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id; 
                document.getElementById("nombre").value = res.nombre;
                $("#nueva_Categoria").modal("show");
               
            }
        }
    
}
function btnEliminarCate(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡La categoría se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Categorias/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Categoría desactivada con éxito',
                        'success'
                      )
                      tblCategorias.ajax.reload();
                }else{ Swal.fire(
                    res.msg,
                        res,
                        res.icono
                  )}
            }
        }
          
        }
      })
}
function btnReingresarCate(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Categorias/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Categoría activada con éxito',
                                'success'
                              )
                              tblCategorias.ajax.reload();
                        }else{ Swal.fire(
                        res.msg,
                        res,
                        res.icono
                          )}
                    }
                }
            }
        }
    })
}

// fin Categorias
// Funciones para registro de productos
function frmProducto() {
    document.getElementById("title").innerHTML="Registrar Producto";
    document.getElementById("btnAccion").innerHTML="Registrar";
    document.getElementById("frmProducto").reset();
    document.getElementById("id").value = "";
    $("#nuevo_producto").modal("show");
    deleteImg();
}
function registrarPro(e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo");
    const nombre = document.getElementById("nombre");
    const precio_compra = document.getElementById("precio_compra");
    const precio_venta = document.getElementById("precio_venta");
    const id_medida = document.getElementById("medida");
    const id_categoria = document.getElementById("categoria");
    const id_proveedor = document.getElementById("proveedor");

    if (codigo.value == "" || nombre.value == "" || precio_compra.value == "" || precio_venta.value == "" || precio_compra.value == "") {
        Swal.fire({
          
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Productos/registrar";
        const frm = document.getElementById("frmProducto");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                    icon: 'success',
                    title: 'Producto registrado correctamente',
                    showConfirmButton: false,
                    timer: 3000
                }) 
                frm.reset();
                $("#nuevo_producto").modal("hide");
                tblProductos.ajax.reload();
                }else if (res == "modificado") {
                   Swal.fire({
                        
                   icon: 'success',
                   title: 'Producto modificado correctamente',
                   showConfirmButton: false,
                   timer: 3000
                   }) 
                   $("#nuevo_producto").modal("hide");
                   tblProductos.ajax.reload();
                    
                }else{
                Swal.fire({
                       
                    icon: res.icono,
                    title: res.msg,
                    showConfirmButton: false,
                    timer: 3000
                  }) 
                }
            }
        }
    }


}
function btnEditarPro(id) {
    document.getElementById("title").innerHTML="Editar Producto";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Productos/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //console.log(this.responseText);
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("codigo").value = res.codigo;
                document.getElementById("nombre").value = res.descripcion;
                document.getElementById("precio_compra").value = res.precio_compra;
                document.getElementById("precio_venta").value = res.precio_venta;
                document.getElementById("medida").value = res.id_medida;
                document.getElementById("categoria").value = res.id_categoria;
                document.getElementById("proveedor").value = res.id_proveedor;
                document.getElementById("img-preview").src = base_url + 'Assets/img/' + res.foto;
                document.getElementById("icon-cerrar").innerHTML = ` 
                <button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button>`;
                document.getElementById("icon-image").classList.add("d-none");
                document.getElementById("foto_actual").value = res.foto;
                $("#nuevo_producto").modal("show");
            }
        }
    
}
function btnEliminarPro(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡El producto se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Productos/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Producto desactivado con éxito',
                        'success'
                      )
                      tblProductos.ajax.reload();
                }else{ Swal.fire(
                    res.msg,
                    res,
                    res.icono
                  )}
            }
        }
          
        }
      })
}
function btnReingresarPro(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Productos/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Producto activado con éxito',
                                'success'
                              )
                              tblProductos.ajax.reload();
                        }else{ Swal.fire(
                            res.msg,
                            res,
                            res.icono
                          )}
                    }
                }
            }
        }
    })
}
//funciones para las imagenes
function preview(e) {
   const url = e.target.files[0];
   const urlTmp = URL.createObjectURL(url);
   document.getElementById("img-preview").src = urlTmp;
   document.getElementById("icon-image").classList.add("d-none");
   document.getElementById("icon-cerrar").innerHTML = ` 
   <button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button>
   ${url['name']}`;
}
function deleteImg() {
    document.getElementById("icon-cerrar").innerHTML = '';
    document.getElementById("icon-image").classList.remove("d-none");
    document.getElementById("img-preview").src = '';
    document.getElementById("imagen").value = '';
    document.getElementById("foto_actual").value = '';
}

//--------------------------------------------------------------------------------------------------------------
//Comienzo Medidas
function frmMedida() {
    document.getElementById("title").innerHTML="Nueva Medida";
    document.getElementById("btnAccion").innerHTML="Registrar";
        document.getElementById("frmMedida").reset();
          document.getElementById("id").value = ""; 
        $("#nueva_Medida").modal("show");
     

 
}

function registrarMedida(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const nombre_corto = document.getElementById("nombre_corto");
    
    if ( nombre.value == "" || nombre_corto.value=="" ) {
        Swal.fire({
          
            icon: 'error',
            title:'¡Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Medidas/registrar";
        const frm = document.getElementById("frmMedida");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Medida registrada correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nueva_Medida").modal("hide");
                   tblMedidas.ajax.reload();
                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Medida modificada correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                  tblMedidas.ajax.reload();
                  $("#nueva_Medida").modal("hide");
                   
                }else{
                    Swal.fire({
                       
                        icon: res.icono,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                }
            }
        }
    }


}
function btnEditarMedida(id) {
    document.getElementById("title").innerHTML="Editar Medida";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Medidas/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id; 
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("nombre_corto").value = res.nombre_corto;
                $("#nueva_Medida").modal("show");
               
            }
        }
    
}
function btnEliminarMedida(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡La medida se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Medidas/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Medida desactivada con éxito',
                        'success'
                      )
                      tblMedidas.ajax.reload();
                }else{ Swal.fire(
                    res.msg,
                    res,
                    res.icono
                  )}
            }
        }
          
        }
      })
}
function btnReingresarMedida(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Medidas/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Medida activada con éxito',
                                'success'
                              )
                              tblMedidas.ajax.reload();
                        }else{ Swal.fire(
                        res.msg,
                        res,
                        res.icono
                          )}
                    }
                }
            }
        }
    })
}

// fin Medidas

//--------------------------------------------------------------------------------------------------------------
//Comienzo Proveedores
function frmProveedor() {
    document.getElementById("title").innerHTML="Nuevo Proveedor";
    document.getElementById("btnAccion").innerHTML="Registrar";
    document.getElementById("frmProveedor").reset();
          document.getElementById("id").value = ""; 
        $("#nuevo_Proveedor").modal("show");
     

 
}

function registrarProveedor(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    
    if ( nombre.value == "" || telefono.value=="" ) {
        Swal.fire({
          
            icon: 'error',
            title:'¡Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Proveedores/registrar";
        const frm = document.getElementById("frmProveedor");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Proveedor registrado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nuevo_Proveedor").modal("hide");
                   tblProveedores.ajax.reload();
                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Proveedor modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                  tblProveedores.ajax.reload();
                  $("#nuevo_Proveedor").modal("hide");
                   
                }else{
                    Swal.fire({
                       
                        icon: res.icono,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                }
            }
        }
    }


}
function btnEditarProv(id) {
    document.getElementById("title").innerHTML="Editar Proveedor";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Proveedores/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id; 
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("telefono").value = res.telefono;
                $("#nuevo_Proveedor").modal("show");
               
            }
        }
    
}
function btnEliminarProv(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡El proveedor se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Proveedores/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Proveedor desactivado con éxito',
                        'success'
                      )
                      tblProveedores.ajax.reload();
                }else{ Swal.fire(
                    res.msg,
                    res,
                    res.icono
                  )}
            }
        }
          
        }
      })
}
function btnReingresarProv(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Proveedores/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Proveedor activado con éxito',
                                'success'
                              )
                              tblProveedores.ajax.reload();
                        }else{ Swal.fire(
                            res.msg,
                            res,
                            res.icono
                          )}
                    }
                }
            }
        }
    })
}

// fin Proveedores

//--------------------------------------------------------------------------------------------------------------
//Comienzo Compras

function buscarCodigo(e){
    e.preventDefault();

    if(e.which==13){
        const cod = document.getElementById("codigo").value;
        const url = base_url + "Compras/buscarCodigo/" + cod;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);

               if(res){

                document.getElementById("nombre").value = res.descripcion;
                document.getElementById("precio").value = res.precio_compra;
                document.getElementById("id").value = res.id;
                document.getElementById("cantidad").focus();
               }else{

                Swal.fire({
          
                    icon: 'error',
                    title:'¡Producto no existe!',
                    showConfirmButton: false,
                    timer: 2000
                })
                document.getElementById("codigo").value = '';
                document.getElementById("codigo").focus();


               }

            }
        }
    }



}
function buscarCodigoVenta(e){
    e.preventDefault();

    if(e.which==13){
        const cod = document.getElementById("codigo").value;
        const url = base_url + "Compras/buscarCodigo/" + cod;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);

               if(res){

                document.getElementById("nombre").value = res.descripcion;
                document.getElementById("precio").value = res.precio_venta;
                document.getElementById("id").value = res.id;
                document.getElementById("cantidad").focus();
               }else{

                Swal.fire({
          
                    icon: 'error',
                    title:'¡Producto no existe!',
                    showConfirmButton: false,
                    timer: 2000
                })
                document.getElementById("codigo").value = '';
                document.getElementById("codigo").focus();


               }

            }
        }
    }



}
function calcularPrecio(e){
    e.preventDefault();
    const cant = document.getElementById("cantidad").value;
    const precio= document.getElementById("precio").value;
    document.getElementById("sub_total").value= precio*cant;
    if (e.which == 13){
        if (cant > 0) {
            const url = base_url + "Compras/ingresar";
            const frm = document.getElementById("frmCompra");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
               if (res == 'ok'){
                Swal.fire({
          
                    icon: 'success',
                    title:'¡Producto Ingresado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalle();
               }else if(res == 'modificado'){
                Swal.fire({
          
                    icon: 'success',
                    title:'¡Producto actualizado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalle();
               }

            }
        }
        }
    }
      
}
function calcularPrecioVenta(e){

    e.preventDefault();
    const cant = document.getElementById("cantidad").value;
    const precio= document.getElementById("precio").value;
    document.getElementById("sub_total").value= precio*cant;
    if (e.which == 13){
        if (cant > 0) {
            const url = base_url + "Compras/ingresarVenta";
            const frm = document.getElementById("frmVenta");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
               if (res == 'ok'){
                Swal.fire({
          
                    icon: 'success',
                    title:'¡Producto Ingresado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalleVenta();
               }else if(res == 'modificado'){
                Swal.fire({
          
                    icon: 'success',
                    title:'¡Producto actualizado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                  cargarDetalleVenta();
               }
            else{ Swal.fire(
                res.msg,
                res,
                res.icono
              )}

 
        }
        }
    }
      
      
}
}

if (document.getElementById('tblDetalle')) {
    cargarDetalle();
}
if (document.getElementById('tblDetalleVenta')) {
    cargarDetalleVenta();
}
function cargarDetalle() {


const url = base_url + "Compras/listar/detalle";
const http = new XMLHttpRequest();
http.open("GET", url, true);
http.send();
http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      let html = '';
      res.detalle.forEach(row => {
          html += `<tr>
          <td>${row['id']}</td>
          <td>${row['descripcion']}</td>
          <td>${row['cantidad']}</td>
          <td>${row['precio']}</td>
          <td>${row['sub_total']}</td>
          <td>
          <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row['id']},1)"><i class="fas fa-trash-alt"></i></button>
          </td>
          </tr>`;

      });
      document.getElementById("tblDetalle").innerHTML = html;
      document.getElementById("total").value = res.total_pagar.total;

    }
}
}
function cargarDetalleVenta() {


const url = base_url + "Compras/listar/detalle_temp";
const http = new XMLHttpRequest();
http.open("GET", url, true);
http.send();
http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      let html = '';
      res.detalle.forEach(row => {
          html += `<tr>
          <td>${row['id']}</td>
          <td>${row['descripcion']}</td>
          <td>${row['cantidad']}</td>
          <td>${row['precio']}</td>
          <td>${row['sub_total']}</td>
          <td>
          <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row['id']},2)"><i class="fas fa-trash-alt"></i></button>
          </td>
          </tr>`;

      });
      document.getElementById("tblDetalleVenta").innerHTML = html;
      document.getElementById("total").value = res.total_pagar.total;

    }
}
}
function deleteDetalle(id, accion) {
   
    

  
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
            let url;
            if(accion == 1){
                url = base_url + "Compras/delete/"+id
            }else{
                url = base_url + "Compras/deleteVenta/"+id 
            }
           
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
             const res = JSON.parse(this.responseText); 
        if(res == 'ok'){
            Swal.fire({
                
                icon: 'success',
                title: 'Producto Eliminado',
                showConfirmButton: false,
                timer: 3000
                }) 
                if(accion == 1){
                    cargarDetalle();
                }else{
                    cargarDetalleVenta();
                }
         }else{
            Swal.fire({
                
                icon: 'error',
                title: 'Error al eliminar el producto',
                showConfirmButton: false,
                timer: 3000
                }) 
         }      

    }
}
}

})
}


function procesar(accion){

    Swal.fire({
        title: 'Esta seguro de realizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {

            let url;
            if (accion == 1) {
                url = base_url + "Compras/registrarCompra";
            }else{
                const id_cliente = document.getElementById('cliente').value;
                url = base_url + "Compras/registrarVenta/" + id_cliente;
            }
            
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                   
                    const res = JSON.parse(this.responseText);
                    if (res.msg == "ok") {
                        alertas(res.msg, res.icono);
                        let ruta;
                        if (accion == 1) {
                            ruta = base_url + 'Compras/generarPdf/' + res.id_compra
                        }else {
                            ruta = base_url + 'Compras/generarPdfVenta/' + res.id_venta
                        }

                        window.open(ruta);
                        setTimeout(() =>{
                            window.location.reload();

                        }, 300);
                    }else{ Swal.fire(
                        'Mensaje!',
                        res,
                        'error'
                    )}
                }
                
            }
        }
    })

}

function modificarEmpresa() {
    const frm = document.getElementById('frmEmpresa');
    const url = base_url + "Administracion/modificar" ;
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          
         const res = JSON.parse(this.responseText);
          
        if (res == 'ok') {
            alertas('Modificado', 'success');
        } 

        }
        
    }

}


//-------------------------------------------------------------------------------------
//Permisos


function registrarPermisos(e){
    e.preventDefault();
    const url = base_url + "Roles/registrarPermisos" ;
    const frm = document.getElementById('formulario');
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            if(res != ''){
            
                alertas(res.msg , res.icono);
            }
            else{
                alertas('Error no identificado', 'error'); 
            }
        }
    }
}


//Roles
function frmRol() {
    document.getElementById("title").innerHTML="Nuevo Rol";
    document.getElementById("btnAccion").innerHTML="Registrar";
     document.getElementById("frmRol").reset();
          document.getElementById("id").value = ""; 
        $("#nuevo_Rol").modal("show");
     

 
}

function registrarRol(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    
    if ( nombre.value == "" ) {
        Swal.fire({
          
            icon: 'error',
            title:'¡Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Roles/registrar";
        const frm = document.getElementById("frmRol");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Rol registrado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nuevo_Rol").modal("hide");
                   tblRoles.ajax.reload();
                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Rol modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                  tblRoles.ajax.reload();
                  $("#nuevo_Rol").modal("hide");
                   
                }else{
                    Swal.fire({
                        icon: res.icono,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 3000
                        
                    }) 
                }
            }
        }
    }


}
function btnEditarRol(id) {
    document.getElementById("title").innerHTML="Editar Rol";
    document.getElementById("btnAccion").innerHTML="Actualizar";
    const url = base_url + "Roles/editar/"+id;
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id; 
                document.getElementById("nombre").value = res.nombre;
                $("#nuevo_Rol").modal("show");
               
            }
        }
    
}
function btnEliminarRol(id) {
    Swal.fire({
        title: '¿Está seguro de desactivar?',
        text: "¡El Rol se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
             const url = base_url + "Roles/eliminar/"+id;
             const http = new XMLHttpRequest();
             http.open("GET", url, true);
             http.send();
             http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    Swal.fire(
                        'Mensaje',
                        'Rol desactivado con éxito',
                        'success'
                      )
                      tblRoles.ajax.reload();
                }else{ Swal.fire(
                    res.msg,
                        res,
                        res.icono
                  )}
            }
        }
          
        }
      })
}
function btnReingresarRol(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Roles/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire(
                                'Mensaje',
                                'Rol activado con éxito',
                                'success'
                              )
                              tblRoles.ajax.reload();
                        }else{ Swal.fire(
                        res.msg,
                        res,
                        res.icono
                          )}
                    }
                }
            }
        }
    })
}

function alertas(mensaje, icono){
    Swal.fire({
                
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
        }) 

}

function btnAnularC(id){
   
    Swal.fire({
        title: 'Esta seguro de anular la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {

            const url = base_url + "Compras/anularCompra/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {   
                    const res = JSON.parse(this.responseText);
                    alertas(res.msg,res.icono);
                    t_historial_c.ajax.reload();
                }
                
            }
        }
    })

}


