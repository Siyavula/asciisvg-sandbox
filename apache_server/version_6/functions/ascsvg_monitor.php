<?php

include('variables.php');
include('functions.php');

// Format Variables
$variables = escapeshellarg($_POST['type']).' '.
escapeshellarg($_POST['ascii']).' '.
escapeshellarg($_POST['python']).' '.
escapeshellarg($_POST['strip_tags']).' '.
escapeshellarg($_POST['randomize_lock']).' '.
escapeshellarg($_POST['random_seed']);

// Format Command
$command = 'python ../cgi-bin/test_processor.py '.$variables.' ';

// Execute command
$time_limit = 2000;

// Exec
$output = PsExecute($command, $time_limit);

// Get SVG code
$fh = fopen("../cgi-bin/buffer/buffer.svg", "rb");
$svg_data = fread($fh, filesize("../cgi-bin/buffer/buffer.svg"));
fclose($fh);

// Get Debug Data
$fh = fopen("../cgi-bin/buffer/debug.txt", "rb");
$debug_data = fread($fh, filesize("../cgi-bin/buffer/debug.txt"));
fclose($fh);

if ($output[1] == 1)
{
	echo "Script took longer than ".($time_limit/1000)." seconds. Script timed-out.";
}
elseif ($output[3] == 1)
{
	echo "Strange System Error... hmmm. Please consult the Oracle. Bring chocolate chip cookies.";
}
else
{
	echo $debug_data."[BRK]".$svg_data;
}
?>
