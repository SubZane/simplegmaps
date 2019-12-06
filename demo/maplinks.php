<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
</div>
<ul class="listbuttons">
      <li><a href="#" target="_blank" class="getGoogleMapLink">Google Maps</a>  (for smartphone)</li>
      <li><a href="#" target="_blank" class="getAppleMapsLink">Apple Maps</a> (OSX, iOS)</li>
      <li><a href="#" target="_blank" class="getWindowsPhone7MapLink">Maps on WindowsPhone7</a></li>
      <li><a href="#" target="_blank" class="getDesktopMapLink">Google Maps</a> (Normal browser link)</li>
      <li><a href="#" target="_blank" class="getNativeMapLink">Native Map App Link</a> (Intelligent link)</li>
    </ul>

<div class="highlight">
	<h3 class="code">javascript</h3>
	<pre><code class="javascript">
	var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
  onDrawMap: function () {
    sgmaps.getMarkerAddress(sgmaps.Markers.get()[0], function(address) {
      document.querySelector('.getGoogleMapLink').href = sgmaps.getURL.Android(address);
      document.querySelector('.getAppleMapsLink').href = sgmaps.getURL.ios(address);
      document.querySelector('.getWindowsPhone7MapLink').href = sgmaps.getURL.WindowsPhone(address);
      document.querySelector('.getDesktopMapLink').href = sgmaps.getURL.Desktop(address);
      document.querySelector('.getNativeMapLink').href = sgmaps.getURL.Native(address);
    })
  }
});
</code></pre>
</div>

<div class="highlight">
	<h3 class="code">HTML</h3>
	<pre><code class="html">

	<div id="simplegmaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
</div>
<ul class="listbuttons">
      <li><a href="#" target="_blank" class="getGoogleMapLink">Google Maps</a>  (for smartphone)</li>
      <li><a href="#" target="_blank" class="getAppleMapsLink">Apple Maps</a> (OSX, iOS)</li>
      <li><a href="#" target="_blank" class="getWindowsPhone7MapLink">Maps on WindowsPhone7</a></li>
      <li><a href="#" target="_blank" class="getDesktopMapLink">Google Maps</a> (Normal browser link)</li>
      <li><a href="#" target="_blank" class="getNativeMapLink">Native Map App Link</a> (Intelligent link)</li>
    </ul>
		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
  onDrawMap: function () {
    sgmaps.getMarkerAddress(sgmaps.Markers.get()[0], function(address) {
      document.querySelector('.getGoogleMapLink').href = sgmaps.getURL.Android(address);
      document.querySelector('.getAppleMapsLink').href = sgmaps.getURL.ios(address);
      document.querySelector('.getWindowsPhone7MapLink').href = sgmaps.getURL.WindowsPhone(address);
      document.querySelector('.getDesktopMapLink').href = sgmaps.getURL.Desktop(address);
      document.querySelector('.getNativeMapLink').href = sgmaps.getURL.Native(address);
    })
  }
});

</script>

<?php require('includes/footer.php') ?>
