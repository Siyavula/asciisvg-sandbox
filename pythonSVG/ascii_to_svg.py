import lxml
from lxml import etree

class mySvgCanvas:

	# ==============================
	# Variables
	# ==============================
	
	xml_parent = None
	error_string = ""

	loc_var = {}

	# Canvas Variables
	loc_var["xmin"] = loc_var["defaultxmin"] 								= -5
	loc_var["xmax"] = loc_var["defaultxmax"] 								= 5
	loc_var["ymin"] = loc_var["defaultymin"] 								= -5
	loc_var["ymax"] = loc_var["defaultymax"] 								= 5
	loc_var["xscl"] = loc_var["defaultxscl"] 								= 1
	loc_var["yscl"] = loc_var["defaultyscl"] 								= 1
	loc_var["xgrid"] = loc_var["defaultxgrid"] 							= 1
	loc_var["ygrid"] = loc_var["defaultygrid"] 							= 1
	loc_var["xtick"] = loc_var["defaultxtick"] 							= 4
	loc_var["ytick"] = loc_var["defaultytick"] 							= 4
	loc_var["border"] = loc_var["defaultborder"] 						= 0
	loc_var["height"] = loc_var["defaultheight"]  					= 600
	loc_var["width"] = loc_var["defaultwidth"]							= 600
	loc_var["xunitlength"] = loc_var["defaultxunitlength"] 	= 1
	loc_var["yunitlength"] = loc_var["defaultyunitlength"] 	= 1
	loc_var["origin"] = loc_var["defaultorigin"] 						= [0,0]

	# Element Variables
	loc_var["axesstroke"] = loc_var["defaultaxesstroke"] 							= "black"
	loc_var["gridstroke"] = loc_var["defaultgridstroke"] 							= "grey"
	loc_var["strokewidth"] = loc_var["defaultstrokewidth"] 						= 1 					
	loc_var["strokedasharray"] = loc_var["defaultstrokedasharray"] 		= [1, 0]
	loc_var["stroke"] = loc_var["defaultstroke"] 											= "black"
	loc_var["arrowfill"] = loc_var["defaultarrowfill"] 								= loc_var["stroke"]
	loc_var["fill"] = loc_var["defaultfill"] 													= "none"
	loc_var["fontstyle"] = loc_var["defaultfontstyle"] 								= "italic"
	loc_var["fontfamily"] = loc_var["defaultfontfamily"] 							= "times"		
	loc_var["fontsize"] = loc_var["defaultfontsize"]									= 16
	loc_var["fontweight"] = loc_var["defaultfontweight"] 							= "normal"
	loc_var["fontstroke"] = loc_var["defaultfontstroke"] 							= "none"
	loc_var["fontfill"] = loc_var["defaultfontfill"] 									= "none"    
	loc_var["markerstrokewidth"] = loc_var["defaultmarkerstrokewidth"]= 1
	loc_var["markerstroke"] = loc_var["defaultmarkerstroke"] 					= "black"
	loc_var["markerfill"] = loc_var["defaultmarkerfill"] 							= "yellow"
	loc_var["markersize"] = loc_var["defaultmarkersize"] 							= 4
	loc_var["marker"] = loc_var["defaultmarker"] 											= "none"
	loc_var["dotradius"] = loc_var["defaultdotradius"] 								= 4
	loc_var["ticklength"] = loc_var["defaultticklength"] 							= 4
	
	# ==============================
	# Initialization
	# ==============================

	def __init__(self, name):

		self.reset_variables()		# Reset variables
		self.xml_parent = etree.fromstring("<svg></svg>")		# Initialize SVG Canvas
		self.xml_parent.attrib['id'] = name
		self.initPicture(-5,5,-5,5)

		# Declare Functions as Variables
		self.loc_var["initPicture"] = self.initPicture
		self.loc_var["setBorder"] = self.setBorder
		self.loc_var["rect"] = self.rect

