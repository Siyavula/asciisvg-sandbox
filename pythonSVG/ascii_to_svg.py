import lxml
from lxml import etree
import math

# ===================================================================================	

class mySvgCanvas:

	# ==============================
	# Variables
	# ==============================
	
	xml_parent = None
	error_string = ""

	loc_var = {}

	# Error Handling
	loc_var["log"] = 1

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
	loc_var["fontstroke"] = loc_var["defaultfontstroke"] 							= loc_var["stroke"]
	loc_var["fontfill"] = loc_var["defaultfontfill"] 									= loc_var["fill"]   
	loc_var["markerstrokewidth"] = loc_var["defaultmarkerstrokewidth"]= 1
	loc_var["markerstroke"] = loc_var["defaultmarkerstroke"] 					= "black"
	loc_var["markerfill"] = loc_var["defaultmarkerfill"] 							= "yellow"
	loc_var["markersize"] = loc_var["defaultmarkersize"] 							= 4
	loc_var["marker"] = loc_var["defaultmarker"] 											= "none"
	loc_var["dotradius"] = loc_var["defaultdotradius"] 								= 4
	loc_var["ticklength"] = loc_var["defaultticklength"] 							= 4
	
	# Function Variables
	loc_var["f"] = None
	loc_var["g"] = None

	# SVG Labels
	loc_var["above"] = "above"
	loc_var["below"] = "below"
	loc_var["left"] = "left"
	loc_var["right"] = "right"
	loc_var["aboveleft"] = "aboveleft"
	loc_var["aboveright"] = "aboveright"
	loc_var["belowleft"] = "belowleft"
	loc_var["belowright"] = "belowright"
	loc_var["open"] = "open"
	loc_var["closed"] = "closed"

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
		self.loc_var["text"] = self.text
		self.loc_var["arrowhead"] = self.arrowhead
		self.loc_var["dot"] = self.dot
		self.loc_var["mathjs"] = self.mathjs
		self.loc_var["line"] = self.line
		self.loc_var["ellipse"] = self.ellipse
		self.loc_var["circle"] = self.circle
		self.loc_var["arc"] = self.arc
		self.loc_var["noaxes"] = self.noaxes
		self.loc_var["axes"] = self.axes
		self.loc_var["grid"] = self.grid
		self.loc_var["rect"] = self.rect
		self.loc_var["path"] = self.path
		self.loc_var["plot"] = self.plot
		self.loc_var["curve"] = self.curve
		self.loc_var["bunnyhop"] = self.bunnyhop
		self.loc_var["smoothcurve"] = self.smoothcurve
		self.loc_var["petal"] = self.petal
		self.loc_var["heart"] = self.heart
		self.loc_var["slopefield"] = self.slopefield

# ===================================================================================	

	def process_ascii(self, ascii_string):
		
		ascii_list = ascii_string.split('\n')
		final_string = ""
		
		for ascii_line in ascii_list:
			if len(ascii_line) > 0:

				# Formatting Line
				formatted_ascii_line = ascii_line.replace("null", "None")
				formatted_ascii_line = self.mathjs(formatted_ascii_line)
				formatted_ascii_line = formatted_ascii_line.replace("//", "#")

				# Concatenate always, clear if successful!
				final_string += formatted_ascii_line + " \n"
		
		# print "<!-- " + str(final_string) + " -->"	

		# Try Except
		try:
			exec(final_string, None, self.loc_var)
			self.error_string += "Code Complete."
		except Exception, err:				
			self.error_string += "Error in code: " + str(err)

		return ascii_string

