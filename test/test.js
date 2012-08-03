// ========================================================================
// Variables
// ========================================================================

// ==================================
// Initialization Variables
// ==================================

var flag_initialized = false;

// ==================================
// Object Variables
// ==================================

var raw_code;
var svg_code;
var svg_picture; 	// Current picture
var svg_new;		// New picture

// ==================================
// SVG Layout
// ==================================

var xmin = -5;
var xmax = 5;
var ymin = -5;
var ymax = 5;

var xscl = 1;
var yscl = 1;

var xgrid = 1;
var ygrid = 1;

var xtick = 4; 
var ytick = 4;

var defaultborder = 0;
var border = defaultborder;

var defaultwidth = 400; 
var height = defaultwidth;

var defaultheight = 400;
var width = defaultheight;

var xunitlength = 1; //(width-2*border)/(xmax-xmin);
var yunitlength = 1; //(height-2*border)/(ymax-ymin);

var origin = [0,0]; //[-xmin*xunitlength,-ymin*yunitlength];

// ==================================
// SVG Constant Variables
// ==================================

var axesstroke = "black";
var gridstroke = "grey";

var strokewidth = "1"; 			// pixel
var strokedasharray = null;	// default line type
var stroke = "white"; 			// default line color

var fill = "none";    			// default fill color
var fontstyle = "italic"; 		// default shape for text labels
var fontfamily = "times"; 		// default font
var fontsize = "16";      		// default size
var fontweight = "normal";		// default font weight
var fontstroke = "none";  		// default font outline color
var fontfill = "none";    		// default font color

var markerstrokewidth = "1";
var markerstroke = "black";
var markerfill = "yellow";
var markersize = 4;
var marker = "none";

var arrowfill = stroke;
var dotradius = 4;
var ticklength = 4;

// ==================================
// SVG Labels
// ==================================

var above = "above";
var below = "below";
var left = "left";
var right = "right";
var aboveleft = "aboveleft";
var aboveright = "aboveright";
var belowleft = "belowleft";
var belowright = "belowright";

// ==================================
// SVG Function Variables
// ==================================

var cpi = "\u03C0", ctheta = "\u03B8";
var pi = Math.PI, ln = Math.log, e = Math.E;
var sign = function(x) { return (x==0?0:(x<0?-1:1)) };
var arcsin = Math.asin; 
var arccos = Math.acos;
var arctan = Math.atan;
var sinh = function(x) { return (Math.exp(x)-Math.exp(-x))/2 };
var cosh = function(x) { return (Math.exp(x)+Math.exp(-x))/2 };
var tanh = function(x) { return (Math.exp(x)-Math.exp(-x))/(Math.exp(x)+Math.exp(-x)) };
var arcsinh = function(x) { return ln(x+Math.sqrt(x*x+1)) };
var arccosh = function(x) { return ln(x+Math.sqrt(x*x-1)) };
var arctanh = function(x) { return ln((1+x)/(1-x))/2 };
var sech = function(x) { return 1/cosh(x) };
var csch = function(x) { return 1/sinh(x) };
var coth = function(x) { return 1/tanh(x) };
var arcsech = function(x) { return arccosh(1/x) };
var arccsch = function(x) { return arcsinh(1/x) };
var arccoth = function(x) { return arctanh(1/x) };
var sec = function(x) { return 1/Math.cos(x) };
var csc = function(x) { return 1/Math.sin(x) };
var cot = function(x) { return 1/Math.tan(x) };
var arcsec = function(x) { return arccos(1/x) };
var arccsc = function(x) { return arcsin(1/x) };
var arccot = function(x) { return arctan(1/x) };

// ========================================================================
// Functions
// ========================================================================

function initializeVariables() {
	//document.getElementById('screen_dump').innerHTML = "CLEAN";
	//document.getElementById('screen_dump').innerHTML += "<br>flag_initialized = " + flag_initialized;
}