# ===================================================================================	

	def process_ascii(self, ascii_string):
		ascii_list = ascii_string.split('\n')
		for ascii_line in ascii_list:
			formatted_ascii_line = ascii_line.strip()
			if len(formatted_ascii_line) > 0:
				try:
					exec(formatted_ascii_line, None, self.loc_var)
					self.error_string += "<!-- Complete (1): " + ascii_line + " -->\n"
				except:
					self.error_string += "<!-- Error in (1): " + formatted_ascii_line + " -->\n"
					try:
						formatted_ascii_line = "self." + ascii_line 		# Adds the 'self.' before the function
						exec(formatted_ascii_line, None, self.loc_var)
						self.error_string += "<!-- Complete (2): " + ascii_line + " -->\n"
					except: 
						self.error_string += "<!-- Error in (2): " + formatted_ascii_line + " -->\n"
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
		self.loc_var["xmin"] = self.loc_var["defaultxmin"]
		self.loc_var["xmax"] = self.loc_var["defaultxmax"]
		self.loc_var["ymin"] = self.loc_var["defaultymin"]
		self.loc_var["ymax"] = self.loc_var["defaultymax"]
		self.loc_var["xscl"] = self.loc_var["defaultxscl"]
		self.loc_var["yscl"] = self.loc_var["defaultyscl"]
		self.loc_var["xgrid"] = self.loc_var["defaultxgrid"]
		self.loc_var["ygrid"] = self.loc_var["defaultygrid"]
		self.loc_var["xtick"] = self.loc_var["defaultxtick"]
		self.loc_var["ytick"] = self.loc_var["defaultytick"]
		self.loc_var["border"] = self.loc_var["defaultborder"]
		self.loc_var["height"] = self.loc_var["defaultheight"]
		self.loc_var["width"] = self.loc_var["defaultwidth"]
		self.loc_var["xunitlength"] = self.loc_var["defaultxunitlength"]
		self.loc_var["yunitlength"] = self.loc_var["defaultyunitlength"]
		self.loc_var["origin"] = self.loc_var["defaultorigin"]

		# Element Variables
		self.loc_var["axesstroke"] = self.loc_var["defaultaxesstroke"]
		self.loc_var["gridstroke"] = self.loc_var["defaultgridstroke"]
		self.loc_var["strokewidth"] = self.loc_var["defaultstrokewidth"]			
		self.loc_var["strokedasharray"] = self.loc_var["defaultstrokedasharray"]
		self.loc_var["stroke"] = self.loc_var["defaultstroke"]
		self.loc_var["arrowfill"] = self.loc_var["defaultarrowfill"]
		self.loc_var["fill"] = self.loc_var["defaultfill"]
		self.loc_var["fontstyle"] = self.loc_var["defaultfontstyle"]
		self.loc_var["fontfamily"] = self.loc_var["defaultfontfamily"]
		self.loc_var["fontsize"] = self.loc_var["defaultfontsize"]
		self.loc_var["fontweight"] = self.loc_var["defaultfontweight"]
		self.loc_var["fontstroke"] = self.loc_var["defaultfontstroke"]
		self.loc_var["fontfill"] = self.loc_var["defaultfontfill"]
		self.loc_var["markerstrokewidth"] = self.loc_var["defaultmarkerstrokewidth"]
		self.loc_var["markerstroke"] = self.loc_var["defaultmarkerstroke"]
		self.loc_var["markerfill"] = self.loc_var["defaultmarkerfill"]
		self.loc_var["markersize"] = self.loc_var["defaultmarkersize"]
		self.loc_var["marker"] = self.loc_var["defaultmarker"]
		self.loc_var["dotradius"] = self.loc_var["defaultdotradius"]
		self.loc_var["ticklength"] = self.loc_var["defaultticklength"]

# ========================================================================================

	def initPicture(self,a,b,c,d):

		# Set Variables
		self.loc_var["xmin"] = a or self.loc_var["xmin"]
		self.loc_var["xmax"] = b or self.loc_var["xmax"]
		self.loc_var["ymin"] = c or self.loc_var["ymin"]
		self.loc_var["ymax"] = d or self.loc_var["ymax"]

		# Re-calculate variables
		self.loc_var["xunitlength"] = (self.loc_var["width"]-2*self.loc_var["border"])/(self.loc_var["xmax"]-self.loc_var["xmin"])
		self.loc_var["yunitlength"] = (self.loc_var["height"]-2*self.loc_var["border"])/(self.loc_var["ymax"]-self.loc_var["ymin"])
		self.loc_var["origin"] = [-self.loc_var["xmin"]*self.loc_var["xunitlength"]+self.loc_var["border"],-self.loc_var["ymin"]*self.loc_var["yunitlength"]+self.loc_var["border"]]

		# Set Attributes
		self.xml_parent.attrib['style'] = "display:inline"
		self.xml_parent.attrib['width'] = str(self.loc_var["width"])
		self.xml_parent.attrib['height'] = str(self.loc_var["height"])
		self.xml_parent.attrib['xunitlength'] = str(self.loc_var["xunitlength"])
		self.xml_parent.attrib['yunitlength'] = str(self.loc_var["yunitlength"])
		self.xml_parent.attrib['xmin'] = str(self.loc_var["xmin"])
		self.xml_parent.attrib['xmax'] = str(self.loc_var["xmax"])
		self.xml_parent.attrib['ymin'] = str(self.loc_var["ymin"])
		self.xml_parent.attrib['ymax'] = str(self.loc_var["ymax"])
		self.xml_parent.attrib['ox'] = str(self.loc_var["origin"][0])
		self.xml_parent.attrib['oy'] = str(self.loc_var["origin"][1])
	
		# Initialize blank background
		node = etree.fromstring("<rect></rect>")
		self.xml_parent.append(node)
		node.attrib['x'] = "0"
		node.attrib['y'] = "0"
		node.attrib['width'] = str(self.loc_var["width"])
		node.attrib['height'] = str(self.loc_var["height"])
		node.attrib['stroke-width'] = str(self.loc_var["border"])
		node.attrib['stroke'] = str(self.loc_var["stroke"])
		node.attrib['fill'] = "white"

# ========================================================================================

	def setBorder(self,x=0,color="black"):
		if (x != None):
			self.loc_var["border"] = x
		if (color != None):
			self.loc_var["stroke"] = color

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
		node.attrib['x'] = str(p[0]*self.loc_var["xunitlength"]+self.loc_var["origin"][0])
		node.attrib['y'] = str(self.loc_var["height"]-q[1]*self.loc_var["yunitlength"]-self.loc_var["origin"][1])
		node.attrib['width'] = str((q[0]-p[0])*self.loc_var["xunitlength"])
		node.attrib['height'] = str((q[1]-p[1])*self.loc_var["yunitlength"])
		node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
		node.attrib['stroke'] = str(self.loc_var["stroke"])
		node.attrib['fill'] = str(self.loc_var["fill"])
		node.attrib['rx'] = str(rx*self.loc_var["xunitlength"])
		node.attrib['ry'] = str(ry*self.loc_var["yunitlength"])


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