# ===================================================================================
	
	def generate_string(self):

		self.str_parent = etree.tostring(self.xml_parent)	
		if (self.loc_var["log"] == 1):
			self.error_string = "\n\n<!-- " + self.error_string + " -->\n"
			self.str_parent += self.error_string
		return self.str_parent

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
		self.loc_var["xunitlength"] = float(self.loc_var["width"]-2*self.loc_var["border"])/(self.loc_var["xmax"]-self.loc_var["xmin"])
		self.loc_var["yunitlength"] = float(self.loc_var["height"]-2*self.loc_var["border"])/(self.loc_var["ymax"]-self.loc_var["ymin"])
		self.loc_var["origin"] = [-self.loc_var["xmin"]*self.loc_var["xunitlength"]+self.loc_var["border"],-self.loc_var["ymin"]*self.loc_var["yunitlength"]+self.loc_var["border"]]

		# Set Attributes
		self.xml_parent.attrib['style'] = "display:inline"
		self.xml_parent.attrib['width'] = str(self.loc_var["width"])
		self.xml_parent.attrib['height'] = str(self.loc_var["height"])
		self.xml_parent.attrib['xmin'] = str(self.loc_var["xmin"])
		self.xml_parent.attrib['xmax'] = str(self.loc_var["xmax"])
		self.xml_parent.attrib['ymin'] = str(self.loc_var["ymin"])
		self.xml_parent.attrib['ymax'] = str(self.loc_var["ymax"])
		self.xml_parent.attrib['ox'] = str(self.loc_var["origin"][0])
		self.xml_parent.attrib['oy'] = str(self.loc_var["origin"][1])
		self.noaxes()

# ========================================================================================

	def setBorder(self,x=0,color="black"):

		if (x != None):
			self.loc_var["border"] = x
		if (color != None):
			self.loc_var["stroke"] = color

# ========================================================================================

	def frange(self, start, end, leap):
		result = []
		cur=start
		if (leap > 0 and end > start):
			while (cur <= end):
				result.append(round(cur,3))
				cur += leap
			return result
		elif (leap < 0 and end < start):
			while (cur >= end):
				result.append(round(cur,3))
				cur += leap
			return result
		else:
			return [0]
		
# ========================================================================================

	'''
	==============================
	Functions (BASIC SVG ELEMENTS)
	==============================
	> myCreateElementSVG(t)
	> dot(center, typ, label, pos)
	> arrowhead(p,q)
	> text(p,st,pos,angle)
	> mathjs(st)
	============================== 
	'''

# ========================================================================================
	
	def dot(self, center=[0,0], typ=None, label=None, pos=None, angle=None):

		cx = center[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0]
		cy = self.loc_var["height"] - center[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1]

		# If the Type is Defined
		if (typ == "+" or typ == "-" or typ == "|"):
			node = etree.fromstring("<path></path>")
			self.xml_parent.append(node)
			if (typ=="+"):					
				node.attrib['d'] = 	" M " + str(cx - self.loc_var["ticklength"]) + " " + str(cy) + \
														" L " + str(cx + self.loc_var["ticklength"]) + " " + str(cy) + \
														" M " + str(cx) + " " + str(cy - self.loc_var["ticklength"]) + \
														" L " + str(cx) + " " + str(cy + self.loc_var["ticklength"])
				node.attrib['stroke-width'] = str(0.5)
				node.attrib['stroke'] = str(self.loc_var["axesstroke"])
			elif (typ=="-"):
				node.attrib['d'] = 	" M " + str(cx - self.loc_var["ticklength"]) + " " + str(cy) + \
														" L " + str(cx + self.loc_var["ticklength"]) + " " + str(cy)
			elif (typ=="|"):
				node.attrib['d'] = 	" M " + str(cx) + " " + str(cy - self.loc_var["ticklength"]) + \
														" L " + str(cx) + " " + str(cy + self.loc_var["ticklength"])
				node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
				node.attrib['stroke'] = str(self.loc_var["stroke"])

		# Type NOT Defined
		else:

			node = etree.fromstring("<circle></circle>")
			self.xml_parent.append(node)
			node.attrib['cx'] = str(cx)
			node.attrib['cy'] = str(cy)
			node.attrib['r'] = str(self.loc_var["dotradius"])
			node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
			node.attrib['stroke'] = str(self.loc_var["stroke"])
			node.attrib['fill'] = str(typ == "open" and "white" or self.loc_var["stroke"])

		# Label
		if (label != None):
			self.text(center,label,(pos == None and "below" or pos), (angle == None and 0 or angle))

