<?php 
$file_object = read_file($dir."/".$tab_dict[1][0]);
$file_content = htmlspecialchars($file_object[1]);
?>

<?php if ($file_object[0] == 1) :?>
  <p><textarea id="pythoninput" name="pythoninput"><?php echo $file_content; ?></textarea></p>
  <p><button id="python_save_btn" class="btn btn-small" onClick="httpPost_writefile_python('<?php echo $dir.'/'.$tab_dict[1][0]; ?>', String(encodeURIComponent(pythoninput_editor.getValue())));">Save</button> &nbsp; <i id="save_status_python"></i></p>

<script>

  // Initialize CodeMirror editor with a nice html5 canvas demo.
  var pythoninput_editor = CodeMirror.fromTextArea(document.getElementById('pythoninput'), {
    mode: {name: "python",
           version: 2,
           singleLineStringErrors: false},
	  extraKeys: {
      "Ctrl-S": function() { httpPost_writefile_python('<?php echo $dir.'/'.$tab_dict[1][0]; ?>', String(encodeURIComponent(pythoninput_editor.getValue())));}
    },
    onChange: function() {
      document.getElementById('python_save_btn').className = "btn btn-small btn-warning";
      document.getElementById('warning_save_changes').style.display = "block";
    },
    onGutterClick: function(cm, n) {
      var info = cm.lineInfo(n);
      if (info.markerText)
        cm.clearMarker(n);
      else
        cm.setMarker(n, "<span style=\"color: #900\">&bull;</span> %N%");
    },
	  onCursorActivity: function() {
		  pythoninput_editor.setLineClass(python_Line, null, null);
      python_Line = pythoninput_editor.setLineClass(pythoninput_editor.getCursor().line, null, "activeline");
    }
  });
  var python_Line = pythoninput_editor.setLineClass(0, "activeline");

  /* ==========================================================================================
  Writing to File
  ========================================================================================== */

  function httpPost_writefile_python(path, content) {
	    var xmlHttpReq = false;
	    var self = this;

		  // Mozilla/Safari
	    if (window.XMLHttpRequest) {
	        self.xmlHttpReq = new XMLHttpRequest();
	    }
	    // IE
	    else if (window.ActiveXObject) {
	        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    self.xmlHttpReq.open('POST', "functions/write_file.php", true);
	    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    self.xmlHttpReq.onreadystatechange = function() {
	        if (self.xmlHttpReq.readyState == 4) {
						  var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText);
						  document.getElementById("save_status_python").innerHTML = xmlHttp_data;
              document.getElementById('python_save_btn').className = "btn btn-small";
              setTimeout('document.getElementById("save_status_python").innerHTML = "";', 2000);
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("file_path="+path+"&file_content="+content);
  }

</script>

<?php else: ?>
  <div class="alert alert-error"><?php echo $text_access_error;?></div>
<?php endif;?>
