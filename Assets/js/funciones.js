let tblUsuarios, tblClientes,tblCajas, tblCategorias, tblMedidas, tblProveedores, 
tblProductos, tblRoles, t_historial_c, t_historial_v, tipo, t_arqueo;
let frm = document.getElementById('formulario');
let eliminar = document.getElementById('btnEliminar');
document.addEventListener("DOMContentLoaded", function () {
    if ( document.getElementById('my_modal')){
        myModal = new bootstrap.Modal(document.getElementById('my_modal'));
    }
if (document.getElementById('calendar')){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl,{
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar:{
            left: 'prev next today',
            center: 'title',
            right: 'dayGridMonth timeGridWeek listWeek'
        },
        events: base_url + 'Home/listar',
        editable: true,
        dateClick: function(info){
           frm.reset();
            document.getElementById('id').value = '';
            eliminar.classList.add('d-none');
            document.getElementById('start').value = info.dataSrc;
         document.getElementById('btnAccion').textContent = 'Registrar';
            document.getElementById('titulo').textContent = ' Registro de Evento';
            myModal.show();
        },
        eventClick : function(info){
            console.log(info);
            eliminar.classList.remove('d-none');
            document.getElementById('titulo').textContent = 'Modificar Evento';
            document.getElementById('btnAccion').textContent = 'Modificar';
            document.getElementById('id').value = info.event.id;
            document.getElementById('title').value = info.event.title;
            document.getElementById('start').value = info.event.startStr;
            document.getElementById('color').value = info.event.backgroundColor;
            myModal.show();
        },
        eventDrop : function (info){
            const id = info.event.id;
            const fecha = info.event.startStr;
            const url = base_url + 'Home/drop';
            const http = new XMLHttpRequest();
            const data = new FormData();
            data.append('id', id);
            data.append('fecha', fecha);
            http.open('POST', url, true);
            http.send(data);
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    console.log(this.responseText);
                    const respuesta = JSON.parse(this.responseText);
                    console.log(respuesta);
                    if (respuesta.estado){
                        calendar.refetchEvents();
                    }
                    Swal.fire(
                        'Aviso', 
                        respuesta.msg,
                        respuesta.tipo
                    )

                }
            }

        }
    });
    calendar.render();
    const btnAccion = document.getElementById('btnAccion');
    btnAccion.addEventListener('click', function () {
        const select_cliente = document.getElementById('select_cliente').value;
        const abono = document.getElementById('abono').value;
        if (select_cliente == '' || abono == '') {
            Swal.fire(
                'Aviso',
                'Todos los campos son requeridos',
                'warning'
            )
        } else {
            const url = base_url + 'Apartados/registrar';
            const http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.send(new FormData(frm));
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const respuesta = JSON.parse(this.responseText);
                    console.log(respuesta);
                    if (respuesta.estado) {
                        calendar.refetchEvents();
                    }
                    myModal.hide();
                    Swal.fire(
                        'Aviso',
                        respuesta.msg,
                        respuesta.tipo

                    )
                }
            }

        }
    })

}
   