function myCreateElementSVG(t) {
	return document.createElementNS("http://www.w3.org/2000/svg",t);
}

function initPicture(x_min,x_max,y_min,y_max)
{
	//document.getElementById('screen_dump').innerHTML += "<br>INIT";
	
	//document.getElementById('screen_dump').innerHTML += "<br>INIT - flag_initialized = " + flag_initialized;
	
	if (flag_initialized == false)
	{
		// svg_picture
		svg_picture = myCreateElementSVG("svg");
		svg_picture.setAttribute("id","picture1");
		svg_picture.setAttribute("style","display:inline");
		svg_picture.setAttribute("width",width);
		svg_picture.setAttribute("height",height);
		svg_picture.setAttribute("xunitlength",xunitlength);
		svg_picture.setAttribute("yunitlength",yunitlength);
		svg_picture.setAttribute("xmin",xmin);
		svg_picture.setAttribute("xmax",xmax);
		svg_picture.setAttribute("ymin",ymin);
		svg_picture.setAttribute("ymax",ymax);
		svg_picture.setAttribute("ox", 0);
		svg_picture.setAttribute("oy", 0);
		//document.getElementById('screen_dump').innerHTML += "<br>INIT - svg_picture created";
		
		// Append SVG to DIV
		document.getElementById('outputNode').appendChild(svg_picture);
		//document.getElementById('screen_dump').innerHTML += "<br>INIT - svg_picture appended to DIV";
		
		// Create a Blank Rectangle
		var node;
		node = myCreateElementSVG("rect");
		node.setAttribute("x","0");
		node.setAttribute("y","0");
		node.setAttribute("width",  width);
		node.setAttribute("height", height);
		node.setAttribute("stroke-width", strokewidth);
		node.setAttribute("stroke", stroke);
		node.setAttribute("fill", "white");
		
		// Append RECTANGLE to SVG
		svg_picture.appendChild(node);
		//document.getElementById('screen_dump').innerHTML += "<br>INIT - white rect created";
		
		// Flag
		flag_initialized = true;
		//document.getElementById('screen_dump').innerHTML += "<br>INIT - flag SET";
	}
}

