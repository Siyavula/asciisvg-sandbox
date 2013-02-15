<?php $file_content = read_file($dir."/".$tab_dict[2][$key]); ?>

<div class="row-fluid">

  <div class="span6">

    <p><textarea id="asciiinput-<?php echo $key;?>" name="asciiinput-<?php echo $key;?>">
<?php echo $file_content; ?>
    </textarea></p>

    <p><button onClick="httpPost_writefile('<?php echo $dir.'/'.$tab_dict[2][$key]; ?>', String(encodeURIComponent(asciiinput_editor_0.getValue())));">Save</button> &nbsp; <i id="save_status_<?php echo $key;?>"></i></p>

    <!-- Suggestion -->
    <div class="alert alert-info">
      <p>Suggestion</p>
      <p><textarea id="suggestionNode_<?php echo $key;?>" rows="1" disabled="disabled" style="width:100%; color:#000000; background:#FFF;"></textarea></p>
    </div>

    <!-- Debug String -->
    <div class="alert alert-info">
      <p>dprint()</p>
      <p><textarea id="debug_string_<?php echo $key;?>" rows="1" disabled="disabled" style="width:100%; color:#000000; background:#FFF;"></textarea></p>
    </div>

  </div>

  <div class="span6">

    <!-- SVG Output -->	
    <div class="alert alert-info" style="height:300px;">
		  <center>
			  <span id="outputNode_<?php echo $key;?>"><img src="images/siyavula/siyavula.jpg"></span>
		  </center>
    </div>

    <!-- Options -->
    <div class="alert alert-info">

      <!-- Option: Randomize -->
      <input type="checkbox" id="randomize_lock_<?php echo $key;?>"> hold random seed: <input id="random_seed_<?php echo $key;?>" style="width:50px;">

      <!-- Update: SVG Button -->
      <button type="button" onClick="document.getElementById('outputNode_<?php echo $key;?>').innerHTML = 'loading...'; update_SVG();">SVG</button>

      <!-- Update: PNG Button -->
      <button type="button" onClick="update_PNG();">PNG</button>

      <!-- Option: Auto-update -->
      Auto-update: <input type="checkbox" id="autocomplete_checkbox_<?php echo $key;?>">

    </div>

    <!-- Error -->
    <div class="alert alert-error">
	    <p>Error</p>
      <p><textarea id="error_msg_<?php echo $key;?>" rows="1" disabled="disabled" style="width:100%; color:#990000; background:#FEE;"></textarea></p>
    </div>


  </div>

</div>

<script>

  var asciiinput_editor_<?php echo $key;?> = CodeMirror.fromTextArea(document.getElementById('asciiinput-<?php echo $key;?>'), {
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
		  asciiinput_editor_<?php echo $key;?>.setLineClass(ascii_Line_<?php echo $key;?>, null, null);
      ascii_Line_<?php echo $key;?> = asciiinput_editor_<?php echo $key;?>.setLineClass(asciiinput_editor_<?php echo $key;?>.getCursor().line, null, "activeline");
    }
  });

  var ascii_Line_<?php echo $key;?> = asciiinput_editor_<?php echo $key;?>.setLineClass(0, "activeline");

</script>
