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

function xmlhttpPost(image_format) {
	  var xmlHttpReq = false;
	  var self = this;
		var ascii_input_code = String(encodeURIComponent(asciiinput_editor_0.getValue()));
		var python_input_code = String(encodeURIComponent(pythoninput_editor.getValue()));
		var random_seed = document.getElementById("random_seed_0").value;
		var random_seed_lock = document.getElementById("randomize_lock_0").checked;

		// Mozilla/Safari
	  if (window.XMLHttpRequest) {
	      self.xmlHttpReq = new XMLHttpRequest();
	  }
	  // IE
	  else if (window.ActiveXObject) {
	      self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  self.xmlHttpReq.open('POST', "cgi-bin/processor.py", true);
	  self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  self.xmlHttpReq.onreadystatechange = function() {
	      if (self.xmlHttpReq.readyState == 4) {
						var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText).split ("[BRK]");
						document.getElementById("outputNode_0").innerHTML = xmlHttp_data[0];
						document.getElementById("error_msg_0").innerHTML = xmlHttp_data[1];
						document.getElementById("random_seed_0").value = xmlHttp_data[2];
						document.getElementById("debug_string_0").value = xmlHttp_data[3];
						// Download PNG
						if (image_format == "PNG"){populateIframe('download_frame','cgi-bin/buffer.png');}
	      }
	  }
		if (image_format == "PNG")
		{
			self.xmlHttpReq.send("type=png&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=true&randomize_lock=" + random_seed_lock + "&random_seed=" + random_seed);
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

function auto_update_image() {
	if (document.getElementById("autocomplete_checkbox_0").checked) { update_SVG(); }
}

function local_storage_save()	{
	var a = pythoninput_editor.getValue();
	var b = asciiinput_editor_0.getValue();
	window.localStorage["code"] = String(a) + "[BRK]" + String(b);
}

function local_storage_recall() {
	if (window.localStorage["code"])
	{
		var code_data = window.localStorage["code"].split("[BRK]");
		document.getElementById("pythoninput").innerHTML = String(code_data[0]);
		document.getElementById("asciiinput-0").innerHTML = String(code_data[1]);
	}
	else
	{
    asciiinput_editor_0.setValue('# ASCII code here...\n\n# Sky\nfill="lightblue"\nrect([-10,-10],[10,10])\nstrokewidth=2\n\n# Ground\nfill = "forestgreen"; stroke = "darkgreen"\nrect([-10,-10],[10,-2.5])\n\n# Clouds\nfill = "white";\nstroke = "grey"\ncloud([2,2],1.5,6)\n\n# Stars\nfill = "yellow"; stroke = "orangered"\nstar([-2.5,3],1,20,0.8)\n\n# Demo Text\ntext([2,2.5], "T_{i}^{<valueof>a</valueof>}")\n\n# dprint example\ndprint(\'<valueof>"ascii: " +str(a)</valueof>\')\n\n# Stars\nstrokewidth=1.5\nfill = "yellow"; stroke = "orangered"\nstar([0,4],0.3,8,0.3)\n\n#Grass\nstrokewidth=2\nfill = "yellow"; stroke = "darkgreen"\ngrass([-2,-3],2,6)\n\n# Flower base\nstrokewidth=2\nfill = "yellow"; stroke = "darkgreen"\ngrass([2,-3],2,5)\n\n# Flower head\nstrokewidth=1.5\nfill = "red"; stroke = "black"\nflower([2,-0.8],0.4,12, "yellow","black")');
		pythoninput_editor.setValue('# Python code here...\n\na = random.randint(50,300)\n\n#dprint example\ndprint("python: " + str(a))');
	}
}

function load_demo() {
	if (confirm('This will replace your current code with DEMO code. Are you sure?')) 
	{
    asciiinput_editor.setValue('# ASCII code here...\n\n# Sky\nfill="lightblue"\nrect([-10,-10],[10,10])\nstrokewidth=2\n\n# Ground\nfill = "forestgreen"; stroke = "darkgreen"\nrect([-10,-10],[10,-2.5])\n\n# Clouds\nfill = "white";\nstroke = "grey"\ncloud([2,2],1.5,6)\n\n# Stars\nfill = "yellow"; stroke = "orangered"\nstar([-2.5,3],1,20,0.8)\n\n# Demo Text\ntext([2,2.5], "T_{i}^{<valueof>a</valueof>}")\n\n# dprint example\ndprint(\'<valueof>"ascii: " +str(a)</valueof>\')\n\n# Stars\nstrokewidth=1.5\nfill = "yellow"; stroke = "orangered"\nstar([0,4],0.3,8,0.3)\n\n#Grass\nstrokewidth=2\nfill = "yellow"; stroke = "darkgreen"\ngrass([-2,-3],2,6)\n\n# Flower base\nstrokewidth=2\nfill = "yellow"; stroke = "darkgreen"\ngrass([2,-3],2,5)\n\n# Flower head\nstrokewidth=1.5\nfill = "red"; stroke = "black"\nflower([2,-0.8],0.4,12, "yellow","black")');
		pythoninput_editor.setValue('# Python code here...\n\na = random.randint(50,300)\n\n#dprint example\ndprint("python: " + str(a))');
	} 
}

function update_SVG() { 
	local_storage_save();
	xmlhttpPost("SVG");
}

function update_PNG() { 
	local_storage_save();
	xmlhttpPost("PNG");
}

function getSuggestion(line) {
	document.getElementById("suggestionNode_0").value = "";
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
	if (max_term != "") {document.getElementById("suggestionNode_0").value = dict[max_term];}
}

function httpPost_writefile(path, content) {
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

	  self.xmlHttpReq.open('GET', "functions/write_file.php?file_path="+path+"&file_content="+content, true);
	  self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  self.xmlHttpReq.onreadystatechange = function() {
	      if (self.xmlHttpReq.readyState == 4) {
						var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText);
						document.getElementById("save_status_0").innerHTML = xmlHttp_data;
            setTimeout('document.getElementById("save_status_0").innerHTML = "";', 2000);
	      }
	  }
    // Command to write to file
    self.xmlHttpReq.send();
}

