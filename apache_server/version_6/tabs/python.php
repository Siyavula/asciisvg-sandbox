<?php $file_content = read_file($dir."/".$tab_dict[1][0]); ?>

<p><textarea id="pythoninput" name="pythoninput">
<?php echo $file_content; ?>
</textarea></p>

<p><button onClick="httpPost_writefile('<?php echo $dir.'/'.$tab_dict[1][0]; ?>', String(encodeURIComponent(pythoninput_editor_0.getValue())));">Save</button></p>

<script>

  // Initialize CodeMirror editor with a nice html5 canvas demo.
  var pythoninput_editor = CodeMirror.fromTextArea(document.getElementById('pythoninput'), {
    mode: {name: "python",
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
      updatePreview(asciiinput_editor_<?php echo $key;?>);
		  pythoninput_editor.setLineClass(python_Line, null, null);
      python_Line = pythoninput_editor.setLineClass(pythoninput_editor.getCursor().line, null, "activeline");
    }
  });
  var python_Line = pythoninput_editor.setLineClass(0, "activeline");

</script>
