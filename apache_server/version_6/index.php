<?php include_once("header.php"); ?>

    <div class="container-fluid">
      <div class="row-fluid">

        <!-- menu -->

        <div class="span3">

          <?php if (!empty($file_list[1])): ?> 
          <div class="alert alert-info">
            <i class="icon-folder-open"></i> Template: <?php echo $template_name; ?>
          </div>
          <?php else: ?>
          <div class="alert alert-info">
            <i class="icon-search"></i> Select a template...
          </div>
          <?php endif; ?>

          <div class="alert alert-warning" id="warning_save_changes" style="display:none;">
            <i class="icon-warning-sign"></i> SAVE changes before navigating!
          </div>

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

          <?php include ("tabs/server.php"); ?>

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
             
              <ul id="myTab" class="nav nav-tabs">

                <?php if (isset($tab_dict[0][0])): ?>

                  <li class="active"><a href="#xml" data-toggle="tab">XML</a></li>
                 
                  <?php if (isset($tab_dict[1][0])): ?>
                  <li><a href="#python" data-toggle="tab">Python</a></li>
                  <?php endif; ?>                

                  <?php if (isset($tab_dict[2][0])): ?>
                  <li class="dropdown">
                      <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                          Images
                          <b class="caret"></b>
                        </a>
                      <ul class="dropdown-menu">
                        <?php foreach ($tab_dict[2] as $key=>$image_name): ?>
                            <li>
                              <a href="#ascsvg-<?php echo $key;?>" data-toggle="tab">
                                <?php echo $image_name; ?>
                              </a>
                            </li>
                        <?php endforeach; ?>      
                      </ul>
                  </li>
                  <?php endif; ?>

                <!-- Preview --> 

                <li><a href="#sandbox-preview" data-toggle="tab"><?php echo "Sandbox Preview"; ?></a></li>

                <?php endif; ?>

                <!-- Options -->

                <li class="dropdown pull-right">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    Options
                    <b class="caret"></b>
                  </a>
                <ul class="dropdown-menu">
                  <li><a href="#resource_colours" data-toggle="tab"><i class="icon-info-sign"></i> Colours</a></li>
                  <li><a href="#resource_functions" data-toggle="tab"><i class="icon-info-sign"></i> Functions</a></li>
                  <li><a href="#resource_unicode" data-toggle="tab"><i class="icon-info-sign"></i> Unicode List</a></li>
                  <li class="divider"></li>
                  <li><a href="#settings" data-toggle="tab"><i class="icon-wrench"></i> Settings</a></li>
                  <li class="divider"></li>
                  <li><a href="#terminal" data-toggle="tab"><i class="icon-eye-open"></i> Terminal</a></li>
                </ul>
                </li>

              </ul>
  
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

                <div class="tab-pane fade" id="settings">
                  <?php include ("tabs/settings.php"); ?>
                </div>

                <div class="tab-pane fade" id="resource_colours">
                  <?php include ("tabs/resource_colours.php"); ?>
                </div>

                <div class="tab-pane fade" id="resource_functions">
                  <?php include ("tabs/resource_functions.php"); ?>
                </div>

                <div class="tab-pane fade" id="resource_unicode">
                  <?php include ("tabs/resource_unicode.php"); ?>
                </div>

                <div class="tab-pane fade" id="terminal">
                  <?php include ("tabs/terminal.php"); ?>
                </div>

              </div>

              <?php // include ("tabs/load.php"); ?>

            </div><!-- /tabs -->
          </div><!-- /content -->

        <?php endif; ?> <!-- End of content -->

      </div><!--/row-->
    </div><!--/.fluid-container-->

<?php include_once("footer.php");?>