# ========================================================================================
	
	def arrowhead(self,p=[0,0],q=[1,1],size=None):

		v = [p[0]*self.loc_var["xunitlength"]+self.loc_var["origin"][0],self.loc_var["height"]-p[1]*self.loc_var["yunitlength"]-self.loc_var["origin"][1]]		# adjusted start point
		w = [q[0]*self.loc_var["xunitlength"]+self.loc_var["origin"][0],self.loc_var["height"]-q[1]*self.loc_var["yunitlength"]-self.loc_var["origin"][1]]		# adjusted end point
		u = [w[0]-v[0],w[1]-v[1]] # unit vector * length
		d = math.sqrt(u[0]*u[0]+u[1]*u[1]) #length of unit vector
		if (d > 0.00000001):
			u = [u[0]/d, u[1]/d]	# unit vector
			up = [-u[1],u[0]] 		# inverse unit vector
			node = etree.fromstring("<path></path>")
			self.xml_parent.append(node)
			node.attrib['d'] = str("M " + str(w[0]-15*u[0]-4*up[0]) + " " + str(w[1]-15*u[1]-4*up[1]) + " L " + str(w[0]-3*u[0]) + " " + str(w[1]-3*u[1]) + " L " + str(w[0]-15*u[0]+4*up[0]) + " " + str(w[1]-15*u[1]+4*up[1]) + " Z")
			node.attrib['stroke-width'] = str(size != None and size or self.loc_var["markersize"])
			node.attrib['stroke'] = self.loc_var["stroke"]
			node.attrib['fill'] = self.loc_var["stroke"]

# ========================================================================================

	def text(self,p=[0,0],st="text",pos=None,angle=None):

		# Default text positions
		textanchor = "middle"
		dx = 0
		dy = self.loc_var["fontsize"]/3
		if (angle == None):
			angle = 0

		# Text Positions
		if (pos == self.loc_var["aboveleft"]):	
			dx = -self.loc_var["fontsize"]/2 	
			dy = -self.loc_var["fontsize"]/2		
			textanchor = "end"
		if (pos == self.loc_var["above"]):
			dx = 0 														
			dy = -self.loc_var["fontsize"]/2		
			textanchor = "middle"
		if (pos == self.loc_var["aboveright"]):
			dx = self.loc_var["fontsize"]/2 	
			dy = -self.loc_var["fontsize"]/2		
			textanchor = "start"
		if (pos == self.loc_var["left"]):
			dx = -self.loc_var["fontsize"]/2 	
			dy = self.loc_var["fontsize"]/3			
			textanchor = "end"
		if (pos == self.loc_var["right"]):
			dx = self.loc_var["fontsize"]/2 	
			dy = self.loc_var["fontsize"]/3			
			textanchor = "start"
		if (pos == self.loc_var["belowleft"]):
			dx = -self.loc_var["fontsize"]/2 	
			dy = self.loc_var["fontsize"]				
			textanchor = "end"
		if (pos == self.loc_var["below"]):
			dx = 0 														
			dy = self.loc_var["fontsize"]				
			textanchor = "middle"
		if (pos == self.loc_var["belowright"]):
			dx = self.loc_var["fontsize"]/2 	
			dy = self.loc_var["fontsize"]				
			textanchor = "start"
		
		# Text Rotation
		node = etree.fromstring("<text>" + st + "</text>")
		self.xml_parent.append(node)
		node.attrib['x'] = str(round(p[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0] + dx,2))		
		node.attrib['y'] = str(round(self.loc_var["height"] - p[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1]+dy,2))
		if (angle != 0):
			node.attrib['transform'] = "rotate("+str(angle)+", "+str(node.attrib['x'])+", "+str(node.attrib['y'])+")"
		node.attrib['font-style'] = str(self.loc_var["fontstyle"])
		node.attrib['font-family'] = str(self.loc_var["fontfamily"])
		node.attrib['font-size'] = str(self.loc_var["fontsize"])
		node.attrib['font-weight'] = str(self.loc_var["fontweight"])
		node.attrib['text-anchor'] = str(textanchor)
		node.attrib['stroke'] = str(self.loc_var["fontstroke"])
		node.attrib['fill'] = str(self.loc_var["fontfill"])

