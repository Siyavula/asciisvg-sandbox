<?php

function get_directory($dir="/")
{
  if (@$dir[0] != "/"){$dir = "/".$dir;}
  if ($dir == "/") {$dir="/home";}
  $directory_list = array();
  $handle = opendir($dir);
  while($name = readdir($handle)) {
      if(is_dir("$dir/$name")) {
          if($name != '.' && $name != '..' && $name[0] != ".") {
              $directory_list[] = $name;
          }
      }
  }
  closedir($handle);
  sort($directory_list);
  return array($dir, $directory_list);
}

function get_files($dir="/")
{
  if (@$dir[0] != "/"){$dir = "/".$dir;}
  if ($dir == "/") {$dir="/home";}
  $file_list = array();
  $handle = opendir($dir);
  while($name = readdir($handle)) {
      if(is_dir("$dir/$name")) {
      }
      elseif(is_link("$dir/$name")) {
      }
      else {
        if($name != '.' && $name != '..' && @$name[0] != "." && @$name[strlen($name)-1] != "~") 
        {
          foreach (array(".py",".xml", ".ascsvg") as $ext)
          {
            if (strpos($name, $ext) !== false) {
            $file_list[] = $name;
            break;
            }
          }
        }
      }
  }
  closedir($handle);
  sort($file_list);
  return array($dir, $file_list);
}

function clean_dir ($dir="/")
{
  $dir = preg_replace('{/$}', '', $dir);
  return $dir;
}

function read_file($file_path)
{

  if (!($fp = @fopen($file_path, "r"))){return array(0,"");};
  $file_content = "";
  while(!feof($fp))
  {
    $file_content .= fgets($fp, 1024);
  }

  return array(1,$file_content);

}

// Write to file
function write_file($file_path, $file_contents)
{
  include("variables.php");
  // Set file permissions
  @chmod($file_path, 0777);

  // Open File
  if ($handle = @fopen($file_path, 'w'))
  {
    if (@fwrite($handle, $file_contents))
    {
      fclose($handle);
      echo "File Saved (".date("Y-m-d H:i:s", time())."): ".strlen($file_contents)." characters";
    }
    else
    {
      echo $text_write_error;
    }
  }
  else
  {
    echo $text_open_error;
  }
}

?>

