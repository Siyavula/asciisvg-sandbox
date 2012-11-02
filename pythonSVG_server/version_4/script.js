/* ==========================================================================================
Script Library -- supporting PythonSVG
Author: Leen Remmelzwaal
Date: 10th September 2012
========================================================================================== */

// ================================================
// AJAX Functions
// Author: Leen Remmelzwaal
// Date: 10th September 2012
// ================================================

function xmlhttpPost(image_format) {
	  var xmlHttpReq = false;
	  var self = this;
		var ascii_input_code = String(encodeURIComponent(asciiinput_editor.getValue()));
		var python_input_code = String(encodeURIComponent(pythoninput_editor.getValue()));
		var random_seed = document.getElementById("random_seed").value;

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
						document.getElementById("outputNode").innerHTML = xmlHttp_data[0];
						document.getElementById("error_msg").innerHTML = xmlHttp_data[1];
						document.getElementById("random_seed").value = xmlHttp_data[2];
						// Download PNG
						if (image_format == "PNG"){populateIframe('download_frame','cgi-bin/buffer.png');}
	      }
	  }
		if (image_format == "PNG")
		{
			self.xmlHttpReq.send("type=png&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=true&randomize_lock=" + document.getElementById("randomize_lock").checked + "&random_seed=" + random_seed);
		}
		else if (image_format == "SVG")
		{
			var text;
			text = "type=svg&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=true&randomize_lock=" + document.getElementById("randomize_lock").checked + "&random_seed=" + random_seed;
			self.xmlHttpReq.send(text);
		}
}

// ================================================
// Additional functions
// Author: Leen Remmelzwaal
// Date: 14th June 2012
// ================================================

function auto_update_image() {
	if (document.getElementById("autocomplete_checkbox").checked) { update_SVG(); }
}

function update_SVG() { 
	xmlhttpPost("SVG");
}

function update_PNG() { 
	xmlhttpPost("PNG");
}

function getSuggestion(line) {
	document.getElementById("suggestionNode").value = "";
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
									'ellipse':'ellipse(center,xradius,yradius)',
									'circle':'circle(center,radius)',
									'arc':'arc(start,end,radius)',
									'setBorder':'setBorder(size, color)',
									'initPicture':'initPicture(xmin,xmax,ymin,ymax)',
									'start_group':'start_group([center_x,center_y], rotate_angle, [scale_x,scale_y], [translate_x,translate_y])',
									'angle_arc':'angle_arc([center_x,center_y], radius, start_deg, stop_deg)',
									'stop_group':'stop_group()'
						};
	for (term in dict)
  {
  	if (line.indexOf(term) > -1)
		{
			document.getElementById("suggestionNode").value = dict[term];
		}
  }
}

// Download PNG
function populateIframe(id,path) 
{
    var ifrm = document.getElementById(id);
    ifrm.src = "download.php?path="+path;
}
