import cairo
import rsvg

# ========================================================================================
# Functions
# ========================================================================================

def create_png(filename, height, width, svg_string):

	# Source: http://cairographics.org/download/
	# Example Code: http://stackoverflow.com/questions/6589358/convert-svg-to-png-in-python

	img =  cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)
	ctx = cairo.Context(img)
	handler= rsvg.Handle(None, svg_string)
	handler.render_cairo(ctx)
	img.write_to_png(filename+".png")

def convert_ascii_svg(ascii_string):
	
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

	# TO DO	

	svg_string = '<svg height="50" width="50">'
	svg_string += '<rect x="0" y="0" width="100" height="100" style="stroke-width:1;fill:white"></rect>'
	svg_string += '<ellipse id="undefined" cx="50" cy="50" rx="33.5" ry="16.75" stroke-width="2" stroke="red" fill="none"></ellipse>'
	svg_string += '<ellipse id="undefined" cx="50" cy="50" rx="16.75" ry="33.5" stroke-width="2" stroke="blue" fill="none"></ellipse>'
	svg_string += '</svg>'

	return svg_string

# ========================================================================================
# Main Code
# ========================================================================================

svg_string = convert_ascii_svg("")
create_png("image1", 100,100, svg_string) 

# ========================================================================================


