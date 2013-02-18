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

if (strlen($data) > 0)
{
  // Write this to a file
  write_file("template.html",$data);
}
else
{
  echo "Error: monassis-buildout server not reachable";
}

?>



