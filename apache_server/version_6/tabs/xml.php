<?php $file_content = read_file($dir."/".$tab_dict[0][0]); ?>

<p><textarea id="xmlinput" name="xmlinput">
<?php echo $file_content; ?>
</textarea></p>

<p><button onClick="httpPost_writefile('<?php echo $dir.'/'.$tab_dict[0][0]; ?>', String(encodeURIComponent(xmlinput_editor_0.getValue())));">Save</button></p>

<script>

  var xmlinput_editor = CodeMirror.fromTextArea(document.getElementById('xmlinput'), {
    mode: {name: "xml",
    version: 2,
    singleLineStringErrors: false},
    onChange: function() {
      updatePreview(asciiinput_editor_<?php echo $key;?>);
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

</script>
