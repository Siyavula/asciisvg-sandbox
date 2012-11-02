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

function xmlhttpPost(image_format, html, css) {
		var xmlHttpReq = false;
	  var self = this;
		var ascii_input_code = String(encodeURIComponent(style));
		var python_input_code = String(encodeURIComponent(html));
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
						if (String(xmlHttp_data[0]).length > 0)
						{
							$body.html("<div style='padding: 100 0 0 0; text-align: center;'>" + xmlHttp_data[0] +"</div>");
							document.getElementById("random_seed").value = xmlHttp_data[2];
							// Download PNG
							if (image_format == "PNG"){populateIframe('download_frame','cgi-bin/buffer.png');}
						}
						else if (String(xmlHttp_data[1]).length > 0)
						{
							var var_substring;
							if (xmlHttp_data[1].indexOf("Original Code") > 0)
								{var_substring = xmlHttp_data[1].substr(0,xmlHttp_data[1].indexOf("Original Code"))}
							else 
								{var_substring = xmlHttp_data[1];}
							$body.html("<div style='background: #fff; margin: 100 auto; width: 400px; color:F00; padding: 50px; text-align: center; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-box-shadow: rgba(0,0,0,0.2) 0px 1px 3px; -moz-box-shadow: rgba(0,0,0,0.2) 0px 1px 3px; box-shadow: rgba(0,0,0,0.2) 0px 1px 3px;'>"+var_substring+"</div>");
						}
	      }
	  }
		if (image_format == "PNG")
		{
			var random_lock_bool, text;
			random_lock_bool = (document.getElementById("random_lock").innerHTML == "Lock Random Seed" && "false" || "true");
			text = "type=png&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=" + 'true' + "&randomize_lock=" + random_lock_bool + "&random_seed=" + random_seed;
			self.xmlHttpReq.send(text + "123!!");
		}
		else if (image_format == "SVG")
		{
			var random_lock_bool, text;
			random_lock_bool = (document.getElementById("random_lock").innerHTML == "Lock Random Seed" && "false" || "true");
			text = "type=svg&ascii=" + ascii_input_code + " &python=" + python_input_code + " &strip_tags=" + 'true' + "&randomize_lock=" + random_lock_bool + "&random_seed=" + random_seed;
			self.xmlHttpReq.send(text);
		}
}

// ================================================
// Additional functions
// Author: Leen Remmelzwaal
// Date: 14th June 2012
// ================================================

function getSuggestion(line) {
	document.getElementById("suggestion_box").value = "";
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
			document.getElementById("suggestion_box").value = dict[term];
		}
  }
}

function mouse_coords()
{
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information

	document.getElementById("error_msg").innerHTML = posx + ", " + posy;
}

