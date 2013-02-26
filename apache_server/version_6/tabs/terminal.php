
<div class="alert alert-info form-inline">
  <input id="terminal_input" class="input-small" type="text" name="terminal_input" onkeypress="handleKeyPress(event);">
	<button class="btn btn-medium" onClick="httpPost_terminal_command();">Submit</button>
	<div class="btn-group">
		<a class="btn dropdown-toggle btn-medium btn-warning" data-toggle="dropdown" href="#">
		  Special Commands <span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
			<li><a href="#" onClick="httpPost_terminal_command('ps');">Process List</a></li>	
			<li><a href="#" onClick="httpPost_terminal_command('ls');">File List</a></li>	
		</ul>
	</div>
  <i id="terminal_command_status"></i>
</div>

  <p>
    <textarea class="span12" disabled="disabled" style="height:380px; background-color:#111111; color:#FFFFFF;" id="terminal_command_output"></textarea>
  </p>


<script>

  /* ==========================================================================================
  Enter Key
  ========================================================================================== */

  function handleKeyPress(e){
   var key=e.keyCode || e.which;
    if (key==13){
       httpPost_terminal_command();
    }
  }

  /* ==========================================================================================
  Exec Terminal Command
  ========================================================================================== */

  function httpPost_terminal_command(str_command) {
	    var xmlHttpReq = false;
	    var self = this;
      var content = "";
			if (str_command) {
				content = String(encodeURIComponent(str_command));
			} else {
				content = String(encodeURIComponent(document.getElementById('terminal_input').value));
			}

			// Reset Outputs
      document.getElementById("terminal_command_status").innerHTML = "<img src='images/icon/loading.gif'>";
      document.getElementById("terminal_command_output").innerHTML = "";
      document.getElementById('terminal_input').value = "";

		  // Mozilla/Safari
	    if (window.XMLHttpRequest) {
	        self.xmlHttpReq = new XMLHttpRequest();
	    }
	    // IE
	    else if (window.ActiveXObject) {
	        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    self.xmlHttpReq.open('POST', "functions/terminal_command.php", true);
	    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    self.xmlHttpReq.onreadystatechange = function() {
	        if (self.xmlHttpReq.readyState == 4) {
              var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText).split("[BRK]");
              document.getElementById("terminal_command_status").innerHTML = xmlHttp_data[0];
              setTimeout('document.getElementById("terminal_command_status").innerHTML = "";', 3000);
              document.getElementById("terminal_command_output").innerHTML = xmlHttp_data[1];
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("terminal_command=cd <?php echo $dir.'/';?>; " +content);
  }

</script>

