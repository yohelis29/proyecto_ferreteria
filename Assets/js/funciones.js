let tblUsuarios, tblClientes,tblCajas, tblCategorias, tblMedidas, tblProveedores, tblProductos;
document.addEventListener("DOMContentLoaded", function () {
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
            {'data' : 'codigo'},
            {'data' : 'descripcion'},
            {'data' : 'precio_venta'},
            {'data' : 'cantidad'},
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
               // console.log(this.responseText);
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
                        // console.log(this.responseText);
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
                    'Mensaje',
                    res,
                    'error'
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
                            'Mensaje',
                            res,
                            'error'
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
                        // console.log(this.responseText);
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
                        // console.log(this.responseText);
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
                    'Mensaje',
                    res,
                    'error'
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
                            'Mensaje',
                            res,
                            'error'
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
    console.log(nombre);
    if (codigo.value == "" || nombre.value == "" || precio_compra.value == "" || precio_venta.value == "" 
    || id_categoria.value == "" || id_medida.value == "" || id_proveedor.value ==  "") {
        
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
               // console.log(this.responseText);
               const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                     
                        icon: 'success',
                        title: 'Producto registrado exitosamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nuevo_producto").modal("hide");
                  tblProductos.ajax.reload();
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Producto actualizado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    $("#nuevo_producto").modal("hide");
                  tblProductos.ajax.reload();
                    
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
function btnEditarPro(id) {
    document.getElementById("title").innerHTML="Actualizar Producto";
    document.getElementById("btnAccion").innerHTML="Modificar";
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
                $("#nuevo_producto").modal("show"); 
            }
        }
    
}
function btnEliminarPro(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar el Producto?',
        text: "¡El producto se eliminara de forma permanente!",
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
                        'Producto eliminado con éxito',
                        'success'
                      )
                      tblProductos.ajax.reload();
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
                        // console.log(this.responseText);
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
                    'Mensaje',
                    res,
                    'error'
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
                            'Mensaje',
                            res,
                            'error'
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
                        // console.log(this.responseText);
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
                    'Mensaje',
                    res,
                    'error'
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
                            'Mensaje',
                            res,
                            'error'
                          )}
                    }
                }
            }
        }
    })
}

// fin Proveedores


