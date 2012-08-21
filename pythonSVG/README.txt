This is a modified version of the ASCIIsvg editor from: http://www1.chapman.edu/~jipsen/svg/asciisvgeditor.html

==========================================================
ASCII -> SVG PIPELINE
==========================================================

Creating an SVG string from ASCII code:

Files:

	> pythonsvg.py (class definition)
	> ascii_to_svg.py (main code)
	> output_data/data_ascii.txt (input data)
	> output_data/data_svg.txt (output data)

Terminal Command Example: 

	> python ascii_to_svg.py < output_data/data_ascii.txt > output_data/data_svg.txt

==========================================================
SVG -> PNG PIPELINE
==========================================================

Creating an PNG file from SVG string:

Files:

	> pythonsvg.py (function definition)
	> svg_to_png.py
	> output_data/data_svg.txt (input data)

Terminal Command Example: 

	> python svg_to_png.py < putputdata/data_svg.txt

==========================================================
TESTING
==========================================================

Generating an HTML file with PNG vs SVG comparison:

Files:

	> pythonsvg.py (function definition)
	> test_ascii_svg/OK/* (folder of asciisvg files for tesing scripts)
	> html_generator.py (main function)
	> compare_graphs.html (output file)

Terminal Command Example:

	> python html_generator.py

==========================================================

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

