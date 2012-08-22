import io
import os
import pythonsvg
from lxml import etree

# ============================================================

# HTML Contents
contents = "<html> \
<body> \
<table border='1' cellpadding=10> \
<tr><td bgcolor='#DDDDDD'>SVG Code</td><td bgcolor='#86cd78'>PNG Image</td><td bgcolor='#cd7879'>SVG Image</td><td>Refresh Page</td><tr>"

# ============================================================

# Read directory
path="/home/leen/SiyaVula/monassis/development/Tools/asciisvg-sandbox/pythonSVG/test_ascii_svg/"

i = 1

for dirpath, dirnames, filenames in os.walk(path):
    for filename in [f for f in filenames if f.endswith(".ascsvg")]:
        
			# Read ASCIISVG files
			g = open(os.path.join(dirpath, filename),'r')
			ascii_text = g.read()
			g.close()

			# SVG (xml script)
			my_svg = pythonsvg.mySvgCanvas(filename.split(".")[0], 400, 400) # default size of SVG
			my_svg.process_ascii_multi(ascii_text)
			xml = my_svg.generate_string()	

			# XML object
			svg_object = etree.fromstring(xml)

			# PNG Image	
			pythonsvg.create_png("png_images/" + filename.split(".")[0], int(float(svg_object.attrib['width'])), int(float(svg_object.attrib['height'])), xml) 

			# Append contents to the HTML page
			contents += "<tr><td bgcolor='#DDDDDD'>"
			contents += "Folder: /" + dirpath.split("/")[-1] + "/<br><br>"
			contents += "File: " + filename.split(".")[0] + ".png<br><br>"
			contents += "<textarea rows=20 cols=40>" + xml + "</textarea>"
			contents += "</td><td bgcolor='#86cd78'>"
			contents += "<img src='png_images/" + filename.split(".")[0] + ".png'/>"
			contents += "</td><td bgcolor='#cd7879'>"
			contents += xml
			contents += "</td><td>"
			contents += '<form><input type=button value="Refresh" onClick="window.location.reload()"></form>'
			contents += "</td></tr>"
		
			# Increment file name counter
			i = i + 1
			print i
			if i >= 20: break

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