# ========================================================================================
	
	def mathjs(self, string):
	
		# Replace all unknown characters to know characters
		string = string.replace("^", "**")

		# stringrip Library call
		string = string.replace("math.", "")
		string = string.replace("Math.", "")
		
		# Attach library prefix to functions
		string = string.replace("sin", "math.sin")
		string = string.replace("cos", "math.cos")
		string = string.replace("tan", "math.tan")
		string = string.replace("asin", "math.asin")
		string = string.replace("acos", "math.acos")
		string = string.replace("atan", "math.atan")
		string = string.replace("sinh", "math.sinh")
		string = string.replace("cosh", "math.cosh")
		string = string.replace("tanh", "math.tanh")
		string = string.replace("asinh", "math.asinh")
		string = string.replace("acosh", "math.acosh")
		string = string.replace("atanh", "math.atanh")

		string = string.replace("sec", "1/math.sin")
		string = string.replace("sec", "1/math.cos")
		string = string.replace("cot", "1/math.tan")
		string = string.replace("asec", "1/math.asin")
		string = string.replace("asec", "1/math.acos")
		string = string.replace("acot", "1/math.atan")
		string = string.replace("sech", "1/math.sinh")
		string = string.replace("sech", "1/math.cosh")
		string = string.replace("coth", "1/math.tanh")
		string = string.replace("asech", "1/math.asinh")
		string = string.replace("asech", "1/math.acosh")
		string = string.replace("acoth", "1/math.atanh")

		return string

# ========================================================================================

	'''
	
	/* 
	==============================
	Functions (COMPOUND SVG ELEMENTS)
	==============================
	> line(p,q)
	> ellipse(center,rx,ry)
	> circle(center,radius)
	> arc(start,end,radius)
	============================== 
	*/

	'''
	
# ========================================================================================
	
	def line(self,p,q):

		node = etree.fromstring("<path></path>")
		self.xml_parent.append(node)
		node.attrib['d'] = 	str(	" M " + \
			str(round(p[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0],2)) + \
			"," + \
			str(round(self.loc_var["height"] - p[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1],2)) + \
			" "+ \
			str(round(q[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0],2)) + \
			"," + \
			str(round(self.loc_var["height"] - q[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1],2)))
		node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
		node.attrib['stroke'] = str(self.loc_var["stroke"])
		node.attrib['fill'] = str(self.loc_var["fill"])
		node.attrib['stroke-dasharray'] = str(self.loc_var["strokedasharray"])
		
		# starting point (p)
		if (self.loc_var["marker"] == "dot" or self.loc_var["marker"] == "arrowdot"):
			self.dot(p)

		# ending point (q) 
		if (self.loc_var["marker"] == "arrowdot" or self.loc_var["marker"] == "arrow"):	
			self.arrowhead(p,q)
		if (self.loc_var["marker"] == "dot"):
			self.dot(q)

# ========================================================================================

	def ellipse(self, center=[0,0], rx=1, ry=2):

		node = etree.fromstring("<ellipse></ellipse>")
		self.xml_parent.append(node)
		node.attrib['cx'] = str(round(center[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0],2))
		node.attrib['cy'] = str(round(self.loc_var["height"] - center[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1],2))
		node.attrib['rx'] = str(round(rx * self.loc_var["xunitlength"],2))
		node.attrib['ry'] = str(round(ry * self.loc_var["yunitlength"],2))
		node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
		node.attrib['stroke'] = str(self.loc_var["stroke"])
		node.attrib['fill'] = str(self.loc_var["fill"])

# ========================================================================================

	def circle(self,center=[0,0],radius=1):
		self.ellipse(center,radius,radius)

