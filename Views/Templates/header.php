<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Panel de Administración</title>
    <link href="<?php echo base_url;?>Assets/css/estilo.css" rel="stylesheet" />
    <link href="<?php echo base_url;?>Assets/css/styles.css" rel="stylesheet" />
    <link href="<?php echo base_url;?>Assets/css/dataTables.bootstrap4.min.css" rel="stylesheet"
        crossorigin="anonymous" />
        <link href="<?php echo base_url;?>Assets/css/main.min.css" rel="stylesheet" />
    <link href="<?php echo base_url;?>Assets/css/select2.min.css" rel="stylesheet" crossorigin="anonymous" />

    <script src="<?php echo base_url;?>Assets/js/all.min.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="<?php echo base_url;?>Administracion/home">Ferreteria Allison</a>
        <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i
                class="fas fa-bars"></i></button>
        <!-- Navbar Search-->

        <!-- Navbar-->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#cambiarPass">Perfil</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="<?php echo base_url; ?>Usuarios/salir">Cerrar Sesion</a>
                </div>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">

                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts"
                            aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><i class="fas fa-cogs fa-2x "></i></div>
                            Administracion
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down fa-2x"></i></div>
                        </a>
                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                            data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="<?php echo base_url;?>Usuarios"><i
                                        class="fas fa-user fa-2x mr-2"></i>Usuarios</a>
                                <a class="nav-link" href="<?php echo base_url;?>Roles"><i
                                        class="fa fa-id-card fa-2x mr-2"></i>Roles</a>
                                <a class="nav-link" href="<?php echo base_url; ?>Administracion"><i
                                        class="fas fa-tools fa-2x mr-2"></i>Configuracion</a>
                            </nav>
                        </div>

                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseCaja"
                            aria-expanded="false" aria-controls="collapseCaja">
                            <div class="sb-nav-link-icon"><i class="fas fa-box fa-2x "></i></div>
                            Cajas
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down fa-2x"></i></div>
                        </a>
                        <div class="collapse" id="collapseCaja" aria-labelledby="headingOne"
                            data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="<?php echo base_url; ?>Cajas"><i
                                        class="fas fa-box fa-2x mr-2"></i>Cajas</a>
                                <a class="nav-link" href="<?php echo base_url; ?>Cajas/Arqueo"><i
                                        class="fas fa-tools fa-2x mr-2"></i>Arqueo Caja</a>
                            </nav>
                        </div>

                        <a class="nav-link" href="<?php echo base_url;?>Clientes">
                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-2x"></i></div>
                            Clientes
                        </a>

                        <a class="nav-link" href="<?php echo base_url;?>Categorias">
                            <div class="sb-nav-link-icon"><i class="fas fa-sitemap fa-2x"></i></div>
                            Categorias
                        </a>

                        <a class="nav-link" href="<?php echo base_url;?>Medidas">
                            <div class="sb-nav-link-icon"><i class="fa fa-balance-scale fa-2x"></i></div>
                            Medidas
                        </a>

                        <a class="nav-link" href="<?php echo base_url;?>Proveedores">
                            <div class="sb-nav-link-icon"><i class="fa fa-truck fa-2x"></i></div>
                            Proveedores
                        </a>

                        <a class="nav-link" href="<?php echo base_url;?>Productos">
                            <div class="sb-nav-link-icon"><i class="fab fa-product-hunt fa-2x"></i></div>
                            Productos
                        </a>
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseCompras"
                            aria-expanded="false" aria-controls="collapseCompras">
                            <div class="sb-nav-link-icon"><i class="fas fa-shopping-basket fa-2x"></i></div>
                            Entradas
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down fa-2x"></i></div>
                        </a>
                        <div class="collapse" id="collapseCompras" aria-labelledby="headingOne"
                            data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="<?php echo base_url;?>Compras"><i
                                        class="fas fa-shopping-cart fa-2x mr-2"></i>Nueva compra</a>
                                <a class="nav-link" href="<?php echo base_url; ?>Compras/historial"><i
                                        class="fas fa-list fa-2x mr-2"></i>Historial compras</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseVentas"
                            aria-expanded="false" aria-controls="collapseVentas">
                            <div class="sb-nav-link-icon"><i class="fas fa-shopping-cart fa-2x"></i></i></div>
                            Salidas
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down fa-2x"></i></div>
                        </a>
                        <div class="collapse" id="collapseVentas" aria-labelledby="headingOne"
                            data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="<?php echo base_url;?>Compras/ventas"><i
                                        class="fas fa-shopping-cart fa-2x mr-2"></i>Nueva Venta</a>
                                <a class="nav-link" href="<?php echo base_url; ?>Compras/historial_ventas"><i
                                        class="fas fa-list fa-2x mr-2"></i>Historial ventas</a>
                            </nav>
                        </div>
                        <a class="nav-link" href="<?php echo base_url;?>Apartados">
                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-2x"></i></div>
                            Apartados
                        </a>


                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid mt-2">