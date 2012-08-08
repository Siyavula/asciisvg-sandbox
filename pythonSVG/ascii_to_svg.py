import lxml
from lxml import etree

class mySvgCanvas:

	# ==============================
	# Variables
	# ==============================
	
	xml_parent = None
	error_string = ""

	# Canvas Variables
	xmin = defaultxmin 								= -5
	xmax = defaultxmax 								= 5
	ymin = defaultymin 								= -5
	ymax = defaultymax 								= 5
	xscl = defaultxscl 								= 1
	yscl = defaultyscl 								= 1
	xgrid = defaultxgrid 							= 1
	ygrid = defaultygrid 							= 1
	xtick = defaultxtick 							= 4
	ytick = defaultytick 							= 4
	border = defaultborder 						= 0
	height = defaultheight  					= 600
	width = defaultwidth							= 600
	xunitlength = defaultxunitlength 	= 1
	yunitlength = defaultyunitlength 	= 1
	origin = defaultorigin 						= [0,0]

	# Element Variables
	axesstroke = defaultaxesstroke 							= "black"
	gridstroke = defaultgridstroke 							= "grey"
	strokewidth = defaultstrokewidth 						= 1 					
	strokedasharray = defaultstrokedasharray 		= [1, 0]
	stroke = defaultstroke 											= "black"
	arrowfill = defaultarrowfill 								= stroke
	fill = defaultfill 													= "none"
	fontstyle = defaultfontstyle 								= "italic"
	fontfamily = defaultfontfamily 							= "times"		
	fontsize = defaultfontsize 									= 16
	fontweight = defaultfontweight 							= "normal"
	fontstroke = defaultfontstroke 							= "none"
	fontfill = defaultfontfill 									= "none"    
	markerstrokewidth = defaultmarkerstrokewidth= 1
	markerstroke = defaultmarkerstroke 					= "black"
	markerfill = defaultmarkerfill 							= "yellow"
	markersize = defaultmarkersize 							= 4
	marker = defaultmarker 											= "none"
	dotradius = defaultdotradius 								= 4
	ticklength = defaultticklength 							= 4

	# ==============================
	# Initialization
	# ==============================

	def __init__(self, name):

		self.reset_variables()		# Reset variables
		self.xml_parent = etree.fromstring("<svg></svg>")		# Initialize SVG Canvas
		self.xml_parent.attrib['id'] = name
		self.initPicture(-5,5,-5,5)

# ===================================================================================	

	def process_ascii(self, ascii_string):
		ascii_list = ascii_string.split('\n')
		for ascii_line in ascii_list:
			formatted_ascii_line = ascii_line.strip()
			if len(formatted_ascii_line) > 0:
				formatted_ascii_line = "self." + ascii_line 		# Adds the 'self.' before the function
				try:
					eval(formatted_ascii_line)
					self.error_string += "<!-- Complete: " + ascii_line + " -->\n"
				except:	
					self.error_string += "<!-- Error in: " + ascii_line + " -->\n"
					#break

		return ascii_string

# ===================================================================================
	
	def generate_string(self):

		self.str_parent = etree.tostring(self.xml_parent)	
		self.error_string = "\n\n<!-- PROCESS LOG: -->\n" + self.error_string
		return self.str_parent + self.error_string

