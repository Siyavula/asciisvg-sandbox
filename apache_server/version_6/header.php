<!DOCTYPE html>

<?php include_once("functions/functions.php"); ?>
<?php include_once("functions/variables.php"); ?>

<?php 

$dir = @clean_dir(@$_GET['dir']);
$parent_dir = substr($dir, 0, strrpos($dir, "/"));
$directory_list = get_directory($dir);
$file_list = get_files($dir);
$template_name = str_replace($parent_dir."/", "", $dir);

?>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Siyavula Template Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	  <script src="codemirror/codemirror.js"></script>
    <script src="codemirror/python.js"></script>
    <script src="codemirror/xml.js"></script>
    <script src="codemirror/css.js"></script>
    <link rel="stylesheet" href="codemirror/codemirror.css">

    <!-- Le styles -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }
      .thumbnail {
        background-color: #f5f5f5;
      }
    </style>

    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <b class="brand">Siyavula Template Editor</b>
          <div class="nav-collapse collapse">
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
