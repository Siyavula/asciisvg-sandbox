<?php

include('functions.php');

// Get AJAX variables
$file_path = $_POST['file_path'];
$file_contents = $_POST['file_content'];

write_file($file_path, $file_contents);

?>
