(function ($) {

	$.fn.simplegmaps = function (options) {
		var defaults = {};
		var settings = $.extend({}, defaults, options);

		return this.each(function () {
			$.simplegmaps = {
				Map: {},
				options: null,
				directionsService: null,
				directionsDisplay: null,
				AppleMapLink: 'http://maps.apple.com/',
				AndroidMapLink: 'http://maps.google.com/maps',
				GenericMapLink: 'http://www.google.com/maps',


				methods: {
					init: function (options) {
						console.log(this);
						$.simplegmaps.options = options;

						$.simplegmaps.directionsService = new google.maps.DirectionsService();
						$.simplegmaps.directionsDisplay = new google.maps.DirectionsRenderer({
							draggable: true
						}),
						$.simplegmaps.methods.drawMap($(this))
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
									position: parseLatLng($(this).data('latlng'))
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
							zoomToFitBounds(map, markers);

							//Register map and its markers to class variable
							$.simplegmaps.Map = {
								map: map,
								markers: markers
							}

							if ($.simplegmaps.options.mapbutton) {
								bindMapLinkButton($.simplegmaps.options.mapbutton);
							}

						});
					},

					drawRoute: function (from, TravelMode) {
						var markers = $.simplegmaps.Map.markers;

						$.simplegmaps.directionsDisplay.setMap(simplegmaps.Map[targetMap].map);
						$.simplegmaps.directionsDisplay.setPanel(document.getElementById("google-map-route-directions"));

						var request = {
							origin: from,
							destination: markers[0].position,
							travelMode: google.maps.TravelMode[TravelMode]
						};
						$.simplegmaps.directionsService.route(request, function (response, status) {
							if (status == google.maps.DirectionsStatus.OK) {
								$.simplegmaps.directionsDisplay.setDirections(response);
							}
						});
					}

				},

				addMethods: function (newMethods) {
					$.simplegmaps.methods = $.extend($.simplegmaps.methods, newMethods);
				}
			};


			/*
			    PRIVATE METHODS
			  */

			// Zooms map enough to fit all markers. But not too much. Just enough to be perfect!
			// 
			// Array: markers
			function zoomToFitBounds(map, markers) {
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
			};

			// Takes a string with latlng in this format "55.5897407,13.012268899999981" and makes it into a latlng object
			function parseLatLng(latlngString) {
				var bits = latlngString.split(/,\s*/);
				$latlng = new google.maps.LatLng(parseFloat(bits[0]), parseFloat(bits[1]));
				return $latlng;
			};

			function bindMapLinkButton(el) {
				var markerPosition = $.simplegmaps.Map.markers[0].position.toString();
				var query = '?q=' + markerPosition;
				//console.log($.simplegmaps.Map.markers[0].position.toString());

				if (kitUtils.isAndroid()) {
					$(el).attr('href', $.simplegmaps.AndroidMapLink + query);
				} else if (kitUtils.isIOS()) {
					$(el).attr('href', $.simplegmaps.AppleMapLink + query);
				} else {
					$(el).attr('href', $.simplegmaps.GenericMapLink + query);
				}
				console.log($(el));
			};
		});
	};

})(jQuery);