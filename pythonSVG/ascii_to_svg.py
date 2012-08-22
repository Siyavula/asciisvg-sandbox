from __future__ import division
import math
import pythonsvg

# ========================================================================================
# Main Code
# ========================================================================================

if __name__ == '__main__':
	a = pythonsvg.mySvgCanvas("svg1", 600, 600)

	ascii_string= ""
	while True:
		try:
			new_line = raw_input()
			ascii_string += new_line + "\n"
		except:
			break	

	a.process_ascii_single_line(ascii_string)
	xml = a.generate_string()

	print xml

# ========================================================================================


