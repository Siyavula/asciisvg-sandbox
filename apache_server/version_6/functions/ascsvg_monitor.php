<?php

include('functions.php');

// Format Variables
$variables = escapeshellarg($_POST['type']).' '.
escapeshellarg($_POST['ascii']).' '.
escapeshellarg($_POST['python']).' '.
escapeshellarg($_POST['strip_tags']).' '.
escapeshellarg($_POST['randomize_lock']).' '.
escapeshellarg($_POST['random_seed']);

// Format Command
$command = 'python ../cgi-bin/test_processor.py '.$variables.' 2>&1 &';

// Execute command
if (!exec($command, $output)){$output = array("Timeout");}

// Return variables
echo (implode($output));


?>
