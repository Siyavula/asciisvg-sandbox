import io
import os
import pythonsvg
from lxml import etree

# ============================================================

# HTML Contents
contents = "<html> \
<head><meta http-equiv='refresh' content='5' ></head> \
<body> \
<table border='1'>"

# ============================================================

# Read directory
path="/home/leen/SiyaVula/monassis/development/Tools/asciisvg-sandbox/pythonSVG/test_ascii_svg/OK/"
dirList = os.listdir(path)

# ============================================================

i = 1
for fname in dirList:
	
		# Read ASCIISVG files
		g = open('test_ascii_svg/OK/'+fname,'r')
		ascii_text = g.read()
		g.close()

		# SVG (xml script)
		my_svg = pythonsvg.mySvgCanvas("svg1", 600, 600) # default size of SVG
		my_svg.process_ascii(ascii_text)
		xml = my_svg.generate_string()	

		# XML object
		svg_object = etree.fromstring(xml)

		# PNG Image  		
		pythonsvg.create_png("png_images/" + str(i), int(float(svg_object.attrib['width'])), int(float(svg_object.attrib['height'])), xml) 

		# Append contents to the HTML page
		contents += "<tr><td>"
		contents += "<img src='png_images/" + str(i) + ".png'/>"
		contents += "</td><td>"
		contents += xml
		contents += "</td></tr>"
		
		# Increment file name counter
		i = i + 1

# ============================================================

# Complete HTML page
contents += "</table> \
</body> \
</html>"

# ============================================================

# Write HTML document
f = open('compare_graphs.html','w')
f.write(contents)
f.close()

# ============================================================

