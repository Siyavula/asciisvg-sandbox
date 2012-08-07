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

============
TO DO:
============

Infinite Loop Handling

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
var xgrid = defaultxgrid 							= 1;
var ygrid = defaultygrid 							= 1;
var xtick = defaultxtick 							= 4;
var ytick = defaultytick 							= 4;
var border = defaultborder 						= 0;
var height = defaultheight  					= 400;
var width = defaultwidth							= 400;
var xunitlength = defaultxunitlength 	= 1;
var yunitlength = defaultyunitlength 	= 1;
var origin = defaultorigin 						= [0,0];

// Element Variables
var axesstroke = defaultaxesstroke 							= "black";
var gridstroke = defaultgridstroke 							= "grey";
var strokewidth = defaultstrokewidth 						= 1; 					
var strokedasharray = defaultstrokedasharray 		= [1, 0];
var stroke = defaultstroke 											= "black";
var arrowfill = defaultarrowfill 								= stroke;
var fill = defaultfill 													= "none";
var fontstyle = defaultfontstyle 								= "italic";
var fontfamily = defaultfontfamily 							= "times";		
var fontsize = defaultfontsize 									= 16;
var fontweight = defaultfontweight 							= "normal";
var fontstroke = defaultfontstroke 							= "none";
var fontfill = defaultfontfill 									= "none";    
var markerstrokewidth = defaultmarkerstrokewidth= 1;
var markerstroke = defaultmarkerstroke 					= "black";
var markerfill = defaultmarkerfill 							= "yellow";
var markersize = defaultmarkersize 							= 4;
var marker = defaultmarker 											= "none";
var dotradius = defaultdotradius 								= 4;
var ticklength = defaultticklength 							= 4;

// SVG Labels
var above = "above"; var below = "below"; var left = "left"; var right = "right"; var aboveleft = "aboveleft"; var aboveright = "aboveright"; var belowleft = "belowleft"; var belowright = "belowright"; var open = "open"; var closed = "closed";

// SVG Function Variables
var cpi = "\u03C0", ctheta = "\u03B8"; var pi = Math.PI, ln = Math.log, e = Math.E; var sign = function(x) { return (x==0?0:(x<0?-1:1)) }; var arcsin = Math.asin; var arccos = Math.acos; var arctan = Math.atan; var sinh = function(x) { return (Math.exp(x)-Math.exp(-x))/2 }; var cosh = function(x) { return (Math.exp(x)+Math.exp(-x))/2 }; var tanh = function(x) { return (Math.exp(x)-Math.exp(-x))/(Math.exp(x)+Math.exp(-x)) }; var arcsinh = function(x) { return ln(x+Math.sqrt(x*x+1)) }; var arccosh = function(x) { return ln(x+Math.sqrt(x*x-1)) }; var arctanh = function(x) { return ln((1+x)/(1-x))/2 }; var sech = function(x) { return 1/cosh(x) }; var csch = function(x) { return 1/sinh(x) }; var coth = function(x) { return 1/tanh(x) }; var arcsech = function(x) { return arccosh(1/x) }; var arccsch = function(x) { return arcsinh(1/x) }; var arccoth = function(x) { return arctanh(1/x) }; var sec = function(x) { return 1/Math.cos(x) }; var csc = function(x) { return 1/Math.sin(x) }; var cot = function(x) { return 1/Math.tan(x) }; var arcsec = function(x) { return arccos(1/x) }; var arccsc = function(x) { return arcsin(1/x) }; var arccot = function(x) { return arctan(1/x) };

// ==============================
// Functions (SVG VARIABLES)
// ==============================