# ========================================================================================

	def reset_variables(self):

		# Canvas Variables
		self.xmin = self.defaultxmin
		self.xmax = self.defaultxmax
		self.ymin = self.defaultymin
		self.ymax = self.defaultymax
		self.xscl = self.defaultxscl
		self.yscl = self.defaultyscl
		self.xgrid = self.defaultxgrid
		self.ygrid = self.defaultygrid
		self.xtick = self.defaultxtick
		self.ytick = self.defaultytick
		self.border = self.defaultborder
		self.height = self.defaultheight
		self.width = self.defaultwidth
		self.xunitlength = self.defaultxunitlength
		self.yunitlength = self.defaultyunitlength
		self.origin = self.defaultorigin

		# Element Variables
		self.axesstroke = self.defaultaxesstroke
		self.gridstroke = self.defaultgridstroke
		self.strokewidth = self.defaultstrokewidth					
		self.strokedasharray = self.defaultstrokedasharray
		self.stroke = self.defaultstroke
		self.arrowfill = self.defaultarrowfill
		self.fill = self.defaultfill
		self.fontstyle = self.defaultfontstyle
		self.fontfamily = self.defaultfontfamily	
		self.fontsize = self.defaultfontsize
		self.fontweight = self.defaultfontweight
		self.fontstroke = self.defaultfontstroke
		self.fontfill = self.defaultfontfill  
		self.markerstrokewidth = self.defaultmarkerstrokewidth
		self.markerstroke = self.defaultmarkerstroke
		self.markerfill = self.defaultmarkerfill
		self.markersize = self.defaultmarkersize
		self.marker = self.defaultmarker
		self.dotradius = self.defaultdotradius
		self.ticklength = self.defaultticklength

# ========================================================================================

	def initPicture(self,a,b,c,d):

		# Set Variables
		self.xmin = a or self.xmin
		self.xmax = b or self.xmax
		self.ymin = c or self.ymin
		self.ymax = d or self.ymax

		# Re-calculate variables
		self.xunitlength = (self.width-2*self.border)/(self.xmax-self.xmin)
		self.yunitlength = (self.height-2*self.border)/(self.ymax-self.ymin)
		self.origin = [-self.xmin*self.xunitlength+self.border,-self.ymin*self.yunitlength+self.border]

		# Set Attributes
		self.xml_parent.attrib['style'] = "display:inline"
		self.xml_parent.attrib['width'] = str(self.width)
		self.xml_parent.attrib['height'] = str(self.height)
		self.xml_parent.attrib['xunitlength'] = str(self.xunitlength)
		self.xml_parent.attrib['yunitlength'] = str(self.yunitlength)
		self.xml_parent.attrib['xmin'] = str(self.xmin)
		self.xml_parent.attrib['xmax'] = str(self.xmax)
		self.xml_parent.attrib['ymin'] = str(self.ymin)
		self.xml_parent.attrib['ymax'] = str(self.ymax)
		self.xml_parent.attrib['ox'] = str(self.origin[0])
		self.xml_parent.attrib['oy'] = str(self.origin[1])
	
		# Initialize blank background
		node = etree.fromstring("<rect></rect>")
		self.xml_parent.append(node)
		node.attrib['x'] = "0"
		node.attrib['y'] = "0"
		node.attrib['width'] = str(self.width)
		node.attrib['height'] = str(self.height)
		node.attrib['stroke-width'] = str(self.border)
		node.attrib['stroke'] = str(self.stroke)
		node.attrib['fill'] = "white"

# ========================================================================================

	def setBorder(self,x=1,color="white"):
		if (x != None):
			self.border = x
		if (color != None):
			self.stroke = color

# ========================================================================================

	'''
	==============================
	Functions (BASIC SVG ELEMENTS)
	==============================
	> myCreateElementSVG(t)
	> dot(center, typ, label, pos, id)
	> arrowhead(p,q)
	> text(p,st,pos,angle)
	> mathjs(st)
	============================== 
	'''

