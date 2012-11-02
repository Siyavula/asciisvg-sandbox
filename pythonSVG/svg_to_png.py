from lxml import etree
from pythonsvg import create_png

# ========================================================================================
# Main Code
# ========================================================================================

svg_string = raw_input("").strip()
svg_object = etree.fromstring(svg_string)
create_png(svg_object.attrib['id'], int(float(svg_object.attrib['width'])), int(float(svg_object.attrib['height'])), svg_string) 

# ========================================================================================


