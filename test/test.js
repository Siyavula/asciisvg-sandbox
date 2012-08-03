// ========================
// Variables
// ========================

var picture, svgpicture, doc;
var isIE = document.createElementNS==null;

// ========================
// Functions
// ========================

function myCreateElementSVG(t) {
  if (isIE) return doc.createElement(t);
  else return doc.createElementNS("http://www.w3.org/2000/svg",t);
}

function drawPictures() {
	
	var index = 0;
	
	document.getElementById('screen_dump').innerHTML = "drawPictures - precode";
	
	var pictures = document.getElementsByTagName("textarea");
	picture = (isIE ? pictures[index] : pictures[0]);
	document.getElementById('screen_dump').innerHTML = "drawPictures - picture = " + picture;
	
	var src = picture.getAttribute("script");
	
	src = src.replace(/plot\(\x20*([^\"f\[][^\n\r]+?)\,/g,"plot\(\"$1\",");
    src = src.replace(/plot\(\x20*([^\"f\[][^\n\r]+)\)/g,"plot(\"$1\")");
    src = src.replace(/([0-9])([a-zA-Z])/g,"$1*$2");
    src = src.replace(/\)([\(0-9a-zA-Z])/g,"\)*$1");
	
	document.getElementById('screen_dump').innerHTML = "drawPictures - src = " + src;

}

function line(p,q,id) {
	node = myCreateElementSVG("path");
	node.setAttribute("id", id);
	svgpicture.appendChild(node);	
}

// ========================
// Main
// ========================





