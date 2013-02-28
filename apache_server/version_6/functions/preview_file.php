<?php

include('functions.php');

// Get AJAX variables
$random_seed = @$_POST['random_seed'];
$zipfile = "@template.zip";

$filecontents = @read_file("config.txt");
$url = "http://".$filecontents[1].":27183/preview";

$ch = curl_init();
$timeout = 50000;

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_VERBOSE, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_POST, true);

$post = array(
    "zipfile"=>$zipfile,
    "randomseed"=>$random_seed
);

curl_setopt($ch, CURLOPT_POSTFIELDS, $post); 
$data = curl_exec($ch);
curl_close($ch);

// HTML file

$html_filename = "template.html";

if (strlen($data) > 0)
{
  // Delete existing HTML
  if (is_file($html_filename))
  {
    unlink($html_filename);
  }

  // Write this to a HTML file
	$write_string = write_file("template.html",$data);
  if (substr($write_string,0,5) == "Error")
  {
    echo "Error: HTML file not accessible. ";
  }

  // Set File Permission
  if (!(@chmod($html_filename, 0777)))
  {
    echo "Error: HTML file permission not set. ";
  }
}
else
{
  echo "Error: monassis-buildout server not accessible. ";
}




?>



