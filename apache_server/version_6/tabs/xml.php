<?php 
$file_object = read_file($dir."/".$tab_dict[0][0]);
$file_content = htmlspecialchars($file_object[1]);
?>

<?php if ($file_object[0] == 1) :?>
  <p><textarea id="xmlinput" name="xmlinput"><?php echo $file_content; ?></textarea></p>
  <p><button id='xml_save_btn' class="btn btn-medium" onClick="httpPost_writefile_xml('<?php echo $dir.'/'.$tab_dict[0][0]; ?>', String(encodeURIComponent(xmlinput_editor.getValue())));">Save</button> &nbsp; <i id="save_status_xml"></i></p>

<script>

  var xmlinput_editor = CodeMirror.fromTextArea(document.getElementById('xmlinput'), {
    mode: {
      name: "xml",
      version: 2,
      singleLineStringErrors: false},
    lineWrapping: true,
	  extraKeys: {
      "Ctrl-S": function() { httpPost_writefile_xml('<?php echo $dir.'/'.$tab_dict[0][0]; ?>', String(encodeURIComponent(xmlinput_editor.getValue()))); }
    },
    onChange: function() {
      document.getElementById('xml_save_btn').className = "btn btn-medium btn-warning";
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
		  xmlinput_editor.setLineClass(xml_Line, null, null);
      xml_Line = xmlinput_editor.setLineClass(xmlinput_editor.getCursor().line, null, "activeline");
    }
  });

  var xml_Line = xmlinput_editor.setLineClass(0, "activeline");

  /* ==========================================================================================
  Writing to File
  ========================================================================================== */

  function httpPost_writefile_xml(path, content) {
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
						  document.getElementById("save_status_xml").innerHTML = xmlHttp_data;
              document.getElementById('xml_save_btn').className = "btn btn-medium";
              setTimeout('document.getElementById("save_status_xml").innerHTML = "";', 2000);
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("file_path="+path+"&file_content="+content);
  }

</script>

<?php else: ?>
  <div class="alert alert-error"><?php echo $text_access_error;?></div>
<?php endif;?>
