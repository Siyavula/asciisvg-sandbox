
<div class="alert alert-info">
  <input id="terminal_input" name="terminal_input" onkeypress="handleKeyPress(event);">
  <button id="python_save_btn" class="btn btn-small" onClick="httpPost_terminal_command();">Submit</button> 
  <i id="terminal_command_status"></i>
</div>

  <p>
    <textarea class="span12" style="height:380px; background-color:#111111; color:#FFFFFF;" id="terminal_command_output"></textarea>
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

  function httpPost_terminal_command() {
	    var xmlHttpReq = false;
	    var self = this;
      var content = String(encodeURIComponent(document.getElementById('terminal_input').value));

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
              var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText).split ("[BRK]");
              document.getElementById("terminal_command_status").innerHTML = xmlHttp_data[0];
              setTimeout('document.getElementById("terminal_command_status").innerHTML = "";', 3000);
              document.getElementById("terminal_command_output").innerHTML = xmlHttp_data[1];
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("terminal_command=cd <?php echo $dir.'/';?>; " +content);
  }

</script>

