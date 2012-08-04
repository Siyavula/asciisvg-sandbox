/* ==========================================================================================
SCG Library
Author: Leen Remmelzwaal
Date: 3rd August 2012

===================================
Method behind creating SVG image
===================================

Step 1: Create an SVG element: 							document.createElementNS("http://www.w3.org/2000/svg",element);
Step 2: Set attribute of the SVG element:  	element.setAttribute(attribute,value);
Step 3: Append SVG elements to SVG canvas: 	canvas.appendChild(element);
Step 4: Replace old SVG canvas with new:		svg_old.parentNode.replaceChild(svg_new,svg_old);

===================================
TO DO
===================================

1. Axes
2. Dot / ASdot?
3. Finish Functions ....

========================================================================================== */

// ==============================
// Variables
// ==============================

// Object Variables
var svg_picture, svg_new;

// Canvas Variables
var xmin = defaultxmin 								= -5;
var xmax = defaultxmax 								= 5;
var ymin = defaultymin 								= -5;
var ymax = defaultymax 								= 5;
var xscl = defaultxscl 								= 1;
var yscl = defaultyscl 								= 1;
var xgrid = defaultyscl 							= 1;
var ygrid = defaultygrid 							= 1;
var xtick = defaultxtick 							= 4;
var ytick = defaultytick 							= 4;
var border = defaultborder 						= 0;
var height = defaultwidth 						= 400;
var width = defaultheight 						= 400;
var xunitlength = defaultxunitlength 	= 1;
var yunitlength = defaultyunitlength 	= 1;
var origin = defaultorigin 						= [0,0];

// Element Variables
var axesstroke = defaultaxesstroke 						= "black";
var gridstroke = defaultgridstroke 						= "grey";
var strokewidth = defaultstrokewidth 					= 1; 					
var strokedasharray = defaultstrokedasharray 	= 1;
var stroke = defaultstroke 										= "black";
var arrowfill = defaultarrowfill 							= stroke;
var fill = defaultfill 												= "none";
var fontstyle = defaultfontstyle 							= "italic";
var fontfamily = defaultfontfamily 						= "times";		
var fontsize = defaultfontsize 								= 16;
var fontweight = defaultfontweight 						= "normal";
var fontstroke = defaultfontstroke 						= "none";
var fontfill = defaultfontfill 								= "none";    
var markerfill = defaultmarkerstrokewidth 		= 1;
var markerstroke = defaultmarkerstroke 				= "black";
var markerfill = defaultmarkerfill 						= "yellow";
var markersize = defaultmarkersize 						= 4;
var marker = defaultmarker 										= "none";
var dotradius = defaultdotradius 							= 4;
var ticklength = defaultticklength 						= 4;

// SVG Labels
var above = "above"; var below = "below"; var left = "left"; var right = "right"; var aboveleft = "aboveleft"; var aboveright = "aboveright"; var belowleft = "belowleft"; var belowright = "belowright";

// SVG Function Variables
var cpi = "\u03C0", ctheta = "\u03B8"; var pi = Math.PI, ln = Math.log, e = Math.E; var sign = function(x) { return (x==0?0:(x<0?-1:1)) }; var arcsin = Math.asin; var arccos = Math.acos; var arctan = Math.atan; var sinh = function(x) { return (Math.exp(x)-Math.exp(-x))/2 }; var cosh = function(x) { return (Math.exp(x)+Math.exp(-x))/2 }; var tanh = function(x) { return (Math.exp(x)-Math.exp(-x))/(Math.exp(x)+Math.exp(-x)) }; var arcsinh = function(x) { return ln(x+Math.sqrt(x*x+1)) }; var arccosh = function(x) { return ln(x+Math.sqrt(x*x-1)) }; var arctanh = function(x) { return ln((1+x)/(1-x))/2 }; var sech = function(x) { return 1/cosh(x) }; var csch = function(x) { return 1/sinh(x) }; var coth = function(x) { return 1/tanh(x) }; var arcsech = function(x) { return arccosh(1/x) }; var arccsch = function(x) { return arcsinh(1/x) }; var arccoth = function(x) { return arctanh(1/x) }; var sec = function(x) { return 1/Math.cos(x) }; var csc = function(x) { return 1/Math.sin(x) }; var cot = function(x) { return 1/Math.tan(x) }; var arcsec = function(x) { return arccos(1/x) }; var arccsc = function(x) { return arcsin(1/x) }; var arccot = function(x) { return arctan(1/x) };