function updatePicture()
{
	//document.getElementById('screen_dump').innerHTML += "<br>UPDATE";
	
	//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - flag_initialized = " + flag_initialized;
	
	if (flag_initialized == true)
	{
		// ============================
		// Initialize Background
		// ============================
		
		// svg_picture
		svg_new = myCreateElementSVG("svg");
		svg_new.setAttribute("id","picture2");
		svg_new.setAttribute("style","display:inline");
		svg_new.setAttribute("width",width);
		svg_new.setAttribute("height",height);
		svg_new.setAttribute("xunitlength",xunitlength);
		svg_new.setAttribute("yunitlength",yunitlength);
		svg_new.setAttribute("xmin",xmin);
		svg_new.setAttribute("xmax",xmax);
		svg_new.setAttribute("ymin",ymin);
		svg_new.setAttribute("ymax",ymax);
		svg_new.setAttribute("ox", 0);
		svg_new.setAttribute("oy", 0);
		//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - svg_picture created";
		
		// Create a Blank Rectangle
		var node;
		node = myCreateElementSVG("rect");
		node.setAttribute("x","0");
		node.setAttribute("y","0");
		node.setAttribute("width",  width);
		node.setAttribute("height", height);
		node.setAttribute("stroke-width", strokewidth);
		node.setAttribute("stroke", stroke);
		node.setAttribute("fill", "white");
		
		// Append RECTANGLE to SVG
		svg_new.appendChild(node);
		//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - white rect created";
		
		// ============================
		// Draw Elements
		// ============================
		
		var array_raw_code = document.getElementById("picture1input").value.split('\n');
		var array_len = array_raw_code.length;
		var error_text = "";
		svg_code = "";
		
		//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - DRAW - " + array_len + " instructions";
		
		for (i = 0; i < array_len; i++) 
		{
			var line_raw_code = array_raw_code[i];
			
			// Formatting
			line_raw_code = line_raw_code.replace(/plot\(\x20*([^\"f\[][^\n\r]+?)\,/g,"plot\(\"$1\",");
			line_raw_code = line_raw_code.replace(/plot\(\x20*([^\"f\[][^\n\r]+)\)/g,"plot(\"$1\")");
			line_raw_code = line_raw_code.replace(/([0-9])([a-zA-Z])/g,"$1*$2");
			line_raw_code = line_raw_code.replace(/\)([\(0-9a-zA-Z])/g,"\)*$1");
			
			// Evaluate Functions
			
			try { 
				with (Math) eval(line_raw_code); 
				error_text += ""
				svg_code += line_raw_code + "<br>";
				//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - DRAW - " + line_raw_code;
			} 
			catch(err)	{
				error_text += "<br>ERROR - " + line_raw_code + " (" + err + ")";
			}
			
		}
		document.getElementById('screen_dump').innerHTML = svg_code;

		// Error Reporting
		document.getElementById('error_msg').value = error_text;
		//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - DRAW - complete";
		
		// ================================
		// // Append SVG to DIV (replace)
		// ================================
		
		//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - parent = " + svg_picture.parentNode;
		
		svg_picture.parentNode.appendChild(svg_new);
		svg_picture.parentNode.removeChild(svg_picture);
		
		svg_picture = svg_new; // Replace old with new
		//document.getElementById('screen_dump').innerHTML += "<br>UPDATE - svg replaced";
	}
}

// ========================================================================
// Drawing Functions
// ========================================================================

function setBorder(x) { svg_new.setAttribute("border",x); }

function line(p,q,id) {
	node = myCreateElementSVG("path");
	node.setAttribute("id", id);
	svg_new.appendChild(node);	
}

function axes(dx,dy,labels,gdx,gdy) 
{
}

function path(plist,id,c) {
}

function curve(plist,id) {
}

function circle(center,radius,id) { // coordinates in units
}

function arc(start,end,radius,id) { // coordinates in units
}

function ellipse(center,rx,ry,id) { // coordinates in units
}

function rect(p,q,id,rx,ry) { // opposite corners in units, rounded by radii
	
	var node;
	node = myCreateElementSVG("rect");
	node.setAttribute("id", id);
	node.setAttribute("x",p[0]*xunitlength+origin[0]);
	node.setAttribute("y",height-q[1]*yunitlength-origin[1]);
	node.setAttribute("width",(q[0]-p[0])*xunitlength);
	node.setAttribute("height",(q[1]-p[1])*yunitlength);
	if (rx!=null) node.setAttribute("rx",rx*xunitlength);
	if (ry!=null) node.setAttribute("ry",ry*yunitlength);
	node.setAttribute("stroke-width", strokewidth);
	node.setAttribute("stroke", stroke);
	node.setAttribute("fill", fill);
	
	svg_new.appendChild(node);
	//document.getElementById('screen_dump').innerHTML += "<br>RECT - done";
}

function text(p,st,pos,id,fontsty) {

}

function ASdot(center,radius,s,f) { // coordinates in units, radius in pixel
}

function dot(center, typ, label, pos, id) {
}

function arrowhead(p,q)
{
}

function grid(dx,dy) { // for backward compatibility
  axes(dx,dy,null,dx,dy)
}

function noaxes() {
}

function axes(dx,dy,labels,gdx,gdy) {
}

function mathjs(st) {
}

function plot(fun,x_min,x_max,points,id) {
}

function slopefield(fun,dx,dy) {
}

// ================================================
// Additional functions
// Author: Leen Remmelzwaal
// Date: 14th June 2012
// ================================================

function fn_autocomplete()
{
	if (document.getElementById("autocomplete_checkbox").checked)
	{ 
		updatePicture();
	}
}



