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
      echo "Success (".date("Y-m-d H:i:s", time()).") [Size: ".strlen($file_contents)." characters]";
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
	
// ======================================
// Process handling in PHP
// =====================================
// Use the following code to view details after calling the function:
// 
// echo "PID: ".$process_handle[0]."<br />";
// echo "Timeout Error: (".$process_handle[1].") ".$process_handle[2]."<br />";
// echo "System Error:  (".$process_handle[3].") ".$process_handle[4]."<br />";
//
// ======================================

function PsExecute($command, $timeout_ms = 50) 
{ 
	// Create PID
	
	$pid_1 = PsExec("grep"); 
	
	$exec_command = $command.' & echo $!';
	
	$pid = PsExec($exec_command); 
	
	// Create Output Variable
	$output[0] = $pid; 			// PID
	$output[1] = 0;				// Timeout Error Flag
	$output[2] = ""; 			// Timeout Error Explanation
	$output[3] = 0; 			// System Error Flag
	$output[4] = ""; 			// System Error Explanation
	
	// Confirm PID created		
	if( empty($pid))
	{
		$output[3] = 1;						// Raise System error flag
		$output[4] = "PID not created";		// Raise System error flag
		return $output; 
	}
	
	// Sleep for 50ms (afterwhich process should have finished)
	usleep($timeout_ms*1000); 
	
	// Check if process has exited (success?) 		
	if( !PsExists($pid) )
	{
		$output[1] = 0;		// Raise Timeout Flag
		$output[2] = "No program detected! ";
		return $output;
	}
	else
	{
		$output[1] = 1;
		$output[2] = "Program detected!";

		// Kill process & children
		if( PsKill($pid) ) 
		{
			$output[3] = 0;		// Drop system error Flag
			$output[4] = "Parent process killed!";
			return $output; 
		}
		else
		{
			$output[3] = 1;
			$output[4] = "Parent process NOT killed!";
			return $output; 
		}
	}
	
} 

function PsExec($exec_command) {

	exec($exec_command, $op, $error_detect);
	return (int)$op[0];

}

function PsExists($pid) { 

	//echo "PID: ".$pid."<br />";
	exec("ps -aux | grep www-data | grep $pid", $output_exists);
	foreach ($output_exists as $output_row)
	{
		//echo "Row: ".$output_row."<br />";
		$output_array = explode(" ", $output_row);
		
		// Scroll to search for PID
		$pid_array = "";
		for ($i=1; $i < 6; $i ++)
		{
			if (is_numeric($output_array[$i]))
			{
				$pid_array = $output_array[$i];
				break;
			}
		}
		
		if ($pid_array == $pid)
		{
			return true;		
		}
	}
	return false; 
} 

function PsKill($pid) { 

	exec("kill -9 ".$pid, $op2);
	return true;

} 

function PsKillKeyword($keyword){

	exec("ps -aux | grep $keyword", $output_exists);
	foreach ($output_exists as $output_row)
	{
		//Search for PID
		$output_array = explode(" ", trim($output_row));
				
		// Scroll to search for PID
		$pid_array = "";
		for ($i=1; $i < 6; $i ++)
		{
			if (is_numeric($output_array[$i]))
			{
				$pid_array = $output_array[$i];
				break;
			}
		}
		
		// Kill PID
		if (!empty($pid_array))
		{
			PsKill ($pid_array);	
		}
	}

}

?>