# ========================================================================================


	def arc(self,start=[0,0],end=[1,1],radius=None):
		node = etree.fromstring("<path></path>")
		self.xml_parent.append(node)
		
		# Radius
		if (radius==None):  
			vector = [end[0]-start[0],end[1]-start[1]]
			radius = math.sqrt(vector[0]*vector[0] + vector[1]*vector[1])

		# Draw Arc
		node.attrib['d'] = 	" M " +	\
			str(start[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0]) + "," + \
			str(self.loc_var["height"] - start[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1]) + \
			" A " + \
			str(radius * self.loc_var["xunitlength"]) + "," + \
			str(radius * self.loc_var["yunitlength"]) + " 0 0,0 " + \
			str(end[0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0]) + "," + \
			str(self.loc_var["height"] - end[1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1])
		node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
		node.attrib['stroke'] = str(self.loc_var["stroke"])
		node.attrib['fill'] = str(self.loc_var["fill"])

		# Markers
		dx = (end[0]-start[0])/2
		hx = start[0] + dx
		dy = (end[0]-start[0])/2
		hy = start[1] + dy
		tangent = [round(hx+dy/(radius*radius),2),round(hy-dx/(radius*radius),2)]
		if (self.loc_var["marker"] == "dot"):
			self.dot(start)
			self.dot(end)
		if (self.loc_var["marker"] == "arrowdot"):
			self.dot(start) 
			self.arrowhead(tangent,end)
		if (self.loc_var["marker"] == "arrow"):
			self.arrowhead(tangent,end)

# ========================================================================================

	'''

	/*
	==============================
	Functions (COMPLEX SVG ELEMENTS)
	==============================
	> noaxes()
	> axes(dx,dy,labels,gdx,gdy)
	> grid(dx,dy)
	> rect(p,q,rx,ry)
	> path(plist,c)
	> plot(fun,x_min,x_max,points)
	> curve(plist)
	> bunnyhop(plist)
	> smoothcurve(plist)
	> petal(p,d)
	> heart(p,size)
	> slopefield(fun,dx,dy)
	============================== 
	*/

	'''

# ========================================================================================

	def noaxes(self):

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

	def axes(self,dx=None,dy=None,labels=None,gdx=None,gdy=None):

		tdx = (dx != None and dx*self.loc_var["xunitlength"] or self.loc_var["xunitlength"])
		tdy = (dy != None and dy*self.loc_var["yunitlength"] or self.loc_var["yunitlength"])
		fontsize = min(tdx/2,tdy/2,16)
		ticklength = self.loc_var["fontsize"]/4

		# Grid
		if (gdx != None):
			gdx = (gdx != None and gdx*self.loc_var["xunitlength"] or xgrid*self.loc_var["xunitlength"])
			gdy = (gdy != None and gdy*self.loc_var["yunitlength"] or ygrid*self.loc_var["yunitlength"])
			string = ""
			for i in self.frange(self.loc_var["origin"][0], self.loc_var["width"], gdx):
				string += " M " + str(i) + ",0 " + str(i) + "," + str(self.loc_var["height"]) # x-axis (positive)
			for i in self.frange(self.loc_var["origin"][0], 0, -gdx):
				string += " M " + str(i) + ",0 " + str(i) + "," + str(self.loc_var["height"]) # x-axis (negative)
			for i in self.frange(self.loc_var["origin"][1], self.loc_var["height"], gdy):
				string += " M 0," + str(i) + " " + str(self.loc_var["width"]) + "," + str(i) # y-axis (positive)
			for i in self.frange(self.loc_var["origin"][1], 0, -gdy):
				string += " M 0," + str(i) + " " + str(self.loc_var["width"]) + "," + str(i) # y-axis (negative)

			# Create SVG Element
			pnode = etree.fromstring("<path></path>")
			self.xml_parent.append(pnode)
			pnode.attrib['d'] = str(string)
			pnode.attrib['stroke-width'] = str(0.5)
			pnode.attrib['stroke'] = str(self.loc_var["gridstroke"])
			pnode.attrib['fill'] = str(self.loc_var["fill"])

		if (dx != None):

			# Thicker Axes lines
			string = " M 0," + str(self.loc_var["height"]-self.loc_var["origin"][1]) + \
			" " + str(self.loc_var["width"]) + "," + str(self.loc_var["height"]-self.loc_var["origin"][1]) + \
			" M " + str(self.loc_var["origin"][0]) + ",0 " + \
			str(self.loc_var["origin"][0]) + "," + str(self.loc_var["height"])

			# Ticks
			for i in self.frange(self.loc_var["origin"][0], self.loc_var["width"], tdx): 
				string += " M " + str(i) + \
				"," + str(self.loc_var["height"] - self.loc_var["origin"][1] + self.loc_var["ticklength"]) + " " + \
				str(i) + "," + \
				str(self.loc_var["height"]-self.loc_var["origin"][1]-self.loc_var["ticklength"]) # x-axis (positive)
		
			for i in self.frange(self.loc_var["origin"][0], 0, -tdx):
				string += " M " + str(i) + \
				"," + str(self.loc_var["height"] - self.loc_var["origin"][1] + self.loc_var["ticklength"]) + " " + \
				str(i) + "," + \
				str(self.loc_var["height"]-self.loc_var["origin"][1]-self.loc_var["ticklength"]) # x-axis (positive)

			for i in self.frange(self.loc_var["origin"][1], self.loc_var["height"], tdy):
				string += " M " + str(self.loc_var["origin"][0] + self.loc_var["ticklength"]) + \
				"," + str(i) + " " + \
				str(self.loc_var["origin"][0] - self.loc_var["ticklength"]) + "," + str(i) # y-axis (positive)

			for i in self.frange(self.loc_var["origin"][1], 0, -tdy): 
				string += " M " + str(self.loc_var["origin"][0] + self.loc_var["ticklength"]) + \
				"," + str(i) + " " + \
				str(self.loc_var["origin"][0] - self.loc_var["ticklength"]) + "," + str(i) # y-axis (negative)
		
			# Axes
			pnode = etree.fromstring("<path></path>")
			self.xml_parent.append(pnode)
			pnode.attrib['d'] = str(string)
			pnode.attrib['stroke-width'] = str(0.5)
			pnode.attrib['stroke'] = str(self.loc_var["axesstroke"])
			pnode.attrib['fill'] = str(self.loc_var["fill"])

		if (labels!=None):

			# Labels
			for i in self.frange(dx, self.loc_var["xmax"], dx):
				self.text([i,0],str(int(i)),"below") # x-axis (positive)
			for i in self.frange(-dx, self.loc_var["xmin"], -dx):
				self.text([i,0],str(int(i)),"below") # x-axis (positive)
			for i in self.frange(dy, self.loc_var["ymax"], dy):
				self.text([0,i],str(int(i)),"left") # y-axis (positive)
			for i in self.frange(-dx, self.loc_var["ymin"], -dy): 
				self.text([0,i],str(int(i)),"left") # y-axis (negative)

