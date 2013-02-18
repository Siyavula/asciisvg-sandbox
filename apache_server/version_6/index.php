<?php include_once("header.php"); ?>

    <div class="container-fluid">
      <div class="row-fluid">

        <!-- menu -->

        <?php 

        $dir = @clean_dir(@$_GET['dir']);
        $parent_dir = substr($dir, 0, strrpos($dir, "/"));
        $directory_list = get_directory($dir);
        $file_list = get_files($dir);

        ?>

        <div class="span3">

          <!-- 
          <ul class="nav nav-tabs nav-stacked">
            <li><a href="?dir=<?php echo $dir;?>&settings=1"><i class="icon-wrench"></i> Settings</a></li>
          </ul>
          -->

          <ul class="nav nav-tabs nav-stacked">

            <li><a href="?dir=<?php echo $parent_dir;?>"><i class="icon-chevron-up"></i> Back</a></li>
          
            <?php foreach ($directory_list[1] as $directory): ?>
            <?php $link = str_replace("//", "/", $directory_list[0]."/".$directory); ?>
            <li><a href="?dir=<?php echo $link; ?>"><i class="icon-folder-open"></i> <?php echo $directory?></a></li>
            <?php endforeach ?>

          </ul>

        </div>

        <!-- content -->

        <div class="span9">
  
          <?php if (@$_GET['settings'] == 1): ?> <!-- Start of settings -->
    
          <div class="thumbnail">
            <div class="caption">
              <h2>Settings</h2>
              <hr>
              <p>Get the latest monassis-buildout repository.</p>
              <p><button type="button" class="btn btn-small" onClick=""><i class="icon-arrow-down"></i> GIT PULL</button> <i id="git_status"></i>0</p>
              <hr>
              <p>Activate the monassis-buildout server.</p>
              <p>
<button type="button" class="btn btn-small" onClick=""><i class="icon-play"></i> Start</button>
<button type="button" class="btn btn-small" onClick=""><i class="icon-repeat"></i> Restart</button>
<button type="button" class="btn btn-small" onClick=""><i class="icon-stop"></i> Stop</button>
<i id="server_status">0</i>
              </p>
            </div>
          </div>

          <?php else: ?> <!-- End of Settings, Start of Content -->

            <!-- tabs -->

            <?php $tab_dict = array(); ?>

            <?php foreach ($file_list[1] as $file): ?>

              <?php
              if (strpos($file, ".xml") !== false) 
              {
                $tab_dict[0][] = $file;
              }
              elseif (strpos($file, ".py") !== false) 
              {
                $tab_dict[1][] = $file;
              }
              elseif (strpos($file, ".ascsvg") !== false) 
              {
                $tab_dict[2][] = $file;
              }
              ?>

            <?php endforeach ?>

            <div class="row-fluid">

              <?php if (isset($tab_dict[0][0])): ?>
              <ul id="myTab" class="nav nav-tabs">
                <li class="active"><a href="#xml" data-toggle="tab">XML</a></li>
               
                  <?php if (isset($tab_dict[1][0])): ?>
                  <li><a href="#python" data-toggle="tab">Python</a></li>
                  <?php endif; ?>                

                  <?php if (isset($tab_dict[2][0])): ?>
                    <?php foreach ($tab_dict[2] as $key=>$image_name): ?>
                    <li><a href="#ascsvg-<?php echo $key;?>" data-toggle="tab"><?php echo $image_name; ?></a></li>
                    <?php endforeach; ?>                
                  <?php endif; ?>

                  <!-- Preview --> 

                  <li><a href="#sandbox-preview" data-toggle="tab"><?php echo "Sandbox Preview"; ?></a></li>

              </ul>
              <?php endif; ?>

              <!-- Show Files -->

              <div id="myTabContent" class="tab-content">

                <?php if (isset($tab_dict[0][0])): ?>
                <div class="tab-pane fade in active" id="xml">
                  <?php include ("tabs/xml.php"); ?>
                </div>
                <?php endif; ?>

                <?php if (isset($tab_dict[1][0])): ?>
                <div class="tab-pane fade" id="python">
                  <?php include ("tabs/python.php"); ?>
                </div>
                <?php endif; ?>              

                <?php if (isset($tab_dict[2][0])): ?>
                  <?php foreach ($tab_dict[2] as $key=>$image_name): ?>
                  <div class="tab-pane fade" id="ascsvg-<?php echo $key;?>">
                    <?php include ("tabs/ascsvg.php"); ?>
                  </div>
                  <?php endforeach; ?>                
                <?php endif; ?>

                <?php if (isset($tab_dict[0][0])): ?>
                <div class="tab-pane fade" id="sandbox-preview">
                  <?php include ("tabs/preview.php"); ?>
                </div>
                <?php endif; ?>

              </div>

              <?php // include ("tabs/load.php"); ?>

            </div><!-- /tabs -->
          </div><!-- /content -->

        <?php endif; ?> <!-- End of content -->

      </div><!--/row-->
    </div><!--/.fluid-container-->

<?php include_once("footer.php");?>
