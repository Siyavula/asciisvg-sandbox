<?php

include_once("functions.php");

// Get AJAX variables
$change_to = @$_POST['server_name'];

if ($change_to == "127.0.0.1")
{
  write_file("config.txt", "127.0.0.1"); 
}
else
{
  write_file("config.txt", "www.monassis.com");
}

?>
