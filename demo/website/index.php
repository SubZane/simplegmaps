<?php
require('markdownparser.php');
$Parsedown = new Parsedown();
require('header.php');
$readme = file_get_contents('https://raw.githubusercontent.com/SubZane/simplegmaps/master/CHANGELOG.md');
$installation = file_get_contents('installation.md');
?>
<div class="row content">
  <div class="col-xs-12 col-md-7">
    <h2>Background</h2>
    <p>
      I found that other scripts was too complicated to deal with and needed much scripting just to set a marker on a map. I want to separate HTML markup from JavaScript as much as possible and I want the user of the script to be able to add markers to a map without writing a single line JavaScript.
    </p>
    <p>
      Meet simplegmaps!
    </p>
    <h3>Features</h3>
    <ul>
      <li>Display one or multiple markers on your map</li>
      <li>Add info windows to markers with custom html markup</li>
      <li>Display routes on your map</li>
      <li>No scripting necessary</li>
      <li>Support for traffic layers</li>
      <li>Support for weather layers</li>
      <li>Support for bicycle route layer</li>
      <li>Support for automatic geo location</li>
      <li>Support for geo location on demand, by clicking a button for example</li>
      <li>Support for custom marker icons</li>
      <li>Custom InfowWindow - Position and style your own custom infowindow.</li>
    </ul>

    <h3>Prerequisites</h3>
    <p>You'll need to include jQuery and the google maps API and of course simplegmaps itself before you can start. To view implementation examples please checkout the different examples in the menu.</p>
    <?php echo $Parsedown->text($installation);?>
  </div>
  <div class="col-md-5">
    <div class="changelog">
      <h3>Changelog</h3>
      <?php echo $Parsedown->text($readme);?>

    </div>
  </div>
</div>
<?php require('footer.php') ?>
