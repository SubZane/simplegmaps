<?php require('includes/header.php') ?>
    <div id="simplegmaps-1" class="google-map">
      <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
    </div>
<div class="row row-route">
  <div class="col-md-4 col-xs-12 col-sm-12 col-md-push-2">
    <div class="form-group">
       <label for="simplegmaps-searchbox">Find place using AutoComplete</label>
       <input type="text" class="form-control" id="simplegmaps-searchfield" placeholder="Enter location" value="" />
     </div>
  </div>
  <div class="col-md-2 col-xs-12 col-sm-12 col-md-push-2">
    <div class="form-group">
      <button type="submit" id="simplegmaps-searchbutton" class="btn btn-primary">Search</button>
    </div>
  </div>
</div>

<div class="highlight">
	<h3 class="code">javascript</h3>
	<pre><code class="javascript">
	var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
  MapOptions: {
    zoom: 12
  }
});
sgmaps.Search.init({
  input: '#simplegmaps-searchfield',
  eventButton: '#simplegmaps-searchbutton'
});
</code></pre>
</div>

<div class="highlight">
	<h3 class="code">HTML</h3>
	<pre><code class="html">

	<div class="row">
  <div class="col-xs-12">
    <div id="simplegmaps-1" class="google-map">
      <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
    </div>
  </div>
</div>
<div class="row row-route">
  <div class="col-md-4 col-xs-12 col-sm-12 col-md-push-2">
    <div class="form-group">
       <label for="simplegmaps-searchbox">Find place using AutoComplete</label>
       <input type="text" class="form-control" id="simplegmaps-searchfield" placeholder="Enter location" value="" />
     </div>
  </div>
  <div class="col-md-2 col-xs-12 col-sm-12 col-md-push-2">
    <div class="form-group">
      <button type="submit" id="simplegmaps-searchbutton" class="btn btn-primary">Search</button>
    </div>
  </div>
</div>

		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
  MapOptions: {
    zoom: 12
  }
});
sgmaps.Search.init({
  input: '#simplegmaps-searchfield',
  eventButton: '#simplegmaps-searchbutton'
});

</script>

<?php require('includes/footer.php') ?>
