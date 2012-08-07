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
	print (type(img))

def convert_ascii_svg(ascii_string):
	
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


