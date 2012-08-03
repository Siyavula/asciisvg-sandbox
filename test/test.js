// ========================
// Variables
// ========================

var picture, svgpicture, doc;

// ========================
// Functions
// ========================

function myCreateElementSVG(t) {
  if (isIE) return doc.createElement(t);
  else return doc.createElementNS("http://www.w3.org/2000/svg",t);
}

function drawPictures(src) {
	
	var index = 0;
	var pictures = document.getElementById("picture1input").value.split('\n');
	var len = pictures.length;
	var error_text = "";
	
	//document.getElementById('screen_dump').innerHTML = "\ndrawPictures - len = " + len;
	
	for (index = 0; index < len; index++) 
	{
		var src = pictures[index];
		
		src = src.replace(/plot\(\x20*([^\"f\[][^\n\r]+?)\,/g,"plot\(\"$1\",");
		src = src.replace(/plot\(\x20*([^\"f\[][^\n\r]+)\)/g,"plot(\"$1\")");
		src = src.replace(/([0-9])([a-zA-Z])/g,"$1*$2");
		src = src.replace(/\)([\(0-9a-zA-Z])/g,"\)*$1");
	
		//document.getElementById('screen_dump').innerHTML += "<br>" + src;
		
		try 
		{ 
			with (Math) eval(src); 
			error_text += "<br>none";
		} 
		catch(err)
		{
			error_text += "<br>Image FAILED to generate (" + err + ")";
		}
	
	}
	
	document.getElementById('screen_dump').innerHTML += "<br>" + error_text;
	
	//document.getElementById('error_msg').value = error_text;
	
	//document.getElementById('screen_dump').innerHTML = "drawPictures - complete = ";

}

function line(p,q,id) {
	node = myCreateElementSVG("path");
	node.setAttribute("id", id);
	svgpicture.appendChild(node);	
}

// ========================
// Main
// ========================





