<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
</div>

<div class="highlight">
	<h3 class="code">javascript</h3>
	<pre><code class="javascript">
	var sgmaps = new simplegmaps();
sgmaps.init({
    container: '#simplegmaps-1',
    MapOptions: {
      zoom: 16,
      styles: [{
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }]
}, {
    "featureType": "road.arterial",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#fee379"
    }]
}, {
    "featureType": "road.highway",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#fee379"
    }]
}, {
    "featureType": "landscape",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#f3f4f4"
    }]
}, {
    "featureType": "water",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#7fc8ed"
    }]
}, {}, {
    "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
        "color": "#000000",
        "visibility": "off"
    }]
}, {
    "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#83cead"
    }]
}, {
    "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#000000",
        "visibility": "on"
    }]
}, {
    "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "transparent",
        "visibility": "on"
    }]
}, {
    "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{
        "weight": 0.9
    }, {
        "visibility": "off"
    }]
}]
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

		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
    container: '#simplegmaps-1',
    MapOptions: {
      zoom: 16,
      styles: [{
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }]
}, {
    "featureType": "road.arterial",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#fee379"
    }]
}, {
    "featureType": "road.highway",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#fee379"
    }]
}, {
    "featureType": "landscape",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#f3f4f4"
    }]
}, {
    "featureType": "water",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#7fc8ed"
    }]
}, {}, {
    "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
        "color": "#000000",
        "visibility": "off"
    }]
}, {
    "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
        "visibility": "on"
    }, {
        "color": "#83cead"
    }]
}, {
    "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#000000",
        "visibility": "on"
    }]
}, {
    "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "transparent",
        "visibility": "on"
    }]
}, {
    "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{
        "weight": 0.9
    }, {
        "visibility": "off"
    }]
}]
    }
  });

</script>

<?php require('includes/footer.php') ?>
