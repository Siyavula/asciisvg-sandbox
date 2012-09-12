#!/usr/bin/python

from pythonsvg import *
import cgi, os
import cgitb; cgitb.enable()
import urllib
import re

# ========================================================================================
# http://love-python.blogspot.com/2008/07/strip-html-tags-using-python.html
# ========================================================================================

def fn_strip_tags(text):
  return re.sub(r'<.*?>', '', text)

# ========================================================================================
# INPUT
# ========================================================================================

form = cgi.FieldStorage()

# Get data from fields
if ('svg' in form):
	ascii_text = urllib.unquote(form.getvalue('python') + "\n" + form.getvalue('svg'))
	my_svg = mySvgCanvas("test", 400, 400) # default size of SVG
	my_svg.process_ascii_multi_line(ascii_text)
	output = my_svg.generate_string()

elif ('png' in form):
	ascii_text = urllib.unquote(form.getvalue('python') + "\n" + form.getvalue('png'))
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


