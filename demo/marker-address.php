<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map">
	<div class="map-marker" data-title="Remi" data-address="145 W 53rd St, New York, NY 10019, USA"></div>
</div>


<div class="highlight">
	<h3 class="code">javascript</h3>
	<pre><code class="javascript">
	var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1'
});
</code></pre>
</div>

<div class="highlight">
	<h3 class="code">HTML</h3>
	<pre><code class="html">

	<div id="simplegmaps-1" class="google-map">
	<div class="map-marker" data-title="Remi" data-address="145 W 53rd St, New York, NY 10019, USA"></div>
</div>

		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1'
});

</script>

<?php require('includes/footer.php') ?>
