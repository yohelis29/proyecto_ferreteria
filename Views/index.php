<!doctype html>
<html>
    <head>
        <link rel="shortcut icon" href="#" />
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Login Ferreteria</title>

        <link rel="stylesheet" href="Assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="Assets/css/estilos.css">
        <link rel="stylesheet" href="Assets/css/sweetalert2.min.css">        
        
        <link rel="stylesheet" type="text/css" href="Assets/css/material-design-iconic-font.min.css">

        <link href="<?php echo base_url;?>Assets/css/styles.css" rel="stylesheet" />
        <script src="<?php echo base_url;?>Assets/js/all.min.js" crossorigin="anonymous"></script>
       
     

    </head>
    
    <body>
     
      <div class="container-login">
        <div class="wrap-login">
        <form id="frmLogin">
        <span class="login-form-title">LOGIN</span>
             <div class="form-group">
                 <label class="small mb-1" for="usuario"><i class="fas fa-user"></i> Usuario</label>
                 <input class="form-control py-4" id="usuario" name="usuario" type="text" placeholder="Ingresar Usuario" />
                </div>
                <div class="form-group">
                    <label class="small mb-1" for="clave"><i class="fas fa-key"></i> Contraseña</label>
                      <input class="form-control py-4" id="clave" name="clave" type="password" placeholder="Ingrese Contraseña" />
                     </div>


                    <div class="alert alert-danger text-center d-none" id="alerta" role="alert">

                    </div>
                   
                    <div class="container-login-form-btn">
                   
                    <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                    <div class="wrap-login-form-btn">
                    <div class="login-form-bgbtn"></div>
                        <button class="login-form-btn" type="submit" onclick="frmLogin(event)">Iniciar Sesion</button>
                        </div>
                        
                     </div>
                    
                    </form>
        </div>
    </div>     
        
    
       
     


     <script src="Assets/js/jquery-3.3.1.min.js"></script>    
     <script src="Assets/js/bootstrap.min.js"></script>    
     <script src="Assets/js/popper.min.js"></script>    
        
     <script src="Assets/js/sweetalert2.all.min2.js"></script>    
     <script src="Assets/js/codigo.js"></script> 

     <Script>
            const base_url = "<?php echo base_url;?>";
        </Script>
        <script src="<?php echo base_url;?>Assets/js/login.js"></script>
     
    </body>
</html>