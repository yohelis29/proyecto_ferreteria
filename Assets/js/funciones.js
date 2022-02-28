let tblUsuarios, tblClientes;
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
    tblUsuarios = $('#tblClientes').DataTable( {
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
                    $("#nuevo_Cliente").modal("hide");
                    tblClientes.ajax.reload();
                   
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