import lxml
from lxml import etree

# ========================================================================================
# Variables
# ========================================================================================

# Canvas Variables
global xml_parent, xmin, defaultxmin, xmax, defaultxmax, ymin, defaultymin, ymax, defaultymax, xscl, defaultxscl, yscl, defaultyscl, xgrid, defaultxgrid, ygrid, defaultygrid, xtick, defaultxtick, ytick, defaultytick, border, defaultborder, height, defaultheigh, width, defaultwidth, xunitlength, defaultxunitlength, yunitlength, defaultyunitlength, origin, defaultorigin

# Element Variables
global axesstroke, defaultaxesstroke, gridstroke, defaultgridstroke, strokewidth, defaultstrokewidth, strokedasharray, defaultstrokedasharray, stroke, defaultstroke, arrowfill, defaultarrowfill, fill, defaultfill, fontstyle, defaultfontstyle, fontfamily, defaultfontfamily	, fontsize, defaultfontsize , fontweight, defaultfontweight, fontstroke, defaultfontstroke, fontfill, defaultfontfill   , markerstrokewidth, defaultmarkerstrokewidth, markerstroke, defaultmarkerstroke, markerfill, defaultmarkerfill, markersize, defaultmarkersize, marker, defaultmarker, dotradius, defaultdotradius, ticklength, defaultticklength

# ========================================================================================
# Functions
# ========================================================================================

def convert_ascii_svg(name, ascii_string):

	global xml_parent

	# Reset variables
	reset_variables()
	
	# Initialize SVG Canvas
	xml_parent = etree.fromstring("<svg></svg>")
	xml_parent.attrib['id'] = name
	
	# ======================
	# TODO: Process the code
	# ======================

	initPicture(-5,5,-5,5)

	# ======================	

	str_parent = etree.tostring(xml_parent)	
	return str_parent

# ========================================================================================

def reset_variables():

	# Canvas Variables
	global xml_parent, xmin, defaultxmin, xmax, defaultxmax, ymin, defaultymin, ymax, defaultymax, xscl, defaultxscl, yscl, defaultyscl, xgrid, defaultxgrid, ygrid, defaultygrid, xtick, defaultxtick, ytick, defaultytick, border, defaultborder, height, defaultheigh, width, defaultwidth, xunitlength, defaultxunitlength, yunitlength, defaultyunitlength, origin, defaultorigin

	# Element Variables
	global axesstroke, defaultaxesstroke, gridstroke, defaultgridstroke, strokewidth, defaultstrokewidth, strokedasharray, defaultstrokedasharray, stroke, defaultstroke, arrowfill, defaultarrowfill, fill, defaultfill, fontstyle, defaultfontstyle, fontfamily, defaultfontfamily	, fontsize, defaultfontsize , fontweight, defaultfontweight, fontstroke, defaultfontstroke, fontfill, defaultfontfill   , markerstrokewidth, defaultmarkerstrokewidth, markerstroke, defaultmarkerstroke, markerfill, defaultmarkerfill, markersize, defaultmarkersize, marker, defaultmarker, dotradius, defaultdotradius, ticklength, defaultticklength

	# ==============================
	# Variables
	# ==============================

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
	height = defaultheight  					= 400
	width = defaultwidth							= 400
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

# ========================================================================================

def initPicture(a,b,c,d):
	
	# Canvas Variables
	global xml_parent, xmin, defaultxmin, xmax, defaultxmax, ymin, defaultymin, ymax, defaultymax, xscl, defaultxscl, yscl, defaultyscl, xgrid, defaultxgrid, ygrid, defaultygrid, xtick, defaultxtick, ytick, defaultytick, border, defaultborder, height, defaultheigh, width, defaultwidth, xunitlength, defaultxunitlength, yunitlength, defaultyunitlength, origin, defaultorigin

	# Element Variables
	global axesstroke, defaultaxesstroke, gridstroke, defaultgridstroke, strokewidth, defaultstrokewidth, strokedasharray, defaultstrokedasharray, stroke, defaultstroke, arrowfill, defaultarrowfill, fill, defaultfill, fontstyle, defaultfontstyle, fontfamily, defaultfontfamily	, fontsize, defaultfontsize , fontweight, defaultfontweight, fontstroke, defaultfontstroke, fontfill, defaultfontfill   , markerstrokewidth, defaultmarkerstrokewidth, markerstroke, defaultmarkerstroke, markerfill, defaultmarkerfill, markersize, defaultmarkersize, marker, defaultmarker, dotradius, defaultdotradius, ticklength, defaultticklength

	# Set Variables
	xmin = a or xmin
	xmax = b or xmax
	ymin = c or ymin
	ymax = d or ymax

	# Re-calculate variables
	xunitlength = (width-2*border)/(xmax-xmin)
	yunitlength = (height-2*border)/(ymax-ymin)
	origin = [-xmin*xunitlength+border,-ymin*yunitlength+border]

	# Set Attributes
	xml_parent.attrib['style'] = "display:inline"
	xml_parent.attrib['width'] = str(width)
	xml_parent.attrib['height'] = str(height)
	xml_parent.attrib['xunitlength'] = str(xunitlength)
	xml_parent.attrib['yunitlength'] = str(yunitlength)
	xml_parent.attrib['xmin'] = str(xmin)
	xml_parent.attrib['xmax'] = str(xmax)
	xml_parent.attrib['ymin'] = str(ymin)
	xml_parent.attrib['ymax'] = str(ymax)
	xml_parent.attrib['ox'] = str(origin[0])
	xml_parent.attrib['oy'] = str(origin[1])
	
	# Initialize blank background
	node = etree.fromstring("<rect></rect>")
	xml_parent.append(node)
	node.attrib['x'] = "0"
	node.attrib['y'] = "0"
	node.attrib['width'] = str(width)
	node.attrib['height'] = str(height)
	node.attrib['stroke-width'] = str(border)
	node.attrib['stroke'] = str(stroke)
	node.attrib['fill'] = "white"

# ========================================================================================











# ========================================================================================
# Main Code
# ========================================================================================

svg_string = raw_input()
xml = convert_ascii_svg("svg1", svg_string)
print xml

# ========================================================================================