# ========================================================================================

	'''
	def dot(self, center=[0,0], typ=None, label="text", pos=None):

		cx = center[0]*self.xunitlength + self.origin[0]
		cy = self.height - center[1]*self.yunitlength - self.origin[1]

		if (typ=="+" or typ=="-" or typ=="|"):
		{
			# If the Type is Defined
		  var node = myCreateElementSVG("path")
		  node.setAttribute("id", id)
		  svg_picture.appendChild(node)

		  if (typ=="+") {	
				# "+" Sign
		    node.setAttribute("d", 	" M "+(cx-ticklength)+" "+cy+" L "+(cx+ticklength)+" "+cy+
		      											" M "+cx+" "+(cy-ticklength)+" L "+cx+" "+(cy+ticklength))
		    node.setAttribute("stroke-width", .5)
		    node.setAttribute("stroke", axesstroke)
		  }
		  if (typ=="-") {
				# "-" Sign
				node.setAttribute("d", " M "+(cx-ticklength)+" "+cy+" L "+(cx+ticklength)+" "+cy)
		  }
			if (typ=="|") { 
				# "|" Sign
				node.setAttribute("d", " M "+cx+" "+(cy-ticklength)+" L "+cx+" "+(cy+ticklength))
		    node.setAttribute("stroke-width", strokewidth)
		    node.setAttribute("stroke", stroke)
		  }
		} 
		else {
			# Type NOT Defined
		  node = myCreateElementSVG("circle")
		  node.setAttribute("id", id)
		  svg_picture.appendChild(node)
		  node.setAttribute("cx",cx)
		  node.setAttribute("cy",cy)
		  node.setAttribute("r", dotradius)
		  node.setAttribute("stroke-width", strokewidth)
		  node.setAttribute("stroke", stroke)
		  node.setAttribute("fill", (typ=="open"?"white":stroke))
		}
		# Label
		if (label!=null) {
			text(center,label,(pos==null?"below":pos),(id==null?id:id+"label"))
		}
	}

	def arrowhead(p,q,size) {
		var up
		var v = [p[0]*xunitlength+origin[0],height-p[1]*yunitlength-origin[1]]		# adjusted start point
		var w = [q[0]*xunitlength+origin[0],height-q[1]*yunitlength-origin[1]]		# adjusted end point
		var u = [w[0]-v[0],w[1]-v[1]] # unit vector * length
		var d = Math.sqrt(u[0]*u[0]+u[1]*u[1]) #length of unit vector
		if (d > 0.00000001) {
		  u = [u[0]/d, u[1]/d]	# unit vector
		  up = [-u[1],u[0]] 		# inverse unit vector
		  var node = myCreateElementSVG("path")
		  node.setAttribute("d","M "+(w[0]-15*u[0]-4*up[0])+" "+
		    (w[1]-15*u[1]-4*up[1])+" L "+(w[0]-3*u[0])+" "+(w[1]-3*u[1])+" L "+
		    (w[0]-15*u[0]+4*up[0])+" "+(w[1]-15*u[1]+4*up[1])+" z")
		  node.setAttribute("stroke-width", (size!=null?size:markersize))
		  node.setAttribute("stroke", stroke) /*was markerstroke*/
		  node.setAttribute("fill", stroke) /*was arrowfill*/
		  svg_picture.appendChild(node)   
		}
	}

	def text(p,st,pos,angle) {

		# Default text positions
		if (angle == null) {angle = 0}
		var textanchor = "middle"
		var dx = 0 
		var dy = fontsize/3
	
		# Text Positions
		if (pos == aboveleft)	{dx = -fontsize/2 	dy = -fontsize/2		textanchor = "end"}
		if (pos == above)			{dx = 0 						dy = -fontsize/2		textanchor = "middle"}
		if (pos == aboveright){dx = fontsize/2 	dy = -fontsize/2		textanchor = "start"}
		if (pos == left)			{dx = -fontsize/2 	dy = fontsize/3		textanchor = "end"}
		if (pos == right)			{dx = fontsize/2 	dy = fontsize/3		textanchor = "start"}
		if (pos == belowleft)	{dx = -fontsize/2 	dy = fontsize			textanchor = "end"}
		if (pos == below)			{dx = 0 						dy = fontsize			textanchor = "middle"}
		if (pos == belowright){dx = fontsize/2 	dy = fontsize			textanchor = "start"}

		# Text Rotation
		var node = myCreateElementSVG("text")
		var node_text = document.createTextNode(st)
		node.setAttribute("transform", "	rotate(" + angle + ", " + (p[0]*xunitlength+origin[0]+dx) + ", " + (height-p[1]*yunitlength-origin[1]+dy) + ")")
		node.appendChild(node_text)
	
		# Node Attributes
		node.lastChild.nodeValue = st
		node.setAttribute("x",p[0]*xunitlength+origin[0]+dx)
		node.setAttribute("y",height-p[1]*yunitlength-origin[1]+dy)
		node.setAttribute("font-style",fontstyle)
		node.setAttribute("font-family",fontfamily)
		node.setAttribute("font-size",fontsize)
		node.setAttribute("font-weight",fontweight)
		node.setAttribute("text-anchor",textanchor)
		if (fontstroke!="none") node.setAttribute("stroke",fontstroke)
		if (fontfill!="none") node.setAttribute("fill",fontfill)
	
		# Attach Nodes
		svg_picture.appendChild(node)

	}

	def mathjs(st) {

		# Working (from ASCIISVG) - remains uncleaned for javaSVG. 

		st = st.replace(/\s/g,"")
		if (st.indexOf("^-1")!=-1) {
		  st = st.replace(/sin\^-1/g,"arcsin")
		  st = st.replace(/cos\^-1/g,"arccos")
		  st = st.replace(/tan\^-1/g,"arctan")
		  st = st.replace(/sec\^-1/g,"arcsec")
		  st = st.replace(/csc\^-1/g,"arccsc")
		  st = st.replace(/cot\^-1/g,"arccot")
		  st = st.replace(/sinh\^-1/g,"arcsinh")
		  st = st.replace(/cosh\^-1/g,"arccosh")
		  st = st.replace(/tanh\^-1/g,"arctanh")
		  st = st.replace(/sech\^-1/g,"arcsech")
		  st = st.replace(/csch\^-1/g,"arccsch")
		  st = st.replace(/coth\^-1/g,"arccoth")
		}
		st = st.replace(/^e$/g,"(E)")
		st = st.replace(/^e([^a-zA-Z])/g,"(E)$1")
		st = st.replace(/([^a-zA-Z])e([^a-zA-Z])/g,"$1(E)$2")
		st = st.replace(/([0-9])([\(a-zA-Z])/g,"$1*$2")
		st = st.replace(/\)([\(0-9a-zA-Z])/g,"\)*$1")
		var i,j,k, ch, nested
		while ((i=st.indexOf("^"))!=-1) {
		  #find left argument
		  if (i==0) return "Error: missing argument"
		  j = i-1
		  ch = st.charAt(j)
		  if (ch>="0" and ch<="9") {# look for (decimal) number
		    j--
		    while (j>=0 and (ch=st.charAt(j))>="0" and ch<="9") j--
		    if (ch==".") {
		      j--
		      while (j>=0 and (ch=st.charAt(j))>="0" and ch<="9") j--
		    }
		  } else if (ch==")") {# look for matching opening bracket and def name
		    nested = 1
		    j--
		    while (j>=0 and nested>0) {
		      ch = st.charAt(j)
		      if (ch=="(") nested--
		      else if (ch==")") nested++
		      j--
		    }
		    while (j>=0 and (ch=st.charAt(j))>="a" and ch<="z" or ch>="A" and ch<="Z")
		      j--
		  } else if (ch>="a" and ch<="z" or ch>="A" and ch<="Z") {# look for variable
		    j--
		    while (j>=0 and (ch=st.charAt(j))>="a" and ch<="z" or ch>="A" and ch<="Z")
		      j--
		  } else { 
		    return "Error: incorrect syntax in "+st+" at position "+j
		  }
		  #find right argument
		  if (i==st.length-1) return "Error: missing argument"
		  k = i+1
		  ch = st.charAt(k)
		  if (ch>="0" and ch<="9" or ch=="-") {# look for signed (decimal) number
		    k++
		    while (k<st.length and (ch=st.charAt(k))>="0" and ch<="9") k++
		    if (ch==".") {
		      k++
		      while (k<st.length and (ch=st.charAt(k))>="0" and ch<="9") k++
		    }
		  } else if (ch=="(") {# look for matching closing bracket and def name
		    nested = 1
		    k++
		    while (k<st.length and nested>0) {
		      ch = st.charAt(k)
		      if (ch=="(") nested++
		      else if (ch==")") nested--
		      k++
		    }
		  } else if (ch>="a" and ch<="z" or ch>="A" and ch<="Z") {# look for variable
		    k++
		    while (k<st.length and (ch=st.charAt(k))>="a" and ch<="z" or
		             ch>="A" and ch<="Z") k++
		  } else { 
		    return "Error: incorrect syntax in "+st+" at position "+k
		  }
		  st = st.slice(0,j+1)+"pow("+st.slice(j+1,i)+","+st.slice(i+1,k)+")"+
		         st.slice(k)
		}
		while ((i=st.indexOf("!"))!=-1) {
		  #find left argument
		  if (i==0) return "Error: missing argument"
		  j = i-1
		  ch = st.charAt(j)
		  if (ch>="0" and ch<="9") {# look for (decimal) number
		    j--
		    while (j>=0 and (ch=st.charAt(j))>="0" and ch<="9") j--
		    if (ch==".") {
		      j--
		      while (j>=0 and (ch=st.charAt(j))>="0" and ch<="9") j--
		    }
		  } else if (ch==")") {# look for matching opening bracket and def name
		    nested = 1
		    j--
		    while (j>=0 and nested>0) {
		      ch = st.charAt(j)
		      if (ch=="(") nested--
		      else if (ch==")") nested++
		      j--
		    }
		    while (j>=0 and (ch=st.charAt(j))>="a" and ch<="z" or ch>="A" and ch<="Z")
		      j--
		  } else if (ch>="a" and ch<="z" or ch>="A" and ch<="Z") {# look for variable
		    j--
		    while (j>=0 and (ch=st.charAt(j))>="a" and ch<="z" or ch>="A" and ch<="Z")
		      j--
		  } else { 
		    return "Error: incorrect syntax in "+st+" at position "+j
		  }
		  st = st.slice(0,j+1)+"factorial("+st.slice(j+1,i)+")"+st.slice(i+1)
		}
		return st

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

	def line(p,q,id) {
		var node = myCreateElementSVG("path")
		node.setAttribute("id", id)
		node.setAttribute("d","M"+(p[0]*xunitlength+origin[0])+","+
															(height-p[1]*yunitlength-origin[1])+" "+
															(q[0]*xunitlength+origin[0])+","+
															(height-q[1]*yunitlength-origin[1]))
		node.setAttribute("stroke-width", strokewidth)
		node.setAttribute("stroke", stroke)
		node.setAttribute("fill", fill)
		node.setAttribute("stroke-dasharray", strokedasharray)
		/* starting point (p) */
		if (marker=="dot" or marker=="arrowdot") {ASdot(p,markersize,markerstroke,markerfill) }
		/* ending point (q) */ 
		if (marker=="arrowdot" or marker=="arrow") {arrowhead(p,q)}
		if (marker=="dot") {dot(q)}
		svg_picture.appendChild(node)
	}

	def ellipse(center,rx,ry,id) {
		var node = myCreateElementSVG("ellipse")
		node.setAttribute("id", id)
		node.setAttribute("cx",center[0]*xunitlength+origin[0])
		node.setAttribute("cy",height-center[1]*yunitlength-origin[1])
		node.setAttribute("rx",rx*xunitlength)
		node.setAttribute("ry",ry*yunitlength)
		node.setAttribute("stroke-width", strokewidth)
		node.setAttribute("stroke", stroke)
		node.setAttribute("fill", fill)
		svg_picture.appendChild(node)
	}

	def circle(center,radius,id) {
		ellipse(center,radius,radius,id)
	}

	def arc(start,end,radius,id) {
		var vector, ab, abn
		node = myCreateElementSVG("path")
		node.setAttribute("id", id)
		svg_picture.appendChild(node)
		# Radius
		if (radius==null) {    
			vector=[end[0]-start[0],end[1]-start[1]]
		  radius = Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1])
		}
		# Draw Arc
		node.setAttribute("d","M"+	(start[0]*xunitlength+origin[0])+","+
		  													(height-start[1]*yunitlength-origin[1])+" A"+radius*xunitlength+","+
		   													(radius*yunitlength)+" 0 0,0 "+(end[0]*xunitlength+origin[0])+","+
		  													(height-end[1]*yunitlength-origin[1]))
		node.setAttribute("stroke-width", strokewidth)
		node.setAttribute("stroke", stroke)
		node.setAttribute("fill", fill)
		# Markers
		var dx = (end[0]-start[0])/2
		var hx = start[0] + dx
		var dy = (end[0]-start[0])/2
		var hy = start[1] + dy
		var tangent = [hx+dy/(radius*radius),hy-dx/(radius*radius)]
		if (marker=="dot") {dot(start) dot(end)}
		if (marker=="arrowdot") {dot(start) arrowhead(tangent,end)}
		if (marker=="arrow") {arrowhead(tangent,end)}
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

	def noaxes() {
		initPicture()
	}

	def axes(dx,dy,labels,gdx,gdy) {
		var pnode, string, i
		dx = (dx==null?xunitlength:dx*xunitlength)
		dy = (dy==null?yunitlength:dy*yunitlength)
		fontsize = Math.min(dx/2,dy/2,16)
		ticklength = fontsize/4
		
		/* === Grid === */
		if (gdx!=null or gdy!=null) {
		  gdx = (gdx!=null?gdx*xunitlength:xgrid*xunitlength)
		  gdy = (gdy!=null?gdy*yunitlength:ygrid*yunitlength)
			pnode = myCreateElementSVG("path")
		  string = ""
			for (i = origin[0] i<width i = i+gdx) {string += " M"+i+",0"+" "+i+","+height} # x-axis (positive)
			for (i = origin[0]-gdx i>0 i =i-gdx) {string += " M"+i+",0"+" "+i+","+height} # x-axis (negative)
			for (i = height-origin[1] i<height i = i+gdy) {string += " M0,"+i+" "+width+","+i} # y-axis (positive)
			for (i = height-origin[1]-gdy i>0 i = i-gdy) {string += " M0,"+i+" "+width+","+i} # y-axis (negative)
			# Create SVG Element
		  pnode.setAttribute("d",string)
		  pnode.setAttribute("stroke-width", 0.5)
		  pnode.setAttribute("stroke", gridstroke)
		  pnode.setAttribute("fill", fill)
		  svg_picture.appendChild(pnode)
		}

		/* === Axes ===	*/
		pnode = myCreateElementSVG("path")
		# Thicker Axes lines
		string = "M0,"+(height-origin[1])+" "+width+","+(height-origin[1])+" M"+origin[0]+",0 "+origin[0]+","+height
		for (i = origin[0]+dx i<width i+=dx) 
		{string += " M"+i+","+(height-origin[1]+ticklength)+" "+i+","+(height-origin[1]-ticklength)} # x-axis (positive)
		for (i = origin[0]-dx i>0 i-=dx) 
		{string += " M"+i+","+(height-origin[1]+ticklength)+" "+i+","+(height-origin[1]-ticklength)} # x-axis (negative)
		for (i = height-origin[1]+dy i<height i+=dy)	
		{string += " M"+(origin[0]+ticklength)+","+i+" "+(origin[0]-ticklength)+","+i} # y-axis (positive)
		for (i = height-origin[1]-dy i>0 i-=dy) 
		{string += " M"+(origin[0]+ticklength)+","+i+" "+(origin[0]-ticklength)+","+i} # y-axis (negative)

		/* === Labels === */
		if (labels!=null) with (Math) {
			var ldx = dx/xunitlength
		  var ldy = dy/yunitlength
		  var lx = (xmin>0 or xmax<0?xmin:0)
		  var ly = (ymin>0 or ymax<0?ymin:0)
		  var lxp = (ly==0?"below":"above")
		  var lyp = (lx==0?"left":"right")
		  for (x = ldx x<=xmax x = x+ldx) {text([x,ly],x,lxp)} # x-axis (positive)
			for (x = -ldx xmin<=x x = x-ldx) {text([x,ly],x,lxp)} # x-axis (negative)
		  for (y = ldy y<=ymax y = y+ldy) {text([lx,y],y,lyp)} # y-axis (positive)
		  for (y = -ldy ymin<=y y = y-ldy) {text([lx,y],y,lyp)} # y-axis (negative)
		}
		/* Create SVG Element	*/
		pnode.setAttribute("d",string)
		pnode.setAttribute("stroke-width", 0.5)
		pnode.setAttribute("stroke", axesstroke)
		pnode.setAttribute("fill", fill)
		svg_picture.appendChild(pnode)

	}

	def grid(dx,dy) { 
		axes(dx,dy,null,dx,dy)
	}

	'''

	def rect(self,p=[0,0],q=[1,1],rx=0,ry=0):
		node = etree.fromstring("<rect></rect>")
		self.xml_parent.append(node)
		node.attrib['x'] = str(p[0]*self.xunitlength+self.origin[0])
		node.attrib['y'] = str(self.height-q[1]*self.yunitlength-self.origin[1])
		node.attrib['width'] = str((q[0]-p[0])*self.xunitlength)
		node.attrib['height'] = str((q[1]-p[1])*self.yunitlength)
		node.attrib['stroke-width'] = str(self.strokewidth)
		node.attrib['stroke'] = str(self.stroke)
		node.attrib['fill'] = str(self.fill)
		node.attrib['rx'] = str(rx*self.xunitlength)
		node.attrib['ry'] = str(ry*self.yunitlength)

	'''

	def path(plist,style,closed,id) {
		var i
		var node = myCreateElementSVG("path")
		node.setAttribute("id", id)
		svg_picture.appendChild(node)
		
		# =================================================================================================
		# Source:												http:#www.w3schools.com/svg/svg_path.asp
		# Line:													M 0 0 L 100 100 200 0 ... 														(any number)	
		# Curve:													M 0 0 C {100 100 200 0 300 100} 											(only 3)
		# Smooth Curve: 									M 0 0 S {50 50 100 0} {150 50 200 0} {250 50 300 0}" 	(in pairs)
		# Quadratic Bezier curve: 				M 0 0 Q {50 50 100 0} {150 50 200 0} {250 50 300 0}" 	(in pairs)
		# Smooth quadratic Bezier curve:	M 0 0 T 50 50 100 0 150 50 200 0 250 50 300 0" 				(any number)
		# Close Loop:										M 0 0 ............... Z	
		# Eliptical Curve:								Complex!
		# =================================================================================================

		# Style default = L
		if (style == null) {style = "L"}	

		# Move Command
		string = "M" + (plist[0][0]*xunitlength+origin[0])+","+ (height-plist[0][1]*yunitlength-origin[1])
	
		# Draw the line	
		if (style == "L" or style == "C" or style == "S" or style == "Q" or style == "T") 
		{
			string += " " + style + " "
			for (i=1 i<plist.length i++)
				{string += (plist[i][0]*xunitlength+origin[0])+","+ (height-plist[i][1]*yunitlength-origin[1]) + " "}
		}

		# Close the Path
		if (closed != null) {string += " Z"}	

		node.setAttribute("d", string)
		node.setAttribute("stroke-width", strokewidth)
		node.setAttribute("stroke-dasharray", strokedasharray)
		node.setAttribute("stroke", stroke)
		node.setAttribute("fill", fill)
		
		# Dots
		if (marker=="dot" or marker=="arrowdot")
		{
		  for (i=0 i<plist.length i++)
			{
		    if (style!="C" and style!="T" or i!=1 and i!=2) {dot(plist[i])}
			}
		}
	}

	def plot(func,x_min,x_max,points,id) {
	
		var f = function(x) {return x}
		x_min = (x_min==null?xmin:x_min)
		x_max = (x_max==null?xmax:x_max)
		var name
		var array_points = []

		# plot ("sin(x)") 
		if (typeof func=="string"){
			eval("g = function(x){ with(Math) return "+mathjs(func)+" }")
		}
		# plot (["t", "sin(t)"])
		else if (typeof func=="object") {
		  eval("f = function(t){ with(Math) return "+mathjs(func[0])+" }")
		  eval("g = function(t){ with(Math) return "+mathjs(func[1])+" }")
		}
		
		# Number of points
		var inc = (points==null?(x_max-x_min)/200:inc/points)

		# Fill the array_points
		var fout, gout
		for (var t = x_min t <= x_max t += inc) {
			fout = f(t)
			gout = g(t)
			# Try
			if (!(isNaN(fout)orisNaN(gout)orMath.abs(fout)=="Infinity"orMath.abs(gout)=="Infinity")){
				try{data = [fout, gout]}
				catch(err) { continue }
			}
			array_points[array_points.length] = data
		}
		path(array_points)
	}

	def curve(plist,id) { 
		path(plist,"T")
	}

	def bunnyhop(plist,id) { 
		path(plist,"Q")
	}

	def smoothcurve(plist,id) { 
		path(plist,"S")
	}

	def petal(p,d,id) {
		if (d==null) d=[1,1]
		path([p,[p[0]+d[0],p[1]+d[1]],[p[0]-d[1],p[1]+d[0]],p],"C")
	}

	def heart(p,size){
		if (size==null) size = 1
		path([[p[0],p[1]], [p[0]+size,p[1]+size], [p[0],p[1]+size*1.25], [p[0],p[1]+size*0.75]], "C")
		path([[p[0],p[1]+size*0.75],[p[0],p[1]+size*1.25], [p[0]-size,p[1]+size], [p[0],p[1]]], "C")
	}

	def slopefield(func,dx,dy) {

		if (dx==nullordx<=0) dx=1
		if (dy==nullordy<=0) dy=1

		# def 
		var g, gout	  
		if (typeof func=="string")
		  eval("g = function(x,y){ with(Math) return "+mathjs(func)+" }")
		
		# Length of Line
		var dz = Math.sqrt(dx*dx+dy*dy)/6
	
		# Loop	
		var x,y,u,v
		for (x = xmin x <= xmax x += dx)
		{
		  for (y = ymin y <= ymax y += dy) 
			{
				# Calculate the Instantaneous Gradient
				ddx = 0.0001
				gout = (g(x+ddx,y)-g(x-ddx,y))/(2*ddx)
				# Plot Line
				if (!isNaN(gout))
				{
					if (Math.abs(gout)=="Infinity") {u = 0 v = dz}
					else {u = dz/Math.sqrt(1+gout*gout) v = gout*u}
					line([x-u,y-v],[x+u,y+v])
				}
		  }
		}
	}

	'''

# ========================================================================================
# Main Code
# ========================================================================================

a = mySvgCanvas("svg1")

ascii_string= ""
while True:
	try:
		new_line = raw_input()
		ascii_string += new_line + "\n"
	except:
		break	

a.process_ascii(ascii_string)
xml = a.generate_string()

print xml

# ========================================================================================


