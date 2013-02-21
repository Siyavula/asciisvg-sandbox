<table class="table table-bordered table-hover">
	<tbody>

		<!-- Functions -->	

		<tr>
			<td colspan=1 bgcolor="#999999">Initialization Functions</td>
			<td colspan=1 bgcolor="#999999">Example</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>axes</b>(dx,dy,"labels" || <br>
				[xpos,xneg,ypos,yneg,zeropos],<br>
				gdx,gdy,[xunits, yunits])
			</td>
			<td colspan=1>
				<b>axes</b>(1, 1)<br>
				<b>axes</b>(1, 1,"labels")<br>
				<b>axes</b>(1, 1,"labels",2,2)<br>
				<b>axes</b>(1, 1,[1,0,0,0],2,2)<br>
				<b>axes</b>(1, 1,[1,1,1,1,'below'],2,2)<br>
				<b>axes</b>(1, 1,[1,1,1,1,'below'],2,2,["&#176;","&pi;"])<br>
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>grid</b>(dx, dy)
			</td>
			<td colspan=1>
				<b>grid</b>(1, 1)<br>
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>start_group</b>([center_x,center_y], rotate_angle, [scale_x,scale_y], [translate_x,translate_y])
			</td>
			<td colspan=1>
				<b>start_group()</b><br>
				<b>start_group([200,200], 90, [1,1], [5,5])</b><br>
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>stop_group</b>()
			</td>
			<td colspan=1>
				# Closes the scope of the group
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>Nested Groups</b>
			</td>
			<td colspan=1>
				<b>start_group([200,200], 90)</b><br>
				<b>start_group([200,200], 0, [1,1], [5,5])</b><br>
				// CODE<br>
				<b>stop_group()</b><br>
				<b>stop_group()</b><br>
			</td>
		</tr>

		<!-- Attributes -->	

		<tr>
			<td colspan=1 bgcolor="#999999">Attributes</td>
			<td colspan=1 bgcolor="#999999">Example</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>marker</b> = "dot" | "arrow" | "arrowdot" | "none"
			</td>
			<td colspan=1>
				&nbsp;
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>markersize</b> = size
			</td>
			<td colspan=1>
				<b>markersize</b> = 2
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>dotradius</b> = size
			</td>
			<td colspan=1>
				<b>dotradius</b> = 2
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>stroke</b> = color
			</td>
			<td colspan=1>
				<b>stroke</b> = "#AABBCC"<br>
				<b>stroke</b> = "blue"
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>strokewidth</b> = "pixelvalue" (default 1)
			</td>
			<td colspan=1>
				&nbsp;
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>strokedasharray</b> = [dashpixel, spacepixel]
			</td>
			<td colspan=1>
				<b>strokedasharray</b> = [1,0]  <- Continuous <br>
				<b>strokedasharray</b> = [5,5]  <- Dashed
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fill</b> = color
			</td>
			<td colspan=1>
				<b>fill</b> = "#AABBCC"<br>
				<b>fill</b> = "red"
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fontsize</b> = "pixel" (default 20)
			</td>
			<td colspan=1>
				<b>fontsize</b> = 20
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fontweight</b> = "bold" | "normal"
			</td>
			<td colspan=1>
				&nbsp;
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fontfill</b> = color
			</td>
			<td colspan=1>
				<b>fontfill</b> = "red"
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fontstroke</b> = color
			</td>
			<td colspan=1>
				<b>fontstroke</b> = "black"
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fontstyle</b> = "italic" | "normal"
			</td>
			<td colspan=1>
				&nbsp;
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>fontfamily</b> = "serif"|"sansserif"|"fixed"|"monotype"
			</td>
			<td colspan=1>
				&nbsp;
			</td>
		</tr>

		<!-- Basic Elements -->	

		<tr>
			<td colspan=1 bgcolor="#999999">Basic Elements</td>
			<td colspan=1 bgcolor="#999999">Example</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>dot</b>([x,y],open | closed,"label",position)
			</td>
			<td colspan=1>
				<b>dot</b>([x,y],open)<br>
				<b>dot</b>([x,y],closed,"text")<br>
				<b>dot</b>([x,y],closed,"text","aboveleft")
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>arrowhead</b>([x1,y1],[x2,y2],size)
			</td>
			<td colspan=1>
				<b>arrowhead</b>([0,0],[1,1])<br>
				<b>arrowhead</b>([0,0],[1,1],5)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>line</b>([x1,y1],[x2,y2])
			</td>
			<td colspan=1>
				<b>line</b>([0,0],[1,1])
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>circle</b>([x,y],r)
			</td>
			<td colspan=1>
				<b>circle</b>([0,0],5)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>ellipse</b>([x,y],rx,ry)
			</td>
			<td colspan=1>
				<b>ellipse</b>([0,0],3,6)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>arc</b>([x,y],[u,v],r)
			</td>
			<td colspan=1>
				<b>arc</b>([0,0],[1,1],5)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>angle_arc</b>([center_x,center_y], radius, start_deg, stop_deg, text, text_offset)
			</td>
			<td colspan=1>
				<b>angle_arc</b>([0,0],1,45,270)<br>
				<b>angle_arc</b>([0,0],1,45,270,"y")<br>
				<b>angle_arc</b>([0,0],1,45,270,"y",1.25)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>rect</b>([x,y],[u,v], corner_x, corner_y)
			</td>
			<td colspan=1>
				<b>rect</b>([0,0],[2,2])<br>
				<b>rect</b>([0,0],[2,2], 1, 2)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>text</b>([x,y],label,position,clock_rotation_deg)
			</td>
			<td colspan=1>
				<b>text</b>([2,2],"hello")<br>
				<b>text</b>([2,2],"hello", "bottomright")<br>
				<b>text</b>([2,2],"hello", "bottomright", 90)<br>
			</td>
		</tr>

		<!-- Complex Elements -->	

		<tr>
			<td colspan=1 bgcolor="#999999">Complex Elements</td>
			<td colspan=1 bgcolor="#999999">Example</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>path</b>([list],style,closed)
			</td>
			<td colspan=1>
				<b>path</b>([[1,-3],[1,-5],[3,-4]], null, "1")
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>curve</b>([[x1,y1],[x2,y2], ..., [xn,yn]])
			</td>
			<td colspan=1>
				<b>curve</b>([[0,0],[1,1],[0,2]])
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>smoothcurve</b>([[x1,y1],[x2,y2], ..., [xn,yn]])
			</td>
			<td colspan=1>
				<b>smoothcurve</b>([[0,0],[1,1],[0,2]])
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>bunnyhop</b>([[x1,y1],[x2,y2], ..., [xn,yn]])
			</td>
			<td colspan=1>
				<b>bunnyhop</b>([[0,0],[1,1],[0,2]])
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>plot</b>(f(x), xmin, xmax, npoints)<br><br>
				<i>Note: f(x) needs to be a "string" for PNG processing</i>
			</td>
			<td colspan=1>
				<b>plot</b>("sin(x)")<br>
				<b>plot</b>("sin(x)", 0, 2*pi)<br>
				<b>plot</b>("sin(x)", 0, 2*pi, 100)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>plot</b>(["t", f(x)], xmin, xmax, npoints)<br><br>
				<i>Note: f(x) needs to be a "string" for PNG processing</i>
			</td>
			<td colspan=1>
				<b>plot</b>(["t", "sin(t)"])<br>
				<b>plot</b>(["t", "sin(t)"], 0, 2*pi)<br>
				<b>plot</b>(["t", "sin(t)"], 0, 2*pi, 100)
			</td>
		</tr>

		<!-- Shapes -->	

		<tr>
			<td colspan=1 bgcolor="#999999">Shapes</td>
			<td colspan=1 bgcolor="#999999"></td>
		</tr>

		<tr>
			<td colspan=1>
				<b>petal</b>(start, unit_vector)
			</td>
			<td colspan=1>
				<b>petal</b>([0,0])<br>
				<b>petal</b>([0,0], [0,2])
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>heart</b>(p,size)
			</td>
			<td colspan=1>
				<b>heart</b>([0,0])<br>
				<b>heart</b>([0,0], 1)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>cloud</b>([center_x,center_y],size,num_humps)
			</td>
			<td colspan=1>
				<b>cloud</b>([0,0],2,10)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>star</b>([center_x,center_y],size,num_points,inner_radius)
			</td>
			<td colspan=1>
				<b>star</b>([0,0],1,20,0.8)<br>
				<b>star</b>([0,0],0.3,8,0.3)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>grass</b>([base_x,base_y],size,leaves,droop)
			</td>
			<td colspan=1>
				<b>grass</b>([0,0],2,6)<br>
				<b>grass</b>([0,0],2,6,0.6)
			</td>
		</tr>

		<tr>
			<td colspan=1>
				<b>flower</b>([center_x,center_y],size,num_petals, center_fill,center_stroke,center_size)
			</td>
			<td colspan=1>
				<b>flower</b>([0,1],0.4,12,"yellow","black")<br>
				<b>flower</b>([0,1],0.4,12,"yellow","black", 0.8)
			</td>
		</tr>

		<!-- Functions -->	

		<tr>
			<td colspan=1 bgcolor="#999999">Special Functions & Charaters</td>
			<td colspan=1 bgcolor="#999999"></td>
		</tr>

		<tr>
			<td colspan=1>
				sin<br>
				cos<br>
				tan<br>
			</td>
			<td colspan=1>
				sinh<br>
				cosh<br>
				tanh<br>
			</td>
		</tr>

		<tr>
			<td colspan=1>
				asin<br>
				acos<br>
				atan<br>
			</td>
			<td colspan=1>
				asinh<br>
				acosh<br>
				atanh<br>
			</td>
		</tr>

		<tr>
			<td colspan=1>
				log<br>
				pi<br>
				e<br>
			</td>
			<td colspan=1>
				&nbsp;
			</td>
		</tr>

	</tbody>
</table>

