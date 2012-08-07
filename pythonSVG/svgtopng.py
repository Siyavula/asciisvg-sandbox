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

# ========================================================================================
# Main Code
# ========================================================================================

svg_string = raw_input("")
create_png("image1", 100,100, svg_string) 

# ========================================================================================


