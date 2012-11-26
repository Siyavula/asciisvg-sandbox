<?php 
	 header("Title: ");
   header("Content-Type: application/octet-stream");
   header("Content-Disposition: attachment; filename='image.png'");
   readfile($_GET['path']);
?>