function reset_variables()
{

// SVG Layout
xmin = defaultxmin;	xmax = defaultxmax;	ymin = defaultymin;	ymax = defaultymax;	xscl = defaultxscl;	yscl = defaultyscl; xgrid = defaultyscl; ygrid = defaultygrid; xtick = defaultxtick; ytick = defaultytick;	border = defaultborder;	height = defaultwidth;	height = defaultheight;	xunitlength = defaultxunitlength; yunitlength = defaultyunitlength;	origin = defaultorigin;

// SVG Constant Variables
axesstroke = defaultaxesstroke;	gridstroke = defaultgridstroke;	strokewidth = defaultstrokewidth; strokedasharray = defaultstrokedasharray;	stroke = defaultstroke;	fill = defaultfill;	fontstyle = defaultfontstyle;	fontfamily = defaultfontfamily;	fontsize = defaultfontsize; fontweight = defaultfontweight;	fontstroke = defaultfontstroke;	fontfill = defaultfontfill; markerfill = defaultmarkerfill;	markerstroke = defaultmarkerstroke;	markerfill = defaultmarkerfill;	markersize = defaultmarkersize;	marker = defaultmarker;	arrowfill = defaultarrowfill; dotradius = defaultdotradius;	ticklength = defaultticklength;

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
> dot(center, typ, label, pos, id)
> arrowhead(p,q)
> text(p,st,pos,angle)
> mathjs(st)
============================== 
*/

function myCreateElementSVG(t) {
	return document.createElementNS("http://www.w3.org/2000/svg",t);
}

function dot(center, typ, label, pos, id) {
  var cx = center[0]*xunitlength+origin[0];
  var cy = height-center[1]*yunitlength-origin[1];
  if (typ=="+" || typ=="-" || typ=="|") 
	{
		// Type Defined
    var node = myCreateElementSVG("path");
    node.setAttribute("id", id);
    svg_picture.appendChild(node);

    if (typ=="+") {	
			// "+" Sign
      node.setAttribute("d", 	" M "+(cx-ticklength)+" "+cy+" L "+(cx+ticklength)+" "+cy+
        											" M "+cx+" "+(cy-ticklength)+" L "+cx+" "+(cy+ticklength));
      node.setAttribute("stroke-width", .5);
      node.setAttribute("stroke", axesstroke);
    }
    if (typ=="-") {
			// "-" Sign
			node.setAttribute("d", " M "+(cx-ticklength)+" "+cy+" L "+(cx+ticklength)+" "+cy);
    }
		if (typ=="|") { 
			// "|" Sign
			node.setAttribute("d", " M "+cx+" "+(cy-ticklength)+" L "+cx+" "+(cy+ticklength));
      node.setAttribute("stroke-width", strokewidth);
      node.setAttribute("stroke", stroke);
    }
  } 
	else {
		// Type NOT Defined
    node = myCreateElementSVG("circle");
    node.setAttribute("id", id);
    svg_picture.appendChild(node);
    node.setAttribute("cx",cx);
    node.setAttribute("cy",cy);
    node.setAttribute("r", dotradius);
    node.setAttribute("stroke-width", strokewidth);
    node.setAttribute("stroke", stroke);
    node.setAttribute("fill", (typ=="open"?"white":stroke));
  }
	// Label
  if (label!=null) {
		text(center,label,(pos==null?"below":pos),(id==null?id:id+"label"));
	}
}

function arrowhead(p,q,size) {
  var up;
  var v = [p[0]*xunitlength+origin[0],height-p[1]*yunitlength-origin[1]];		// adjusted start point
  var w = [q[0]*xunitlength+origin[0],height-q[1]*yunitlength-origin[1]];		// adjusted end point
  var u = [w[0]-v[0],w[1]-v[1]]; // unit vector * length
  var d = Math.sqrt(u[0]*u[0]+u[1]*u[1]); //length of unit vector
	if (d > 0.00000001) {
    u = [u[0]/d, u[1]/d];	// unit vector
    up = [-u[1],u[0]]; 		// inverse unit vector
    var node = myCreateElementSVG("path");
    node.setAttribute("d","M "+(w[0]-15*u[0]-4*up[0])+" "+
      (w[1]-15*u[1]-4*up[1])+" L "+(w[0]-3*u[0])+" "+(w[1]-3*u[1])+" L "+
      (w[0]-15*u[0]+4*up[0])+" "+(w[1]-15*u[1]+4*up[1])+" z");
    node.setAttribute("stroke-width", (size!=null?size:markersize));
    node.setAttribute("stroke", stroke); /*was markerstroke*/
    node.setAttribute("fill", stroke); /*was arrowfill*/
    svg_picture.appendChild(node);   
  }
}

function text(p,st,pos,angle) {

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

	// Working (from ASCIISVG) - remains uncleaned for javaSVG. 

  st = st.replace(/\s/g,"");
  if (st.indexOf("^-1")!=-1) {
    st = st.replace(/sin\^-1/g,"arcsin");
    st = st.replace(/cos\^-1/g,"arccos");
    st = st.replace(/tan\^-1/g,"arctan");
    st = st.replace(/sec\^-1/g,"arcsec");
    st = st.replace(/csc\^-1/g,"arccsc");
    st = st.replace(/cot\^-1/g,"arccot");
    st = st.replace(/sinh\^-1/g,"arcsinh");
    st = st.replace(/cosh\^-1/g,"arccosh");
    st = st.replace(/tanh\^-1/g,"arctanh");
    st = st.replace(/sech\^-1/g,"arcsech");
    st = st.replace(/csch\^-1/g,"arccsch");
    st = st.replace(/coth\^-1/g,"arccoth");
  }
  st = st.replace(/^e$/g,"(E)");
  st = st.replace(/^e([^a-zA-Z])/g,"(E)$1");
  st = st.replace(/([^a-zA-Z])e([^a-zA-Z])/g,"$1(E)$2");
  st = st.replace(/([0-9])([\(a-zA-Z])/g,"$1*$2");
  st = st.replace(/\)([\(0-9a-zA-Z])/g,"\)*$1");
  var i,j,k, ch, nested;
  while ((i=st.indexOf("^"))!=-1) {
    //find left argument
    if (i==0) return "Error: missing argument";
    j = i-1;
    ch = st.charAt(j);
    if (ch>="0" && ch<="9") {// look for (decimal) number
      j--;
      while (j>=0 && (ch=st.charAt(j))>="0" && ch<="9") j--;
      if (ch==".") {
        j--;
        while (j>=0 && (ch=st.charAt(j))>="0" && ch<="9") j--;
      }
    } else if (ch==")") {// look for matching opening bracket and function name
      nested = 1;
      j--;
      while (j>=0 && nested>0) {
        ch = st.charAt(j);
        if (ch=="(") nested--;
        else if (ch==")") nested++;
        j--;
      }
      while (j>=0 && (ch=st.charAt(j))>="a" && ch<="z" || ch>="A" && ch<="Z")
        j--;
    } else if (ch>="a" && ch<="z" || ch>="A" && ch<="Z") {// look for variable
      j--;
      while (j>=0 && (ch=st.charAt(j))>="a" && ch<="z" || ch>="A" && ch<="Z")
        j--;
    } else { 
      return "Error: incorrect syntax in "+st+" at position "+j;
    }
    //find right argument
    if (i==st.length-1) return "Error: missing argument";
    k = i+1;
    ch = st.charAt(k);
    if (ch>="0" && ch<="9" || ch=="-") {// look for signed (decimal) number
      k++;
      while (k<st.length && (ch=st.charAt(k))>="0" && ch<="9") k++;
      if (ch==".") {
        k++;
        while (k<st.length && (ch=st.charAt(k))>="0" && ch<="9") k++;
      }
    } else if (ch=="(") {// look for matching closing bracket and function name
      nested = 1;
      k++;
      while (k<st.length && nested>0) {
        ch = st.charAt(k);
        if (ch=="(") nested++;
        else if (ch==")") nested--;
        k++;
      }
    } else if (ch>="a" && ch<="z" || ch>="A" && ch<="Z") {// look for variable
      k++;
      while (k<st.length && (ch=st.charAt(k))>="a" && ch<="z" ||
               ch>="A" && ch<="Z") k++;
    } else { 
      return "Error: incorrect syntax in "+st+" at position "+k;
    }
    st = st.slice(0,j+1)+"pow("+st.slice(j+1,i)+","+st.slice(i+1,k)+")"+
           st.slice(k);
  }
  while ((i=st.indexOf("!"))!=-1) {
    //find left argument
    if (i==0) return "Error: missing argument";
    j = i-1;
    ch = st.charAt(j);
    if (ch>="0" && ch<="9") {// look for (decimal) number
      j--;
      while (j>=0 && (ch=st.charAt(j))>="0" && ch<="9") j--;
      if (ch==".") {
        j--;
        while (j>=0 && (ch=st.charAt(j))>="0" && ch<="9") j--;
      }
    } else if (ch==")") {// look for matching opening bracket and function name
      nested = 1;
      j--;
      while (j>=0 && nested>0) {
        ch = st.charAt(j);
        if (ch=="(") nested--;
        else if (ch==")") nested++;
        j--;
      }
      while (j>=0 && (ch=st.charAt(j))>="a" && ch<="z" || ch>="A" && ch<="Z")
        j--;
    } else if (ch>="a" && ch<="z" || ch>="A" && ch<="Z") {// look for variable
      j--;
      while (j>=0 && (ch=st.charAt(j))>="a" && ch<="z" || ch>="A" && ch<="Z")
        j--;
    } else { 
      return "Error: incorrect syntax in "+st+" at position "+j;
    }
    st = st.slice(0,j+1)+"factorial("+st.slice(j+1,i)+")"+st.slice(i+1);
  }
  return st;

}

/* 
==============================
Functions (COMPOUND SVG ELEMENTS)
==============================
> line(p,q,id)
> ellipse(center,rx,ry,id)
> circle(center,radius,id)
> arc(start,end,radius,id)
============================== 
*/

function line(p,q,id) {
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
  if (marker=="dot") {dot(q);}
	svg_picture.appendChild(node);
}

function ellipse(center,rx,ry,id) {
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

function circle(center,radius,id) {
	ellipse(center,radius,radius,id);
}

function arc(start,end,radius,id) {
  var vector, ab, abn;
	node = myCreateElementSVG("path");
	node.setAttribute("id", id);
	svg_picture.appendChild(node);
  // Radius
	if (radius==null) {    
		vector=[end[0]-start[0],end[1]-start[1]];
    radius = Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1]);
  }
	// Draw Arc
  node.setAttribute("d","M"+	(start[0]*xunitlength+origin[0])+","+
    													(height-start[1]*yunitlength-origin[1])+" A"+radius*xunitlength+","+
     													(radius*yunitlength)+" 0 0,0 "+(end[0]*xunitlength+origin[0])+","+
    													(height-end[1]*yunitlength-origin[1]));
  node.setAttribute("stroke-width", strokewidth);
  node.setAttribute("stroke", stroke);
  node.setAttribute("fill", fill);
	// Markers
	var dx = (end[0]-start[0])/2;
	var hx = start[0] + dx;
	var dy = (end[0]-start[0])/2;
	var hy = start[1] + dy;
	var tangent = [hx+dy/(radius*radius),hy-dx/(radius*radius)];
  if (marker=="dot") {dot(start); dot(end);}
	if (marker=="arrowdot") {dot(start); arrowhead(tangent,end);}
  if (marker=="arrow") {arrowhead(tangent,end)};
}

/*
==============================
Functions (COMPLEX SVG ELEMENTS)
==============================
> noaxes()
> axes(dx,dy,labels,gdx,gdy)
> grid(dx,dy)
> rect(p,q,id,rx,ry)
> path(plist,id,c)
> plot(fun,x_min,x_max,points,id)
> curve(plist,id)
> petal(p,d,id)
> heart(p,size)
> slopefield(fun,dx,dy)
============================== 
*/

function noaxes() {
	initPicture();
}

function axes(dx,dy,labels,gdx,gdy) {
	var pnode, string, i;
  dx = (dx==null?xunitlength:dx*xunitlength);
  dy = (dy==null?yunitlength:dy*yunitlength);
  fontsize = Math.min(dx/2,dy/2,16);
  ticklength = fontsize/4;
  
	/* === Grid === */
	if (gdx!=null || gdy!=null) {
    gdx = (gdx!=null?gdx*xunitlength:xgrid*xunitlength);
    gdy = (gdy!=null?gdy*yunitlength:ygrid*yunitlength);
		pnode = myCreateElementSVG("path");
    string = "";
		for (i = origin[0]; i<width; i = i+gdx) {string += " M"+i+",0"+" "+i+","+height;} // x-axis (positive)
		for (i = origin[0]-gdx; i>0; i =i-gdx) {string += " M"+i+",0"+" "+i+","+height;} // x-axis (negative)
		for (i = height-origin[1]; i<height; i = i+gdy) {string += " M0,"+i+" "+width+","+i;} // y-axis (positive)
		for (i = height-origin[1]-gdy; i>0; i = i-gdy) {string += " M0,"+i+" "+width+","+i;} // y-axis (negative)
		// Create SVG Element
    pnode.setAttribute("d",string);
    pnode.setAttribute("stroke-width", 0.5);
    pnode.setAttribute("stroke", gridstroke);
    pnode.setAttribute("fill", fill);
    svg_picture.appendChild(pnode);
  }

	/* === Axes ===	*/
  pnode = myCreateElementSVG("path");
	// Thicker Axes lines
	string = "M0,"+(height-origin[1])+" "+width+","+(height-origin[1])+" M"+origin[0]+",0 "+origin[0]+","+height;
	for (i = origin[0]+dx; i<width; i+=dx) 
	{string += " M"+i+","+(height-origin[1]+ticklength)+" "+i+","+(height-origin[1]-ticklength);} // x-axis (positive)
	for (i = origin[0]-dx; i>0; i-=dx) 
	{string += " M"+i+","+(height-origin[1]+ticklength)+" "+i+","+(height-origin[1]-ticklength);} // x-axis (negative)
	for (i = height-origin[1]+dy; i<height; i+=dy)	
	{string += " M"+(origin[0]+ticklength)+","+i+" "+(origin[0]-ticklength)+","+i;} // y-axis (positive)
	for (i = height-origin[1]-dy; i>0; i-=dy) 
	{string += " M"+(origin[0]+ticklength)+","+i+" "+(origin[0]-ticklength)+","+i;} // y-axis (negative)

	/* === Labels === */
	if (labels!=null) with (Math) {
		var ldx = dx/xunitlength;
    var ldy = dy/yunitlength;
    var lx = (xmin>0 || xmax<0?xmin:0);
    var ly = (ymin>0 || ymax<0?ymin:0);
    var lxp = (ly==0?"below":"above");
    var lyp = (lx==0?"left":"right");
    for (x = ldx; x<=xmax; x = x+ldx) {text([x,ly],x,lxp);} // x-axis (positive)
		for (x = -ldx; xmin<=x; x = x-ldx) {text([x,ly],x,lxp);} // x-axis (negative)
    for (y = ldy; y<=ymax; y = y+ldy) {text([lx,y],y,lyp);} // y-axis (positive)
    for (y = -ldy; ymin<=y; y = y-ldy) {text([lx,y],y,lyp);} // y-axis (negative)
  }
	/* Create SVG Element	*/
  pnode.setAttribute("d",string);
  pnode.setAttribute("stroke-width", 0.5);
  pnode.setAttribute("stroke", axesstroke);
  pnode.setAttribute("fill", fill);
  svg_picture.appendChild(pnode);

}

function grid(dx,dy) { 
	axes(dx,dy,null,dx,dy)
}

function rect(p,q,id,rx,ry) { 
	var node = myCreateElementSVG("rect");
	node.setAttribute("id", id);
	node.setAttribute("x",p[0]*xunitlength+origin[0]);
	node.setAttribute("y",height-q[1]*yunitlength-origin[1]);
	node.setAttribute("width",(q[0]-p[0])*xunitlength);
	node.setAttribute("height",(q[1]-p[1])*yunitlength);
	if (rx!=null) {node.setAttribute("rx",rx*xunitlength);}
	if (ry!=null) {node.setAttribute("ry",ry*yunitlength);}
	// Create SVG Element	
	node.setAttribute("stroke-width", strokewidth);
	node.setAttribute("stroke", stroke);
	node.setAttribute("fill", fill);
	svg_picture.appendChild(node);
}

function path(plist,style,closed,id) {
	var i;
	var node = myCreateElementSVG("path");
  node.setAttribute("id", id);
  svg_picture.appendChild(node);
  
	// =================================================================================================
	// Source:												http://www.w3schools.com/svg/svg_path.asp
	// Line:													M 0 0 L 100 100 200 0 ... 														(any number)	
	// Curve:													M 0 0 C {100 100 200 0 300 100} 											(only 3)
	// Smooth Curve: 									M 0 0 S {50 50 100 0} {150 50 200 0} {250 50 300 0}" 	(in pairs)
	// Quadratic Bézier curve: 				M 0 0 Q {50 50 100 0} {150 50 200 0} {250 50 300 0}" 	(in pairs)
	// Smooth quadratic Bézier curve:	M 0 0 T 50 50 100 0 150 50 200 0 250 50 300 0" 				(any number)
	// Close Loop:										M 0 0 ............... Z	
	// Eliptical Curve:								Complex!
	// =================================================================================================

	// Style default = L
	if (style == null) {style = "L";}	

	// Move Command
	string = "M" + (plist[0][0]*xunitlength+origin[0])+","+ (height-plist[0][1]*yunitlength-origin[1]);
	
	// Draw the line	
	if (style == "L" || style == "C" || style == "S" || style == "Q" || style == "T") 
	{
		string += " " + style + " ";
		for (i=1; i<plist.length; i++)
			{string += (plist[i][0]*xunitlength+origin[0])+","+ (height-plist[i][1]*yunitlength-origin[1]) + " ";}
	}

	// Close the Path
	if (closed != null) {string += " Z";}	

	node.setAttribute("d", string);
  node.setAttribute("stroke-width", strokewidth);
	node.setAttribute("stroke-dasharray", strokedasharray);
  node.setAttribute("stroke", stroke);
  node.setAttribute("fill", fill);
  
	// Dots
	if (marker=="dot" || marker=="arrowdot")
	{
    for (i=0; i<plist.length; i++)
		{
      if (style!="C" && style!="T" || i!=1 && i!=2) {dot(plist[i]);}
		}
	}
}

function plot(func,x_min,x_max,points,id) {
	
  var f = function(x) {return x;}
	x_min = (x_min==null?xmin:x_min);
  x_max = (x_max==null?xmax:x_max);
	var name;
	var array_points = [];

  // plot ("sin(x)") 
	if (typeof func=="string"){
		eval("g = function(x){ with(Math) return "+mathjs(func)+" }");
	}
	// plot (["t", "sin(t)"])
  else if (typeof func=="object") {
    eval("f = function(t){ with(Math) return "+mathjs(func[0])+" }");
    eval("g = function(t){ with(Math) return "+mathjs(func[1])+" }");
  }
  
	// Number of points
  var inc = (points==null?(x_max-x_min)/200:inc/points);

	// Fill the array_points
  var fout, gout;
	for (var t = x_min; t <= x_max; t += inc) {
		fout = f(t);
		gout = g(t);
		// Try
		if (!(isNaN(fout)||isNaN(gout)||Math.abs(fout)=="Infinity"||Math.abs(gout)=="Infinity")){
			try{data = [fout, gout];}
			catch(err) { continue; }
		}
		array_points[array_points.length] = data;
  }
  path(array_points);
}

function curve(plist,id) { 
	path(plist,"T");
}

function bunnyhop(plist,id) { 
	path(plist,"Q");
}

function smoothcurve(plist,id) { 
	path(plist,"S");
}

function petal(p,d,id) {
  if (d==null) d=[1,1];
  path([p,[p[0]+d[0],p[1]+d[1]],[p[0]-d[1],p[1]+d[0]],p],"C")
}

function heart(p,size){
  if (size==null) size = 1;
	path([[p[0],p[1]], [p[0]+size,p[1]+size], [p[0],p[1]+size*1.25], [p[0],p[1]+size*0.75]], "C");
	path([[p[0],p[1]+size*0.75],[p[0],p[1]+size*1.25], [p[0]-size,p[1]+size], [p[0],p[1]]], "C");
}

function slopefield(func,dx,dy) {

	if (dx==null||dx<=0) dx=1;
  if (dy==null||dy<=0) dy=1;

	// Function 
	var g, gout;	  
  if (typeof func=="string")
    eval("g = function(x,y){ with(Math) return "+mathjs(func)+" }");
  
	// Length of Line
	var dz = Math.sqrt(dx*dx+dy*dy)/6;
	
	// Loop	
	var x,y,u,v;
  for (x = xmin; x <= xmax; x += dx)
	{
    for (y = ymin; y <= ymax; y += dy) 
		{
			// Calculate the Instantaneous Gradient
			ddx = 0.0001;
			gout = (g(x+ddx,y)-g(x-ddx,y))/(2*ddx);
			// Plot Line
			if (!isNaN(gout))
			{
				if (Math.abs(gout)=="Infinity") {u = 0; v = dz;}
				else {u = dz/Math.sqrt(1+gout*gout); v = gout*u;}
				line([x-u,y-v],[x+u,y+v]);
			}
    }
	}
}

// ================================================
// Additional functions
// Author: Leen Remmelzwaal
// Date: 14th June 2012
// ================================================

function fn_autocomplete() { 
	if (document.getElementById("autocomplete_checkbox").checked) { updatePicture(); }
}