// ==============================
// Functions (SVG VARIABLES)
// ==============================

function reset_variables()
{

// SVG Layout
xmin = defaultxmin;	xmax = defaultxmax;	ymin = defaultymin;	ymax = defaultymax;	xscl = defaultxscl;	yscl = defaultyscl; xgrid = defaultyscl;	ygrid = defaultygrid;	xtick = defaultxtick;	ytick = defaultytick;	border = defaultborder;	height = defaultwidth;	width = defaultheight;	xunitlength = defaultxunitlength; yunitlength = defaultyunitlength;	origin = defaultorigin;

// SVG Constant Variables
axesstroke = defaultaxesstroke;	gridstroke = defaultgridstroke;	strokewidth = defaultstrokewidth; strokedasharray = defaultstrokedasharray = null;	stroke = defaultstroke;	fill = defaultfill;	fontstyle = defaultfontstyle;	fontfamily = defaultfontfamily;	fontsize = defaultfontsize; fontweight = defaultfontweight;	fontstroke = defaultfontstroke;	fontfill = defaultfontfill; markerfill = defaultmarkerstrokewidth;	markerstroke = defaultmarkerstroke;	markerfill = defaultmarkerfill;	markersize = defaultmarkersize;	marker = defaultmarker;	arrowfill = defaultarrowfill; dotradius = defaultdotradius;	ticklength = defaultticklength;

}

/* 
==============================
Functions (SVG CANVAS)
==============================
> setBorder(x, color)
> initPicture(a,b,c,d)
> updatePicture()
============================== 
*/






function setBorder(x, color) 
{ 
	// Set Variables
	if (x != null) 			{border = x;}
	if (color != null) 	{stroke = color;}
}

function initPicture(a,b,c,d)
{
	// Set Variables
	if (a != null) 	{xmin = a;}
	if (b != null) 	{xmax = b;}
	if (c != null) 	{ymin = c;}
	if (d != null) 	{ymax = d;}

	// Re-calculate variables
	xunitlength = (width-2*border)/(xmax-xmin);
  yunitlength = (height-2*border)/(ymax-ymin);
	origin = [-xmin*xunitlength+border,-ymin*yunitlength+border];

	if (svg_picture == null)
	{
		svg_picture = myCreateElementSVG("svg");
		svg_picture.setAttribute("id","picture1");
		document.getElementById('outputNode').appendChild(svg_picture);
		reset_variables(); // Reset Variables to original values for the next update	
	}
	else
	{
		// Initialize SVG Canvas
		svg_new = myCreateElementSVG("svg");
		svg_new.setAttribute("id","picture1");
		svg_new.setAttribute("style","display:inline");
		svg_new.setAttribute("width",width);
		svg_new.setAttribute("height",height);
		svg_new.setAttribute("xunitlength",xunitlength);
		svg_new.setAttribute("yunitlength",yunitlength);
		svg_new.setAttribute("xmin",xmin);
		svg_new.setAttribute("xmax",xmax);
		svg_new.setAttribute("ymin",ymin);
		svg_new.setAttribute("ymax",ymax);
		svg_new.setAttribute("ox", origin[0]);
		svg_new.setAttribute("oy", origin[1]);
	
		// Initialize blank background
		var node;
		node = myCreateElementSVG("rect");
		node.setAttribute("x","0");
		node.setAttribute("y","0");
		node.setAttribute("width",  width);
		node.setAttribute("height", height);
		node.setAttribute("stroke-width", border);
		node.setAttribute("stroke", stroke);
		node.setAttribute("fill", "white");
	
		// Append RECTANGLE to SVG
		svg_new.appendChild(node);

		// Append SVG to DIV (replace)
		svg_picture.parentNode.replaceChild(svg_new,svg_picture);

		// Replace old SVG object with new object
		svg_picture = svg_new; 
	}
}

