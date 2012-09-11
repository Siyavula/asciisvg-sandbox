#!/usr/bin/python

from pythonsvg import *

# ========================================================================================
# INPUT
# ========================================================================================

import cgi, os
import cgitb; cgitb.enable()
import urllib

form = cgi.FieldStorage()

# Get data from fields
if ('svg' in form):
	ascii_text = urllib.unquote(form.getvalue('svg').encode('ascii')).decode('utf-8')
	my_svg = mySvgCanvas("test", 400, 400) # default size of SVG
	my_svg.process_ascii_multi_line(ascii_text)
	output = my_svg.generate_string()

elif ('png' in form):
	ascii_text = urllib.unquote(form.getvalue('png').encode('ascii')).decode('utf-8')
	my_svg = mySvgCanvas("test", 400, 400) # default size of SVG
	my_svg.process_ascii_multi_line(ascii_text)
	svg_string = my_svg.generate_string()
	img =  cairo.ImageSurface(cairo.FORMAT_ARGB32, 400, 400)
	ctx = cairo.Context(img)
	handler= rsvg.Handle(None, svg_string)
	handler.render_cairo(ctx)
	img.write_to_png("buffer.png")
	output = "<img src='cgi-bin/buffer.png'>"

else:
   output = "Not entered"

# ========================================================================================
# OUTPUT
# ========================================================================================

print "Content-Type: text/html"
print
print output

# ========================================================================================