$("#select_cliente").select2({
  
   dropdownParent: $('#my_modal'),
    ajax: {
      url: base_url + 'Clientes/buscar',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          cli: params.term, 
        };
      },
      processResults: function (data ) {
      
  
        return {
          results: data.items
          
        };
      },
      cache: true
    },
    placeholder: 'Buscar Cliente',
    minimumInputLength: 2,
  });

    
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

    t_historial_v= $('#t_historial_v').DataTable( {
        ajax: {
            url: base_url + "Compras/listar_historial_venta",
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'nombre'},
            {'data' : 'total'},
            {'data' : 'fecha'},
            {'data' : 'estado'},
            {'data' : 'acciones'}

        ]
    } );
    t_arqueo = $('#t_arqueo').DataTable( {
        ajax: {
            url: base_url + "Cajas/listar_arqueo" ,
            dataSrc: ''
        },
        columns: [ 
            {'data' : 'id'},
            {'data' : 'monto_inicial'},
            {'data' : 'monto_final'},
            {'data' : 'fecha_apertura'},
            {'data' : 'fecha_cierre'},
            {'data' : 'total_ventas'},
            {'data' : 'monto_total'},
            {'data' : 'estado'}
            

        ]
    } );
})
function frmCambiarPass(e) {
    e.preventDefault();
    const actual = document.getElementById('clave_actual').value;
    const nueva = document.getElementById('clave_nueva').value;
    const confirmar = document.getElementById('confirmar_clave').value;
    if (actual == '' || nueva == '' || confirmar == '') {
        alertas('todos los campos son obligatorios','warning');
    }else{
        if (nueva != confirmar) {
            alertas('Las contrase??as no coinciden','warning');
           }else{
                 const url = base_url + "Usuarios/cambiarPass";
                 const frm = document.getElementById("frmCambiarPass");
                 const http = new XMLHttpRequest();
                 http.open("POST", url, true);
                 http.send(new FormData(frm));
                 http.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        alertas(res.msg, res.icono);
                        $("#cambiarPass").modal("hide");
                        frm.reset();
                       
                    }
                } 
            }   
        
    }
}

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
        title: '??Est?? seguro de eliminar?',
        text: "??El usuario se eliminara de forma permanente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Usuario eliminado con ??xito',
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
        title: '??Est?? seguro de desactivar?',
        text: "??El cliente se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Cliente desactivado con ??xito',
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
                                'Cliente activado con ??xito',
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
        title: '??Est?? seguro de desactivar?',
        text: "??La caja se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Caja desactivada con ??xito',
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
                                'Caja activado con ??xito',
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
            title:'??Todos los campos son obligatorios!',
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
                        title: 'Categor??a registrada correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    frm.reset();
                    $("#nueva_Categoria").modal("hide");
                   tblCategorias.ajax.reload();
                    
                }else if (res == "modificado") {
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Categor??a modificada correctamente',
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
        title: '??Est?? seguro de desactivar?',
        text: "??La categor??a se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Categor??a desactivada con ??xito',
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
                                'Categor??a activada con ??xito',
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
        title: '??Est?? seguro de desactivar?',
        text: "??El producto se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Producto desactivado con ??xito',
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
                                'Producto activado con ??xito',
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
            title:'??Todos los campos son obligatorios!',
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
        title: '??Est?? seguro de desactivar?',
        text: "??La medida se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Medida desactivada con ??xito',
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
                                'Medida activada con ??xito',
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
            title:'??Todos los campos son obligatorios!',
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
        title: '??Est?? seguro de desactivar?',
        text: "??El proveedor se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Proveedor desactivado con ??xito',
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
                                'Proveedor activado con ??xito',
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
                    title:'??Producto no existe!',
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
                    title:'??Producto no existe!',
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
                    title:'??Producto Ingresado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalle();
               }else if(res == 'modificado'){
                Swal.fire({
          
                    icon: 'success',
                    title:'??Producto actualizado!',
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
                    title:'??Producto Ingresado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalleVenta();
               }else if(res == 'modificado'){
                Swal.fire({
          
                    icon: 'success',
                    title:'??Producto actualizado!',
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
          <td><input class="form-control" placeholder="Desc" type="text" onkeyup="calcularDescuento(event,${row['id']})"></td>
          <td>${row['descuento']}</td>
          <td>${row['precio']}</td>
          <td>${row['sub_total']}</td>
          <td>
          <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row['id']},2)"><i class="fas fa-trash-alt"></i></button>
          </td>
          </tr>`;

      });
      document.getElementById("tblDetalle").innerHTML = html;
      document.getElementById("total").value = res.total_pagar.total;

    }
}
}

function calcularDescuento(e, id){
    e.preventDefault();
    if (e.target.value==''){
        alertas('Ingrese el descuento', 'warning');
    }else{
        if (e.which==13){
            const url= base_url + "Compras/calcularDescuento/" + id + "/" + e.target.value;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText); 
                alertas(res.msg, res.icono);
                cargarDetalleVenta();
                }
            }        
         }      

    }
}

function deleteDetalle(id, accion) {
   
    

  
    Swal.fire({
        title: '??Est?? seguro de eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
            let url;
            if (accion == 1) {
                url = base_url + "Compras/delete/" + id
            } else if (accion == 2) {
                url = base_url + "Compras/deleteVenta/" + id
            } else {
                url = base_url + "Compras/deleteApartado/" + id
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
                if (accion == 1) {
                    cargarDetalle();
                } else if (accion == 2) {
                    cargarDetalleVenta();
                } else {
                    cargarDetalleApart();
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
    if (accion == 1) {
        tipo = 'compra'        
    }else{
        tipo = 'venta'
    }
    Swal.fire({
        title: '??Est?? seguro de realizar la ' + tipo +'?',
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
                        'La caja est?? cerrada!',
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
            title:'??Todos los campos son obligatorios!',
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
        title: '??Est?? seguro de desactivar?',
        text: "??El Rol se desactivara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??',
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
                        'Rol desactivado con ??xito',
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
                                'Rol activado con ??xito',
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

if (document.getElementById('stockMinimo')){
    reporteStock();
    productosVendidos();
}

function reporteStock() {
    
    const url = base_url + "Administracion/reporteStock" ;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
         const res = JSON.parse(this.responseText);
         let nombre = [];
         let cantidad = [];
         for (let i = 0; i < res.length; i++) {
             nombre.push(res[i]['descripcion']);
             cantidad.push(res[i]['cantidad']);
             
         }
         var ctx = document.getElementById("stockMinimo");
         var myPieChart = new Chart(ctx, {
         type: 'pie',
         data: {
         labels: nombre,
         datasets: [{
         data: cantidad,
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});


        }
        
    }
}

function productosVendidos() {
    
    const url = base_url + "Administracion/productosVendidos" ;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
         const res = JSON.parse(this.responseText);
         let nombre = [];
         let cantidad = [];
         for (let i = 0; i < res.length; i++) {
             nombre.push(res[i]['descripcion']);
             cantidad.push(res[i]['total']);
             
         }
         var ctx = document.getElementById("ProductosVendidos");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: nombre,
    datasets: [{
      data: cantidad,
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});


        }
        
    }
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


function btnAnularV(id){
   
    Swal.fire({
        title: '??Est?? seguro de anular la Venta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {

            const url = base_url + "Compras/anularVenta/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {   
                    const res = JSON.parse(this.responseText);
                    alertas(res.msg,res.icono);
                    t_historial_v.ajax.reload();
                }
                
            }
        }
    })

}

function arqueoCaja(){
    document.getElementById('ocultar_campos').classList.add('d-none');
    document.getElementById('monto_inicial').value = '';
    document.getElementById('btnAccion').textContent = 'Abrir Caja';
    $('#abrir_caja').modal('show');
}

function abrirArqueo(e){
    e.preventDefault();
    const monto_inicial = document.getElementById('monto_inicial').value;
    if (monto_inicial == ''){
        alertas('Ingrese el Monto Inicial', 'warning');
    }else{
        const frm=document.getElementById('frmAbrirCaja');
        const url = base_url + "Cajas/abrirArqueo";
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {          
                const res = JSON.parse(this.responseText);
                alertas(res.msg, res.icono);
                t_arqueo.ajax.reload();
                $('#abrir_caja').modal('hide')
            }
        }
    }
}


/*function calcularPrecio(e){
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
                    title:'??Producto Ingresado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalle();
               }else if(res == 'modificado'){
                Swal.fire({
          
                    icon: 'success',
                    title:'??Producto actualizado!',
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
      
}*/

function ingresarApartado(e){

    e.preventDefault();
    const cant = document.getElementById("cantidad").value;
    const precio= document.getElementById("precio").value;
    document.getElementById("sub_total").value= precio*cant;
    if (e.which == 13){
        if (cant > 0) {
            const url = base_url + "Apartados/ingresarApartado";
            const frm = document.getElementById("formulario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            
            if (this.readyState == 4 && this.status == 200) {
               const res = JSON.parse(this.responseText);
             /*  if (res == 'ok'){
                Swal.fire({
          
                    icon: 'success',
                    title:'??Producto Ingresado!',
                    showConfirmButton: false,
                    timer: 2000
                })
                   frm.reset();
                   cargarDetalleVenta();
               }else if(res == 'modificado'){
                Swal.fire({
          
                    icon: 'success',
                    title:'??Producto actualizado!',
                    showConfirmButton: false,
                    timer: 2000
                })*/
                   alertas(res.msg, res.icono);
                frm.reset();
                   document.getElementById("cantidad").setAttribute("disabled", "disabled");
                   document.getElementById("codigo").focus();
                   cargarDetalleApart();
             /*   }
           else{ Swal.fire(
                res.msg,
                res,
                res.icono
              )}*/

 
        }
        }
    }
      
      
}
}
if(document.getElementById('tblDetalleApart')){
cargarDetalleApart()
}
function cargarDetalleApart() {
    const url = base_url + "Apartados/listar";
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
              <td>${row['cantidad'] * row['precio']}</td>
              <td>
              <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row['id']},3)"><i class="fas fa-trash-alt"></i></button>
              </td>
              </tr>`;
    
          });
          document.getElementById("tblDetalleApart").innerHTML = html;
          document.getElementById("total").textContent = res.total_pagar;
          alert(res.total_pagar);
    
        }
    }
}

function cerrarCaja() {
        const url = base_url + "Cajas/getVentas";
        const http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {   
                const res = JSON.parse(this.responseText);
                document.getElementById('monto_final').value = res.monto_total.total;
                document.getElementById('total_ventas').value = res.total_ventas.total;
                document.getElementById('monto_inicial').value = res.inicial.monto_inicial;
                document.getElementById('monto_general').value = res.monto_general;
                document.getElementById('id').value = res.inicial.id;
                document.getElementById('ocultar_campos').classList.remove('d-none');
                document.getElementById('btnAccion').textContent = 'Cerrar Caja';
                $('#abrir_caja').modal('show')
            }
        }
}