# ========================================================================================

	def grid(self,dx=1,dy=1):
		self.axes(None,None,None,dx,dy)

# ========================================================================================

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
		node.attrib['rx'] = str(round(rx*self.loc_var["xunitlength"],2))
		node.attrib['ry'] = str(round(ry*self.loc_var["yunitlength"],2))

# ========================================================================================

	def path(self,plist=[[0,0]],style=None,closed=None):
	
		# =================================================================================================
		# Source:													http:#www.w3schools.com/svg/svg_path.asp
		# Line:														M 0 0 L 100 100 200 0 ... 														(any number)	
		# Curve:													M 0 0 C {100 100 200 0 300 100} 											(only 3)
		# Smooth Curve: 									M 0 0 S {50 50 100 0} {150 50 200 0} {250 50 300 0}" 	(in pairs)
		# Quadratic Bezier curve: 				M 0 0 Q {50 50 100 0} {150 50 200 0} {250 50 300 0}" 	(in pairs)
		# Smooth quadratic Bezier curve:	M 0 0 T 50 50 100 0 150 50 200 0 250 50 300 0" 				(any number)
		# Close Loop:											M 0 0 ............... Z	
		# Eliptical Curve:								Complex!
		# =================================================================================================

		# Style default = L
		if (style == None):
			style = "L"
	
		# Move Command
		string = " M " + \
		str(round(plist[0][0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0],2)) + "," + \
		str(round(self.loc_var["height"] - plist[0][1]*self.loc_var["yunitlength"] - self.loc_var["origin"][1],2))
	
		# Draw the line
		if (style == "L" or style == "C" or style == "S" or style == "Q" or style == "T"):
			string += " " + str(style) + " "
			for i in range (1, len(plist)):
				string += str(round(plist[i][0] * self.loc_var["xunitlength"] + self.loc_var["origin"][0],2)) + "," + \
				str(round(self.loc_var["height"] - plist[i][1] * self.loc_var["yunitlength"] - self.loc_var["origin"][1],2)) + " "

		# Close the Path
		if (closed != None):
			string += " Z"

		node = etree.fromstring("<path></path>")
		self.xml_parent.append(node)
		node.attrib['d'] = str(string)
		node.attrib['stroke-width'] = str(self.loc_var["strokewidth"])
		node.attrib['stroke-dasharray'] = str(self.loc_var["strokedasharray"])
		node.attrib['stroke'] = str(self.loc_var["stroke"])
		node.attrib['fill'] = str(self.loc_var["fill"])

		# Dots
		if (self.loc_var["marker"] == "dot" or self.loc_var["marker"] == "arrowdot"):
			for i in range (1, len(plist)):
				self.dot(plist[i])

