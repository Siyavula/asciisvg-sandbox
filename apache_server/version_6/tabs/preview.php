
<p><button onClick="httpPost_zip('<?php echo $dir;?>');">Zip</button> <i id="zip_status"></i></p>

<p><button onClick="">Preview</button> <i id="preview_status"></i></p>

<script>

  /* ==========================================================================================
  Writing to File
  ========================================================================================== */

  function httpPost_zip(dir="") {
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

	    self.xmlHttpReq.open('GET', "functions/zip_file.php?dir="+dir, true);
	    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    self.xmlHttpReq.onreadystatechange = function() {
	        if (self.xmlHttpReq.readyState == 4) {
						  var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText);
						  document.getElementById("zip_status").innerHTML = xmlHttp_data;
              setTimeout('document.getElementById("zip_status").innerHTML = "";', 2000);
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send();
  }

</script>
