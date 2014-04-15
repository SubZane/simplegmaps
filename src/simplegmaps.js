var simplegmaps = {
	Maps: {},
	directionsService: new google.maps.DirectionsService(),
	directionsDisplay: new google.maps.DirectionsRenderer({
		draggable: true
	}),

	init: function () {
		if ($('.google-map').length > 0) {

			// Loop through all the maps and render them. Old skool!
			$('.google-map').each(function (i) {
				simplegmaps.drawMap($(this));

			});
		}

		if (($('.GMRoute-Submit').length > 0) && ($('.GMRoute-Fromaddress').length > 0)) {
			$('.GMRoute-Submit').on('click', function (e) {
				if ($(this).attr('data-target')) {
					if ($('.GMRoute-Fromaddress').val().length > 0) {
						simplegmaps.drawRoute($(this).data('target'), $('.GMRoute-Fromaddress').val(), $('#GMRoute-TravelMode').val());
					}
				}
				e.preventDefault();
			});
		}
	},

	drawRoute: function (targetMap, from, TravelMode) {
		var markers = simplegmaps.Maps[targetMap].markers;

		simplegmaps.directionsDisplay.setMap(simplegmaps.Maps[targetMap].map);
		simplegmaps.directionsDisplay.setPanel(document.getElementById("google-map-route-directions"));

		var request = {
			origin: from,
			destination: markers[0].position,
			travelMode: google.maps.TravelMode[TravelMode]
		};
		simplegmaps.directionsService.route(request, function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				simplegmaps.directionsDisplay.setDirections(response);
				console.log('set route');
			}
		});
	},

	drawMap: function (mapEl) {
		var infoWindow = new google.maps.InfoWindow();
		var geocoder = new google.maps.Geocoder();
		var markers = [];
		var mapInData = mapEl.clone();
		var map = new google.maps.Map(mapEl[0]); // We need [0] to get the html element instead of jQery object 

		mapInData.find('div.map-marker').each(function (i) {
			if ($(this).attr('data-latlng')) {
				var marker = new google.maps.Marker({
					map: map,
					title: $(this).data('title'),
					position: simplegmaps.parseLatLng($(this).data('latlng'))
				});
				if ($(this).has("div.map-infowindow").length > 0) {
					var infowindow = new google.maps.InfoWindow({
						content: $(this).find('div.map-infowindow').parent().html()
					});
					google.maps.event.addListener(marker, 'click', function () {
						infowindow.open(map, marker);
					});
				}

				markers.push(marker);
			} else if ($(this).attr('data-address')) {
				var currentMarkerData = $(this);
				geocoder.geocode({
					'address': $(this).data('address')
				}, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var marker = new google.maps.Marker({
							map: map,
							title: currentMarkerData.data('title'),
							position: results[0].geometry.location
						});
						if (currentMarkerData.has("div.map-infowindow").length > 0) {
							var infowindow = new google.maps.InfoWindow({
								content: currentMarkerData.find('div.map-infowindow').parent().html()
							});
							google.maps.event.addListener(marker, 'click', function () {
								infowindow.open(map, marker);
							});
						}

						markers.push(marker);
					}
				});
			}

		});

		// We need to wait for Google to locate and place all markers
		google.maps.event.addListenerOnce(map, 'idle', function () {
			simplegmaps.zoomToFitBounds(map, markers);

			//Register map and its markers to class variable
			simplegmaps.Maps[mapEl.attr('id')] = {
				map: map,
				markers: markers
			}
			console.log(simplegmaps.Maps['google-map-route']);
		});


	},


	// Zooms map enough to fit all markers. But not too much. Just enough to be perfect!
	// 
	// Array: markers
	zoomToFitBounds: function (map, markers) {
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < markers.length; ++i) {
			bounds.extend(markers[i].getPosition());
		}
		if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
			var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.002, bounds.getNorthEast().lng() + 0.002);
			var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.002, bounds.getNorthEast().lng() - 0.002);
			bounds.extend(extendPoint1);
			bounds.extend(extendPoint2);
		}
		try {
			map.fitBounds(bounds);
			map.setCenter(bounds.getCenter())
		} catch (e) {} // Let's catch this possible error and do nothing about it. Noone will ever know.
	},

	// Takes a string with latlng in this format "55.5897407,13.012268899999981" and makes it into a latlng object
	parseLatLng: function (latlngString) {
		var bits = latlngString.split(/,\s*/);
		$latlng = new google.maps.LatLng(parseFloat(bits[0]), parseFloat(bits[1]));
		return $latlng;
	}

}