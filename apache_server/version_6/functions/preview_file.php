<?php

include('functions.php');

// Get AJAX variables
$random_seed = @$_GET['random_seed'];
$zipfile = "@template.zip";
$url = "http://127.0.0.1:27183/preview";

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

// Write this to a file
if ($handle = @fopen("template.html", 'w'))
{
  chmod("template.html", 0777);
  if (@fwrite($handle, $data))
  {
    fclose($handle);
    echo "Success: (".date("Y-m-d H:i:s", time()).")";
  }

  else
  {
    echo "Could not write to file."; 
  }
}
else
{
  echo "Could not access file (allow permission)";
}

?>



