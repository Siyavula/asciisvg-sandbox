<?php 
$file_object = read_file($dir."/".$tab_dict[2][$key]);
$file_content = htmlspecialchars($file_object[1]);
?>

<?php if ($file_object[0] == 1) :?>

<div class="row-fluid">

  <div class="span6">

    <p><textarea id="asciiinput-<?php echo $key;?>" name="asciiinput-<?php echo $key;?>">
<?php echo $file_content; ?>
    </textarea></p>

    <p><button id="ascii_<?php echo $key;?>_save_btn" class="btn btn-medium" onClick="httpPost_writefile_<?php echo $key;?>('<?php echo $dir.'/'.$tab_dict[2][$key]; ?>', String(encodeURIComponent(asciiinput_editor_<?php echo $key;?>.getValue())));">Save</button> <i id="save_status_<?php echo $key;?>"></i></p>

    <!-- Suggestion -->
    <div class="alert alert-info">
      <p>Suggestion</p>
      <p><textarea id="suggestionNode_<?php echo $key;?>" rows="1" disabled="disabled" style="width:100%; color:#000000; background:#FFF;"></textarea></p>
    </div>

    <!-- Debug String -->
    <div class="alert alert-info">
      <p>dprint()</p>
      <p><textarea id="debug_string_<?php echo $key;?>" rows="3" disabled="disabled" style="width:100%; color:#000000; background:#FFF;"></textarea></p>
    </div>

  </div>

  <div class="span6">

    <!-- Options -->
    <div class="alert alert-info form-inline">

      <!-- Option: Randomize -->
      <label class="checkbox">
        <input type="checkbox" id="randomize_lock_<?php echo $key;?>"> hold seed:
      </label>

			<input id="random_seed_<?php echo $key;?>" class="input" type="text" style="width:50px;">
      
      <!-- Update: SVG Button -->
      <button type="button" class="btn btn-medium" onClick="update_SVG_<?php echo $key;?>();">SVG</button>

      <!-- Update: PNG Button -->
      <button type="button" class="btn btn-medium" onClick="update_PNG_<?php echo $key;?>();">PNG</button>

      <!-- Option: Auto-update -->
      <label class="checkbox">
        <input type="checkbox" id="autocomplete_checkbox_<?php echo $key;?>"> Auto-update (no time limit)
      </label>

    </div>

    <!-- SVG Output -->	
    <div class="alert alert-info">
		  <center>
			  <span id="outputNode_<?php echo $key;?>"><img src="images/siyavula/siyavula.jpg"></span>
		  </center>
    </div>

    <!-- Error -->
    <div class="alert alert-error">
	    <p>Error</p>
      <p><textarea id="error_msg_<?php echo $key;?>" rows="8" disabled="disabled" style="width:100%; color:#990000; background:#FEE;"></textarea></p>
    </div>

  </div>

</div>