# ========================================================================================

	def plot(self,func="sin(x)",x_min=None,x_max=None,points=200):

		x_min = (x_min == None and self.loc_var["xmin"] or x_min)
		x_max = (x_max == None and self.loc_var["xmax"] or x_max)
		array_points = []
	
		# plot ("sin(x)") 
		if (isinstance(func, str)):
			exec ("def f(x): return (x)", None, self.loc_var)
			exec ("def g(x): return (" + self.mathjs(func) + ")", None, self.loc_var)

		# plot (["t", "sin(t)"])
		elif (isinstance(func, list)):
			exec("def f(t): return (" + self.mathjs(func[0]) + ")", None, self.loc_var)
			exec("def g(t): return (" + self.mathjs(func[1]) + ")", None, self.loc_var)

		# Number of points
		inc = (points == None and (x_max-x_min)/points or (x_max-x_min+0.0000001)/points)

		# Fill the array_points
		for i in self.frange(x_min, x_max+0.01, inc):

			error_count = 0

			# f(x)
			try:
				fout = min(max(self.loc_var["f"](i), -10000), 10000)
			except:
				error_count += 1
			
			# g(x)
			try:
				gout = min(max(self.loc_var["g"](i), -10000), 10000)
			except:
				error_count += 1

			# Append
			if (error_count == 0):
				array_points.append([fout, gout])
		
		#	Draw Graph
		self.path(array_points)

# ========================================================================================

	def curve(self, plist):
		self.path(plist,"T")

# ========================================================================================

	def bunnyhop(self, plist): 
		self.path(plist,"Q")

# ========================================================================================

	def smoothcurve(self, plist):
		self.path(plist,"S")

# ========================================================================================

	def petal(self,p,d):
		if (d==None):
			d=[1,1]
		self.path([p,[p[0]+d[0],p[1]+d[1]],[p[0]-d[1],p[1]+d[0]],p],"C")

# ========================================================================================

	def heart(self,p,size):
		if (size==None):
			size = 1
		self.path([[p[0],p[1]], [p[0]+size,p[1]+size], [p[0],p[1]+size*1.25], [p[0],p[1]+size*0.75]], "C")
		self.path([[p[0],p[1]+size*0.75],[p[0],p[1]+size*1.25], [p[0]-size,p[1]+size], [p[0],p[1]]], "C")

# ========================================================================================

	def slopefield(self,func="sin(x)",dx=None,dy=None):

		if (dx == None or dx <= 0): dx=1
		if (dy == None or dy <= 0): dy=1

		# plot ("sin(x)")
		exec ("def g(x,y): return (" + self.mathjs(func) + ")", None, self.loc_var)

		# Length of Line
		dz = math.sqrt(dx*dx+dy*dy)/6

		# Loop	
		ddx = 0.001
		for x in self.frange(self.loc_var["xmin"], self.loc_var["xmax"], dx):
		  for y in self.frange(self.loc_var["ymin"], self.loc_var["ymax"], dy):
				
				# Calculate the Instantaneous Gradient
				try:
					gout = (self.loc_var["g"](x+ddx,y) - self.loc_var["g"](x-ddx,y))/(2.0*ddx)
					error_flag = 0
				except:
					error_flag += 1		
		
				# Plot Line
				if (error_flag == 0):
					u = dz/math.sqrt(1 + gout*gout)
					v = gout * u
					self.line([round(x-u,2),round(y-v,2)],[round(x+u,2),round(y+v,2)])

# ========================================================================================
# Main Code
# ========================================================================================

if __name__ == '__main__':
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


