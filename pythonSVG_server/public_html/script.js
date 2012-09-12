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
		var ascii_input_code = String(encodeURIComponent(document.getElementById("asciiinput").value));
		var python_input_code = String(encodeURIComponent(document.getElementById("pythoninput").value));

		// Mozilla/Safari
	  if (window.XMLHttpRequest) {
	      self.xmlHttpReq = new XMLHttpRequest();
	  }
	  // IE
	  else if (window.ActiveXObject) {
	      self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  self.xmlHttpReq.open('POST', "./cgi-bin/processor.py", true);
	  self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  self.xmlHttpReq.onreadystatechange = function() {
	      if (self.xmlHttpReq.readyState == 4) {
	          document.getElementById("outputNode").innerHTML = self.xmlHttpReq.responseText;
	      }
	  }
		if (image_format == "PNG")
		{
			self.xmlHttpReq.send("png=" + ascii_input_code + "&python=" + python_input_code + " ");
		}
		else if (image_format == "SVG")
		{
			self.xmlHttpReq.send("svg=" + ascii_input_code + "&python=" + python_input_code + " ");
		}
}

// ================================================
// Additional functions
// Author: Leen Remmelzwaal
// Date: 14th June 2012
// ================================================

function auto_update_SVG() {
	if (document.getElementById("autocomplete_checkbox").checked) { update_SVG(); }
}

function update_SVG() { 
	xmlhttpPost("SVG");
	document.getElementById("image_title").style.backgroundColor = "999999";
	document.getElementById("image_cell").style.backgroundColor = "CCCCCC";
	document.getElementById("image_title").innerHTML = "<b>Output SVG</b>";
}

function update_PNG() { 
	xmlhttpPost("PNG");
	document.getElementById("image_title").style.backgroundColor = "FF6666";
	document.getElementById("image_cell").style.backgroundColor = "FFBBBB";
	document.getElementById("image_title").innerHTML = "<b>Output PNG!</b>";
}

function getSuggestion() {
  var line_number = document.getElementById("picture1input").value.substr(0, document.getElementById("picture1input").selectionStart).split("\n").length - 1
	var line = document.getElementById("picture1input").value.split('\n')[line_number];
	document.getElementById("suggestionNode").value = ""	
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
									'initPicture':'initPicture(xmin,xmax,ymin,ymax)'
						};
	for (term in dict)
  {
  	if (line.indexOf(term) > -1)
		{
			document.getElementById("suggestionNode").value = dict[term];
		}
  }
}

