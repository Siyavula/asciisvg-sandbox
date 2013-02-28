<?php 
// Preparing for Preview
$zip_name = $dir."/".str_replace($parent_dir."/", "", $dir).".zip";
?>

<div class="alert alert-info form-inline">
  Random Seed: <input class="input" type="text" id="random_seed_preview" style="width:60px;"/> 
  <button class="btn btn-medium" onClick="httpPost_zip('<?php echo $dir;?>');">Zip</button> 
  <button class="btn btn-medium" onClick="httpPost_preview();">Preview</button> 
  <i id="zip_status"></i><i id="preview_status"></i>
</div>

<iframe class="span11" height="380" id="preview_iframe"></iframe>

<script>

  /* ==========================================================================================
  Writing to File
  ========================================================================================== */

  function httpPost_zip(dir) {
	    var xmlHttpReq = false;
	    var self = this;

      // Loading
      document.getElementById("zip_status").innerHTML = "<img src='images/icon/loading.gif'>";

		  // Mozilla/Safari
	    if (window.XMLHttpRequest) {
	        self.xmlHttpReq = new XMLHttpRequest();
	    }
	    // IE
	    else if (window.ActiveXObject) {
	        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    self.xmlHttpReq.open('POST', "functions/zip_file.php", true);
	    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    self.xmlHttpReq.onreadystatechange = function() {
	        if (self.xmlHttpReq.readyState == 4) {
						  var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText);
						  document.getElementById("zip_status").innerHTML = xmlHttp_data;
              setTimeout('document.getElementById("zip_status").innerHTML = "";', 4000);
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("dir="+dir);
  }

  /* ==========================================================================================
  Previewing Template
  ========================================================================================== */

  function httpPost_preview() {
	    var xmlHttpReq = false;
	    var self = this;
		  var random_seed = document.getElementById("random_seed_preview").value;

      // Loading
      document.getElementById("preview_status").innerHTML = "<img src='images/icon/loading.gif'>";

		  // Mozilla/Safari
	    if (window.XMLHttpRequest) {
	        self.xmlHttpReq = new XMLHttpRequest();
	    }
	    // IE
	    else if (window.ActiveXObject) {
	        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    self.xmlHttpReq.open('POST', "functions/preview_file.php", true);
	    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    self.xmlHttpReq.onreadystatechange = function() {
	        if (self.xmlHttpReq.readyState == 4) {
						  var xmlHttp_data = decodeURIComponent(self.xmlHttpReq.responseText);
              if (xmlHttp_data.substring(0,5) == "Error"){
              document.getElementById('preview_iframe').src = "";
              } else {
              document.getElementById('preview_iframe').src = "functions/template.html";
              }
              document.getElementById("preview_status").innerHTML = xmlHttp_data;
              setTimeout('document.getElementById("preview_status").innerHTML = "";', 4000);
	        }
	    }
      // Command to write to file
      self.xmlHttpReq.send("random_seed=" + random_seed);
  }


  

</script>
