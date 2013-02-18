<?php

// Get AJAX variables
$file_path = $_POST['file_path'];
$file_contents = $_POST['file_content'];

// Write to file
if ($handle = @fopen($file_path, 'w'))
{

  if (@fwrite($handle, $file_contents))
  {
    fclose($handle);
    echo "File Saved (".date("Y-m-d H:i:s", time())."): ".strlen($file_contents)." characters";
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
