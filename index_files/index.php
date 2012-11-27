<!DOCTYPE html>

<?php

function getRealIpAddr()
{
	return $_SERVER['SERVER_ADDR'];
}

?>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Siyavula Server -- IP: <?php echo getRealIpAddr();?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="index_files/lib/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 20px;
        padding-bottom: 40px;
      }

      /* Custom container */
      .container-narrow {
        margin: 0 auto;
        max-width: 700px;
      }
      .container-narrow > hr {
        margin: 30px 0;
      }

      /* Main marketing message and sign up button */
      .jumbotron {
        margin: 60px 0;
        text-align: center;
      }
      .jumbotron h1 {
        font-size: 72px;
        line-height: 1;
      }
      .jumbotron .btn {
        font-size: 21px;
        padding: 14px 24px;
      }

      /* Supporting marketing content */
      .marketing {
        margin: 60px 0;
      }
      .marketing p + h4 {
        margin-top: 28px;
      }
    </style>

  </head>

  <body>

    <div class="container-narrow">
		<center>

			<img src="index_files/lib/img/logo_2.png"/>

    	<hr>

			<h1>Server IP: <?php echo getRealIpAddr();?></h1>

      <hr>

			<a class="btn btn-large btn-warning" href="version_2/index.html">Image Editor (2.2)</a></br></br>
			<a class="btn btn-large btn-danger" href="version_3/index.html">Image Editor (3.0)</a></br></br>
			<a class="btn btn-large btn-danger" href="version_3/index.html">Image Editor (4.0)</a></br></br>
      <a class="btn btn-large btn-success" href="version_5/editor.html">Image Editor (5.0)</a>
        
      <hr>

		</center>
    </div> 

		<!-- /container -->

  </body>
</html>
