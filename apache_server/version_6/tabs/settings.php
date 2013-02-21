<?php
$filecontents = @read_file("functions/config.txt");
$filecontents = $filecontents[1];
?> 

<div class="thumbnail">
  <div class="caption">
    <h2>Settings</h2>
    <hr>
    <p>Select a monassis-server to use:</p>
    <p>
      <button type="button" id="btn_local" class="btn btn-medium <?php if ($filecontents == '127.0.0.1'):?>btn-success<?php endif;?>" onClick="httpPost_config_server('127.0.0.1');"><i class="icon-arrow-down"></i> 127.0.0.1</button> 
      <button type="button" id="btn_web" class="btn btn-medium <?php if ($filecontents == 'www.monassis.com'):?>btn-success<?php endif;?>" onClick="httpPost_config_server('www.monassis.com');"><i class="icon-globe"></i> www.monassis.com</button> 
      <i id="server_status"></i>
    </p>

    <hr>
     <p>Setup apache server permission:</p>
     <p><i>$> sudo chgrp -R www-data /var/www/</i> 
    <hr>
     <p>Setup monassis-template permission:</p>
     <p><i>$> cd <b>[path to monassis-templates]</b></i> 
     <p><i>$> sudo chgrp -R www-data mathematics/</i> 
     <p><i>$> sudo chgrp -R www-data physical_sciences/</i> 
    <hr>

  </div>
</div>

<script>

  /* ==========================================================================================
  Writing to File
  ========================================================================================== */

  function httpPost_config_server(server_name) {
	    var xmlHttpReq = false;
	    var self = this;

		  // Mozilla/Safari
	    if (window.XMLHttpRequest) {
	        self.xmlHttpReq = new XMLHttpRequest();
	    }
	    // IE
	    else if (window.ActiveXObject) {
	        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    self.xmlHttpReq.open('POST', "functions/update_config.php", true);
	    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    self.xmlHttpReq.onreadystatechange = function() 
      {
        if (self.xmlHttpReq.readyState == 4) 
        {
				  var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText);  

          if (xmlHttp_data.substring(1,8) == "Success")
          {
            if (server_name == "127.0.0.1")
            {
              document.getElementById("btn_local").className = "btn btn-medium btn-success";
						  document.getElementById("btn_web").className = "btn btn-medium";
            }
            else if (server_name == "www.monassis.com")
            {
              document.getElementById("btn_web").className = "btn btn-medium btn-success";
						  document.getElementById("btn_local").className = "btn btn-medium";
            }
          }
        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("server_name="+server_name);
  }

</script>