<script>

  /* ==========================================================================================
  Script Library
  Author: Leen Remmelzwaal
  Date: 15th February 2013
  ========================================================================================== */

  // ================================================
  // AJAX Functions
  // Author: Leen Remmelzwaal
  // Date: 10th September 2012
  // ================================================

  function xmlhttpPost_<?php echo $key;?>(image_format) {
	    var xmlHttpReq = false;
	    var self = this;
		  var ascii_input_code = String(encodeURIComponent(asciiinput_editor_<?php echo $key;?>.getValue()));
		  var python_input_code = String(encodeURIComponent(pythoninput_editor.getValue()));
		  var random_seed = document.getElementById("random_seed_<?php echo $key;?>").value;
		  var random_seed_lock = document.getElementById("randomize_lock_<?php echo $key;?>").checked;

		  // Mozilla/Safari
	    if (window.XMLHttpRequest) {
	        self.xmlHttpReq = new XMLHttpRequest();
	    }
	    // IE
	    else if (window.ActiveXObject) {
	        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    }

			// Depending on auto/not use different processor scripts
			if (document.getElementById("autocomplete_checkbox_<?php echo $key;?>").checked) 
			{
				self.xmlHttpReq.open('POST', "cgi-bin/processor.py", true);
				self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			  self.xmlHttpReq.onreadystatechange = function() 
				{
		      if (self.xmlHttpReq.readyState == 4) 
					{
						var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText).split ("[BRK]");
						document.getElementById("outputNode_<?php echo $key;?>").innerHTML = xmlHttp_data[0];
						document.getElementById("error_msg_<?php echo $key;?>").innerHTML = xmlHttp_data[1];
						document.getElementById("random_seed_<?php echo $key;?>").value = xmlHttp_data[2];
						document.getElementById("debug_string_<?php echo $key;?>").value = xmlHttp_data[3];
		      }
			  }
			}
			else
			{
	      // Loading
	      document.getElementById("outputNode_<?php echo $key;?>").innerHTML = "<img src='images/icon/loading.gif'>";

				// Monitored process	
				self.xmlHttpReq.open('POST', "functions/ascsvg_monitor.php", true);
				self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			  self.xmlHttpReq.onreadystatechange = function() 
				{
		      if (self.xmlHttpReq.readyState == 4) 
					{
						var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText).split ("[BRK]");
						if (xmlHttp_data[0].length == 0)
						{
							if (image_format == "PNG")
							{
								document.getElementById("outputNode_<?php echo $key;?>").innerHTML = "<img src='cgi-bin/buffer/buffer.png'>";
							}
							else if (image_format == "SVG")
							{
								document.getElementById("outputNode_<?php echo $key;?>").innerHTML = xmlHttp_data[3];
							}
						}
						else
						{
							document.getElementById("outputNode_<?php echo $key;?>").innerHTML = "";
						}
						document.getElementById("error_msg_<?php echo $key;?>").innerHTML = xmlHttp_data[0];
						document.getElementById("random_seed_<?php echo $key;?>").value = xmlHttp_data[1];
						document.getElementById("debug_string_<?php echo $key;?>").value = xmlHttp_data[2];
		      }
			  }
			}
	    
		  if (image_format == "PNG")
		  {
  		  var text;
        text = "type=png&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=true&randomize_lock=" + random_seed_lock + "&random_seed=" + random_seed;
        self.xmlHttpReq.send(text);
		  }
		  else if (image_format == "SVG")
		  {
			  var text;
			  text = "type=svg&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=true&randomize_lock=" + random_seed_lock + "&random_seed=" + random_seed;
        self.xmlHttpReq.send(text);
		  }
  }

  // ================================================
  // Additional functions
  // Author: Leen Remmelzwaal
  // Date: 14th June 2012
  // ================================================

  function auto_update_image_<?php echo $key;?>() {
	  if (document.getElementById("autocomplete_checkbox_<?php echo $key;?>").checked) { update_SVG_<?php echo $key;?>(); }
  }

  function update_SVG_<?php echo $key;?>() { 
	  xmlhttpPost_<?php echo $key;?>("SVG");
  }

  function update_PNG_<?php echo $key;?>() { 
	  xmlhttpPost_<?php echo $key;?>("PNG");
  }

  function getSuggestion_<?php echo $key;?>(line) {
	  document.getElementById("suggestionNode_<?php echo $key;?>").value = "";
	  var dict = {		'dot':'dot([center_x,center_y], type, label, position, angle)', 
									  'arrowhead':'arrowhead([x1,y1],[x2,y2])',
									  'text':'text([x,y],string,position,angle)',
									  'axes':'axes(dx, dy,"labels" || [xpos,xneg,ypos,yneg,zeropos],gdx,gdy,[xunits,yunits])',
									  'grid':'grid(dx,dy)',
									  'rect':'rect([x1,y1],[x2,y2],radius_corner_x,radius_corner_y)',
									  'path':'path(list)',
									  'plot':'plot(func,xmin,xmax,points)',
									  'curve':'curve(list)',
									  'bunnyhop':'bunnyhop(list)',
									  'smoothcurve':'smoothcurve(list)',
									  'petal':'petal([x,y],[xdir,ydir])',
									  'heart':'heart([x,y],size)',
									  'slopefield':'slopefield(func,dx,dy)',
									  'line':'line([x1,y1],[x2,y2])',
									  'ellipse':'ellipse([center_x,center_y],xradius,yradius)',
									  'circle':'circle([center_x,center_y],radius)',
									  'arc':'arc(start,end,radius)',
									  'setBorder':'setBorder(size, color)',
									  'initPicture':'initPicture(xmin,xmax,ymin,ymax)',
									  'start_group':'start_group([center_x,center_y], rotate_angle, [scale_x,scale_y], [translate_x,translate_y])',
									  'angle_arc':'angle_arc([center_x,center_y], radius, start_deg, stop_deg, text, text_offset)',
									  'stop_group':'stop_group()',
									  'cloud':'cloud([center_x,center_y],size,num_humps)',
									  'star':'star([center_x,center_y],size,num_points,inner_radius)',
									  'grass': 'grass([base_x,base_y],size,leaves,droop)',
									  'flower': 'flower([center_x,center_y],size,num_petals,center_fill,center_stroke,center_size)'
						  };

	  max_term = "";
	  for (term in dict)
    {
    	if (line.indexOf(term) > -1)
		  {
			  if (term.length > max_term.length)
			  {
				  max_term = term;
			  }
		  }
    }
	  if (max_term != "") {document.getElementById("suggestionNode_<?php echo $key;?>").value = dict[max_term];}
  }

  function httpPost_writefile_<?php echo $key;?>(path, content) {
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
						  document.getElementById("save_status_<?php echo $key;?>").innerHTML = xmlHttp_data;
              document.getElementById("ascii_<?php echo $key;?>_save_btn").className = "btn btn-medium";
              setTimeout('document.getElementById("save_status_<?php echo $key;?>").innerHTML = "";', 2000);
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("file_path="+path+"&file_content="+content);
  }

  /* ==========================================================================================
  CodeMirror Instance
  ========================================================================================== */

  function updatePreview_<?php echo $key;?>(handle) {
	  auto_update_image_<?php echo $key;?>();
	  getSuggestion_<?php echo $key;?>(handle.getValue().split('\n')[handle.getCursor().line]); 
	  // asciisvg_editor.getValue());
  }

  var asciiinput_editor_<?php echo $key;?> = CodeMirror.fromTextArea(document.getElementById('asciiinput-<?php echo $key;?>'), {
    mode: {name: "python",
           version: 2,
           singleLineStringErrors: false},
    lineWrapping: true,
    extraKeys: {
      "Ctrl-S": function() { httpPost_writefile_<?php echo $key;?>('<?php echo $dir.'/'.$tab_dict[2][$key]; ?>', String(encodeURIComponent(asciiinput_editor_<?php echo $key;?>.getValue())));}
    }, 
    onChange: function() {
      updatePreview_<?php echo $key;?>(asciiinput_editor_<?php echo $key;?>);
      document.getElementById("ascii_<?php echo $key;?>_save_btn").className = "btn btn-medium btn-warning";
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
      updatePreview_<?php echo $key;?>(asciiinput_editor_<?php echo $key;?>);
		  asciiinput_editor_<?php echo $key;?>.setLineClass(ascii_Line_<?php echo $key;?>, null, null);
      ascii_Line_<?php echo $key;?> = asciiinput_editor_<?php echo $key;?>.setLineClass(asciiinput_editor_<?php echo $key;?>.getCursor().line, null, "activeline");
    }
  });

  var ascii_Line_<?php echo $key;?> = asciiinput_editor_<?php echo $key;?>.setLineClass(0, "activeline");


</script>

<?php else: ?>
  <div class="alert alert-error"><?php echo $text_access_error;?></div>
<?php endif;?>

