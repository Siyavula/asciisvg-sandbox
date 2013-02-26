<?php

// Get AJAX variables
$terminal_command = trim(@$_POST['terminal_command']);

// Run Command
if (strlen($terminal_command) > 0)
{
  exec($terminal_command, $output);

	// Format output
	if (is_array($output))
	{
		$output = implode("\r\n", $output);
	}

	// Return result
	$return_var = "Command executed (".date("Y-m-d H:i:s", time()).")"."[BRK]".$output;

}
else
{
  $return_var = "No command given";
}

echo $return_var;

?>



