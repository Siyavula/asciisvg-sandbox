<?php

include('functions.php');

// Get AJAX variables
$dir = $_POST['dir'];
$parent_dir = substr($dir, 0, strrpos($dir, "/"));
$directory_list = get_directory($dir);
$file_list = get_files($dir);

// Checking files are selected
$zip = new ZipArchive(); // Load zip library
$zip_name = "template.zip";
//$zip_name = $dir."/".str_replace($parent_dir."/", "", $dir).".zip";

// Delete existing ZIP
if (is_file($zip_name))
{
  unlink($zip_name);
}

// Create new zip
if ($zip->open($zip_name, ZIPARCHIVE::CREATE) == True)
{  
  $i = 0;
  foreach ($file_list[1] as $file)
  {
    // Add new files
    if ($zip->addFile($dir."/".$file, $file) == True)
    {
      $i += 1;
    }
  }
  echo $i." files added to ZIP (".date("Y-m-d H:i:s", time()).")";
}

$zip->close();

@chmod($zip_name, 0777);

?>