function updatePicture()
{
	
	// Initialize Picture before user does
	initPicture();

	// Fetch code line-by-line
	var array_raw_code = document.getElementById("picture1input").value.split('\n');
	var array_len = array_raw_code.length;
	var error_text = "";
	
	for (i = 0; i < array_len; i++) {
		var line_raw_code = array_raw_code[i];
		
		// Formatting
		line_raw_code = line_raw_code.replace(/plot\(\x20*([^\"f\[][^\n\r]+?)\,/g,"plot\(\"$1\",");
		line_raw_code = line_raw_code.replace(/plot\(\x20*([^\"f\[][^\n\r]+)\)/g,"plot(\"$1\")");
		line_raw_code = line_raw_code.replace(/([0-9])([a-zA-Z])/g,"$1*$2");
		line_raw_code = line_raw_code.replace(/\)([\(0-9a-zA-Z])/g,"\)*$1");
		
		// Evaluate Functions
		try { with (Math) eval(line_raw_code); error_text += "";} 
		catch(err) { error_text += "<br>ERROR - " + line_raw_code + " (" + err + ")";	}
	}

	document.getElementById('error_msg').value = error_text; // Error Reporting
	reset_variables(); // Reset Variables to original values for the next update
}

/* 
==============================
Functions (BASIC SVG ELEMENTS)
==============================
> myCreateElementSVG(t)
> ASdot(center,radius,s,f)
> dot(center, typ, label, pos, id)
> arrowhead(p,q)
> text(p,st,pos,angle)
> mathjs(st)
============================== 
*/

function myCreateElementSVG(t) {
	return document.createElementNS("http://www.w3.org/2000/svg",t);
}

function ASdot(center,radius,s,f) {
}

function dot(center, typ, label, pos, id) {
  var node;
  var cx = center[0]*xunitlength+origin[0];
  var cy = height-center[1]*yunitlength-origin[1];
  if (typ=="+" || typ=="-" || typ=="|") {
    if (node==null) {
      node = myCreateElementSVG("path");
      node.setAttribute("id", id);
      svgpicture.appendChild(node);
    }
    if (typ=="+") {
      node.setAttribute("d",
        " M "+(cx-ticklength)+" "+cy+" L "+(cx+ticklength)+" "+cy+
        " M "+cx+" "+(cy-ticklength)+" L "+cx+" "+(cy+ticklength));
      node.setAttribute("stroke-width", .5);
      node.setAttribute("stroke", axesstroke);
    } else {
      if (typ=="-") node.setAttribute("d",
        " M "+(cx-ticklength)+" "+cy+" L "+(cx+ticklength)+" "+cy);
      else node.setAttribute("d",
        " M "+cx+" "+(cy-ticklength)+" L "+cx+" "+(cy+ticklength));
      node.setAttribute("stroke-width", strokewidth);
      node.setAttribute("stroke", stroke);
    }
  } else {
    if (node==null) {
      node = myCreateElementSVG("circle");
      node.setAttribute("id", id);
      svg_picture.appendChild(node);
    }
    node.setAttribute("cx",cx);
    node.setAttribute("cy",cy);
    node.setAttribute("r",dotradius);
    node.setAttribute("stroke-width", strokewidth);
    node.setAttribute("stroke", stroke);
    node.setAttribute("fill", (typ=="open"?"white":stroke));
  }
  if (label!=null) 
    text(center,label,(pos==null?"below":pos),(id==null?id:id+"label"))
}

function arrowhead(p,q) {
}

function text(p,st,pos,angle) {  /* DONE */

	// Default text positions
	if (angle == null) {angle = 0;}
	var textanchor = "middle";
  var dx = 0; 
	var dy = fontsize/3;
	
	// Text Positions
  if (pos == aboveleft)	{dx = -fontsize/2; 	dy = -fontsize/2;		textanchor = "end";}
	if (pos == above)			{dx = 0; 						dy = -fontsize/2;		textanchor = "middle";}
	if (pos == aboveright){dx = fontsize/2; 	dy = -fontsize/2;		textanchor = "start";}
	if (pos == left)			{dx = -fontsize/2; 	dy = fontsize/3;		textanchor = "end";}
	if (pos == right)			{dx = fontsize/2; 	dy = fontsize/3;		textanchor = "start";}
	if (pos == belowleft)	{dx = -fontsize/2; 	dy = fontsize;			textanchor = "end";}
	if (pos == below)			{dx = 0; 						dy = fontsize;			textanchor = "middle";}
	if (pos == belowright){dx = fontsize/2; 	dy = fontsize;			textanchor = "start";}

	// Text Rotation
	var node = myCreateElementSVG("text");
	var node_text = document.createTextNode(st);
  node.setAttribute("transform", "	rotate(" + angle + ", " + (p[0]*xunitlength+origin[0]+dx) + ", " + (height-p[1]*yunitlength-origin[1]+dy) + ")")
	node.appendChild(node_text);
	
	// Node Attributes
  node.lastChild.nodeValue = st;
  node.setAttribute("x",p[0]*xunitlength+origin[0]+dx);
  node.setAttribute("y",height-p[1]*yunitlength-origin[1]+dy);
  node.setAttribute("font-style",fontstyle);
  node.setAttribute("font-family",fontfamily);
  node.setAttribute("font-size",fontsize);
  node.setAttribute("font-weight",fontweight);
  node.setAttribute("text-anchor",textanchor);
  if (fontstroke!="none") node.setAttribute("stroke",fontstroke);
  if (fontfill!="none") node.setAttribute("fill",fontfill);
	
	// Attach Nodes
	svg_picture.appendChild(node);

}

function mathjs(st) {
}

/* 
==============================
Functions (COMPOUND SVG ELEMENTS)
==============================
> myCreateElementSVG(t)
> ASdot(center,radius,s,f)
> dot(center, typ, label, pos, id)
> arrowhead(p,q)
> text(p,st,pos,angle)
> mathjs(st)
============================== 
*/


function line(p,q,id) { /* DONE */
	var node = myCreateElementSVG("path");
	node.setAttribute("id", id);
	node.setAttribute("d","M"+(p[0]*xunitlength+origin[0])+","+
														(height-p[1]*yunitlength-origin[1])+" "+
														(q[0]*xunitlength+origin[0])+","+
														(height-q[1]*yunitlength-origin[1]));
	node.setAttribute("stroke-width", strokewidth);
  node.setAttribute("stroke", stroke);
  node.setAttribute("fill", fill);
	node.setAttribute("stroke-dasharray", strokedasharray);
	/* starting point (p) */
	if (marker=="dot" || marker=="arrowdot") {ASdot(p,markersize,markerstroke,markerfill); }
	/* ending point (q) */ 
	if (marker=="arrowdot" || marker=="arrow") {arrowhead(p,q);}
  if (marker=="dot") {ASdot(q,markersize,markerstroke,markerfill);}
	svg_picture.appendChild(node);
}

function ellipse(center,rx,ry,id) {  /* DONE */
  var node = myCreateElementSVG("ellipse");
  node.setAttribute("id", id);
  node.setAttribute("cx",center[0]*xunitlength+origin[0]);
  node.setAttribute("cy",height-center[1]*yunitlength-origin[1]);
  node.setAttribute("rx",rx*xunitlength);
  node.setAttribute("ry",ry*yunitlength);
  node.setAttribute("stroke-width", strokewidth);
  node.setAttribute("stroke", stroke);
  node.setAttribute("fill", fill);
	svg_picture.appendChild(node);
}

function circle(center,radius,id) {  /* DONE */
	ellipse(center,radius,radius,id);
}

function arc(start,end,radius,id) {
}

// ==============================
// Functions (COMPLEX SVG ELEMENTS)
// ==============================

function noaxes() {
}

function axes(dx,dy,labels,gdx,gdy) {

	var x, y, ldx, ldy, lx, ly, lxp, lyp, pnode, st;
  if (typeof dx=="string") { labels = dx; dx = null; }
  if (typeof dy=="string") { gdx = dy; dy = null; }
  if (xscl!=null) {dx = xscl; gdx = xscl; labels = dx}
  if (yscl!=null) {dy = yscl; gdy = yscl}
  if (xtick!=null) {dx = xtick}
  if (ytick!=null) {dy = ytick}

  dx = (dx==null?xunitlength:dx*xunitlength);
  dy = (dy==null?dx:dy*yunitlength);
  fontsize = Math.min(dx/2,dy/2,16);
  ticklength = fontsize/4;
  if (xgrid!=null) gdx = xgrid;
  if (ygrid!=null) gdy = ygrid;
  if (gdx!=null) {
    gdx = (typeof gdx=="string"?dx:gdx*xunitlength);
    gdy = (gdy==null?dy:gdy*yunitlength);
    pnode = myCreateElementSVG("path");
    st="";
    for (x = origin[0]; x<width; x = x+gdx)
      st += " M"+x+",0"+" "+x+","+height;
    for (x = origin[0]-gdx; x>0; x = x-gdx)
      st += " M"+x+",0"+" "+x+","+height;
    for (y = height-origin[1]; y<height; y = y+gdy)
      st += " M0,"+y+" "+width+","+y;
    for (y = height-origin[1]-gdy; y>0; y = y-gdy)
      st += " M0,"+y+" "+width+","+y;
    pnode.setAttribute("d",st);
    pnode.setAttribute("stroke-width", .5);
    pnode.setAttribute("stroke", gridstroke);
    pnode.setAttribute("fill", fill);
    svg_picture.appendChild(pnode);
  }
  pnode = myCreateElementSVG("path");
  st="M0,"+(height-origin[1])+" "+width+","+
    (height-origin[1])+" M"+origin[0]+",0 "+origin[0]+","+height;
  for (x = origin[0]+dx; x<width; x = x+dx)
    st += " M"+x+","+(height-origin[1]+ticklength)+" "+x+","+
           (height-origin[1]-ticklength);
  for (x = origin[0]-dx; x>0; x = x-dx)
    st += " M"+x+","+(height-origin[1]+ticklength)+" "+x+","+
           (height-origin[1]-ticklength);
  for (y = height-origin[1]+dy; y<height; y = y+dy)
    st += " M"+(origin[0]+ticklength)+","+y+" "+(origin[0]-ticklength)+","+y;
  for (y = height-origin[1]-dy; y>0; y = y-dy)
    st += " M"+(origin[0]+ticklength)+","+y+" "+(origin[0]-ticklength)+","+y;
  if (labels!=null) with (Math) {
    ldx = dx/xunitlength;
    ldy = dy/yunitlength;
    lx = (xmin>0 || xmax<0?xmin:0);
    ly = (ymin>0 || ymax<0?ymin:0);
    lxp = (ly==0?"below":"above");
    lyp = (lx==0?"left":"right");
    var ddx = floor(1.1-log(ldx)/log(10))+1;
    var ddy = floor(1.1-log(ldy)/log(10))+1;
    for (x = ldx; x<=xmax; x = x+ldx)
      text([x,ly],chopZ(x.toFixed(ddx)),lxp);
    for (x = -ldx; xmin<=x; x = x-ldx)
      text([x,ly],chopZ(x.toFixed(ddx)),lxp);
    for (y = ldy; y<=ymax; y = y+ldy)
      text([lx,y],chopZ(y.toFixed(ddy)),lyp);
    for (y = -ldy; ymin<=y; y = y-ldy)
      text([lx,y],chopZ(y.toFixed(ddy)),lyp);
  }
  pnode.setAttribute("d",st);
  pnode.setAttribute("stroke-width", .5);
  pnode.setAttribute("stroke", axesstroke);
  pnode.setAttribute("fill", fill);
  svg_picture.appendChild(pnode);


}

function grid(dx,dy) { /* DONE */
	axes(dx,dy,null,dx,dy)
}

function rect(p,q,id,rx,ry) { /* DONE */
	var node = myCreateElementSVG("rect");
	node.setAttribute("id", id);
	node.setAttribute("x",p[0]*xunitlength+origin[0]);
	node.setAttribute("y",height-q[1]*yunitlength-origin[1]);
	node.setAttribute("width",(q[0]-p[0])*xunitlength);
	node.setAttribute("height",(q[1]-p[1])*yunitlength);
	if (rx!=null) {node.setAttribute("rx",rx*xunitlength);}
	if (ry!=null) {node.setAttribute("ry",ry*yunitlength);}
	node.setAttribute("stroke-width", strokewidth);
	node.setAttribute("stroke", stroke);
	node.setAttribute("fill", fill);
	svg_picture.appendChild(node);
}

function path(plist,id,c) {
}

function plot(fun,x_min,x_max,points,id) {
}

function curve(plist,id) { /* DONE */
	path(plist,id,"T");
}

function loop(p,d,id) {
}

function slopefield(fun,dx,dy) {
}

// ================================================
// Additional functions
// Author: Leen Remmelzwaal
// Date: 14th June 2012
// ================================================

function fn_autocomplete() { /* DONE */
	if (document.getElementById("autocomplete_checkbox").checked) { updatePicture(); }
}



