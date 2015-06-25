(function ($) {
	// Change this to your plugin name.
	var pluginName = 'simplegmaps';

	/**
	 * Plugin object constructor.
	 * Implements the Revealing Module Pattern.
	 */
	function Plugin(element, options) {
		// References to DOM and jQuery versions of element.
		var el = element;
		var $el = $(element);
		var Map = false;
		var trafficLayer = false;
		var bicycleLayer = false;
		var TravelModes = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'];

		// Extend default options with those supplied by user.
		options = $.extend({}, $.fn[pluginName].defaults, options);

		/**
		 * Initialize plugin.
		 */
		function init() {
			// Need to parse the latlng position
			if (options.MapOptions.center) {
				options.MapOptions.center = parseLatLng(options.MapOptions.center);
			}

			// If zoom property missing, add it, or else MapOptions will fail.
			if (!options.MapOptions.zoom) {
				options.MapOptions.zoom = 8;
			}

			// Draw map and set markers
			drawMap();

			if (($(options.getRouteButton).length > 0) && ($(options.getTravelMode).length > 0)) {
				setupRouting(this);
			}

			if ($(options.geoLocationButton).length > 0) {
				$(options.geoLocationButton).on('click', function (e) {
					e.preventDefault();
					geoLocation(Map.map);
				}.bind(this));
			}

			hook('onInit');
		}

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
				map.setCenter(bounds.getCenter());
			} catch (e) {} // Let's catch this possible error and do nothing about it. Noone will ever know.
		}

		function findClosestMarker() {
			var myMarker = addMarker();
			console.log(myMarker);
			Map.markers.forEach(function (marker, index) {
				//console.log(index);
			//	console.log(Map.markers[index].position);
				//console.log(myMarker);
				//console.log(google.maps.geometry.spherical.computeDistanceBetween(myMarker.position, Map.markers[index].position));
			});
		}

		// Adds a marker to existing map and returns the marker item.
		function addMarker() {
			var geocoder = new google.maps.Geocoder();
			var address = '100 W 51rd St, New York, NY, United States';
			var markers = [];

			geocoder.geocode({
				'address': address
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					var marker = new google.maps.Marker({
						map: Map.map,
						position: results[0].geometry.location
					});
					markers.push(marker);
				}
			});

			google.maps.event.addListenerOnce(map, 'idle', function () {
				if (markers.length > 0) {
					zoomToFitBounds(map, markers);
				} else if (!options.MapOptions.center) {
					var bounds = new google.maps.LatLngBounds();
					map.fitBounds(bounds);
					map.setCenter(bounds.getCenter());
				}

				//Register map and its markers to class variable
				Map = {
					map: map,
					markers: markers
				};
				bindMapLinkButton();
				if (options.GeoLocation) {
					geoLocation(Map.map);
				}
			});

		}

		// Takes a string with latlng in this format "55.5897407,13.012268899999981" and makes it into a latlng object
		function parseLatLng(latlngString) {
			var bits = latlngString.split(/,\s*/);
			$latlng = new google.maps.LatLng(parseFloat(bits[0]), parseFloat(bits[1]));
			return $latlng;
		}

		function bindMapLinkButton() {
			if ($(options.externalLink).length > 0) {
				var markerPosition = Map.markers[0].position.toString();
				var query = '?q=' + markerPosition;

				if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
					$(options.externalLink).attr('href', options.AndroidMapLink + query);
				} else if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
					$(options.externalLink).attr('href', options.AppleMapLink + query);
				} else {
					$(options.externalLink).attr('href', options.GenericMapLink + query);
				}
			}
		}

		function drawMap() {
			var infoWindow = new google.maps.InfoWindow();
			var geocoder = new google.maps.Geocoder();
			var markers = [];
			var mapInData = $el.clone();

			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(-34.397, 150.644)
			};

			var map = new google.maps.Map($el[0], options.MapOptions); // We need [0] to get the html element instead of jQery object

			mapInData.find('div.map-marker').each(function (i) {
				if ($(this).attr('data-latlng')) {
					var marker = new google.maps.Marker({
						map: map,
						title: $(this).data('title'),
						position: parseLatLng($(this).data('latlng')),
						icon: $(this).data('icon')
					});
					if ($(this).has('div.map-infowindow').length > 0) {
						var infowindow = new google.maps.InfoWindow({
							content: $(this).find('div.map-infowindow').parent().html()
						});
						google.maps.event.addListener(marker, 'click', function () {
							infowindow.open(map, marker);
						});
					} else if ($(this).has('div.map-custom-infowindow').length > 0) {
						var customInfowindow = $(this).find('div.map-custom-infowindow').parent().html();
						google.maps.event.addListener(marker, 'click', function () {
							$('#simplegmaps-c-iw').remove();
							$('<div id="simplegmaps-c-iw"></div>').insertAfter($el);
							$('#simplegmaps-c-iw').html(customInfowindow);
							$('#simplegmaps-c-iw .close').on('click', function (event) {
								event.preventDefault();
								$('#simplegmaps-c-iw').remove();
							});
						});
					}

					markers.push(marker);
				} else if ($(this).attr('data-address')) {
					var currentMarkerData = $(this);
					geocoder.geocode({
						'address': $(this).data('address')
					}, function (results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							var marker = new google.maps.Marker({
								map: map,
								title: currentMarkerData.data('title'),
								position: results[0].geometry.location,
								icon: currentMarkerData.data('icon')
							});
							if (currentMarkerData.has('div.map-infowindow').length > 0) {
								var infowindow = new google.maps.InfoWindow({
									content: currentMarkerData.find('div.map-infowindow').parent().html()
								});
								google.maps.event.addListener(marker, 'click', function () {
									infowindow.open(map, marker);
								});
							} else if (currentMarkerData.has('div.map-custom-infowindow').length > 0) {

								var customInfowindow = currentMarkerData.find('div.map-custom-infowindow').parent().html();
								google.maps.event.addListener(marker, 'click', function () {
									$('#simplegmaps-c-iw').remove();
									$('<div id="simplegmaps-c-iw"></div>').insertAfter($el);
									$('#simplegmaps-c-iw').html(customInfowindow);
									$('#simplegmaps-c-iw .close').on('click', function (event) {
										event.preventDefault();
										$('#simplegmaps-c-iw').remove();
									});
								});
							}
							markers.push(marker);
						}
					});
				}

			});

			// We need to wait for Google to locate and place all markers
			google.maps.event.addListenerOnce(map, 'idle', function () {
				if (markers.length > 0) {
					zoomToFitBounds(map, markers);
				} else if (!options.MapOptions.center) {
					var bounds = new google.maps.LatLngBounds();
					map.fitBounds(bounds);
					map.setCenter(bounds.getCenter());
				}

				//Register map and its markers to class variable
				Map = {
					map: map,
					markers: markers
				};
				bindMapLinkButton();
				if (options.GeoLocation) {
					geoLocation(Map.map);
				}

				hook('onMapDrawn');
			});
		}

		function guid() {
			var strguid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
			return strguid;
		}

		function drawRoute(from) {
			var markers = Map.markers;
			directionsDisplay.setMap(Map.map);
			directionsDisplay.setPanel($(options.routeDirections)[0]);
			var routeOptions = {
				origin: from,
				destination: markers[0].position,
				travelMode: google.maps.TravelMode[currentTravelmode]
			};
			jQuery.extend(routeOptions, options.DirectionsRequestOptions);
			directionsService.route(routeOptions, function (response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					hook('onRouteDrawn');
				}
			});
		}

		function setTravelMode(travelmode) {
			var length = TravelModes.length;
			currentTravelmode = options.defaultTravelMode;
			for (var i = 0; i < length; i++) {
				if (TravelModes[i] === travelmode) {
					currentTravelmode = travelmode;
				}
			}
		}

		function setupRouting() {
			directionsService = new google.maps.DirectionsService();
			directionsDisplay = new google.maps.DirectionsRenderer({
				draggable: true
			});
			$(options.getRouteButton).on('click', function (e) {
				e.preventDefault();

				// Only accept DRIVING, WALKING or BICYCLING
				var travelmode = $(options.getTravelMode).val();
				setTravelMode(travelmode);
				if ($(options.getFromAddress).val().length > 0) {
					drawRoute($(options.getFromAddress).val());
				}
			});
		}

		function geoLocation(map) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					map.setCenter(pos);
				}, function () {
					handleNoGeolocation(map, true);
				});
			} else {
				// Browser doesn't support Geolocation
				handleNoGeolocation(map, false);
			}
		}

		function toggleTrafficLayer() {
			if ((trafficLayer) && (trafficLayer.map !== null)) {
				trafficLayer.setMap(null);
			} else {
				trafficLayer = new google.maps.TrafficLayer();
				trafficLayer.setMap(Map.map);
			}
		}

		function toggleBicycleLayer() {
			if ((bicycleLayer) && (bicycleLayer.map !== null)) {
				bicycleLayer.setMap(null);
			} else {
				bicycleLayer = new google.maps.BicyclingLayer();
				bicycleLayer.setMap(Map.map);
			}
		}

		function handleNoGeolocation(map, errorFlag) {
			var content;
			if (errorFlag) {
				content = 'Error: The Geolocation service failed.';
			} else {
				content = 'Error: Your browser doesn\'t support geolocation.';
			}

			var options = {
				map: map,
				position: new google.maps.LatLng(60, 105),
				content: content
			};

			var infowindow = new google.maps.InfoWindow(options);
			Map.setCenter(options.position);
		}

		function setGeoLocation() {
			geoLocation(Map.map);
		}


		/**
		 * Get/set a plugin option.
		 * Get usage: $('#el').simplegmaps('option', 'key');
		 * Set usage: $('#el').simplegmaps('option', 'key', value);
		 */
		function option(key, val) {
			if (val) {
				options[key] = val;
			} else {
				return options[key];
			}
		}

		/**
		 * Destroy plugin.
		 * Usage: $('#el').simplegmaps('destroy');
		 */
		function destroy() {
			// Iterate over each matching element.
			$el.each(function () {
				var el = this;
				var $el = $(this);

				// Add code to restore the element to its original state...

				hook('onDestroy');
				// Remove Plugin instance from the element.
				$el.removeData('plugin_' + pluginName);
			});
		}

		/**
		 * Callback hooks.
		 * Usage: In the defaults object specify a callback function:
		 * hookName: function() {}
		 * Then somewhere in the plugin trigger the callback:
		 * hook('hookName');
		 */
		function hook(hookName) {
			if (options[hookName] !== undefined) {
				// Call the user defined function.
				// Scope is set to the jQuery element we are operating on.
				options[hookName].call(el);
			}
		}

		// Initialize the plugin
		init();

		// Expose methods of Plugin we wish to be public.
		return {
			option: option,
			destroy: destroy,
			toggleTrafficLayer: toggleTrafficLayer,
			toggleBicycleLayer: toggleBicycleLayer,
			addMarker: addMarker,
			findClosestMarker: findClosestMarker
		};
	}

	/**
	 * Plugin definition.
	 */
	$.fn[pluginName] = function (options) {
		// If the first parameter is a string, treat this as a call to
		// a public method.
		if (typeof arguments[0] === 'string') {
			var methodName = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			var returnVal;
			this.each(function () {
				// Check that the element has a plugin instance, and that
				// the requested public method exists.
				if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
					// Call the method of the Plugin instance, and Pass it
					// the supplied arguments.
					returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
				} else {
					throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
				}
			});
			if (returnVal !== undefined) {
				// If the method returned a value, return the value.
				return returnVal;
			} else {
				// Otherwise, returning 'this' preserves chainability.
				return this;
			}
			// If the first parameter is an object (options), or was omitted,
			// instantiate a new instance of the plugin.
		} else if (typeof options === 'object' || !options) {
			return this.each(function () {
				// Only allow the plugin to be instantiated once.
				if (!$.data(this, 'plugin_' + pluginName)) {
					// Pass options to Plugin constructor, and store Plugin
					// instance in the elements jQuery data object.
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		}
	};

	// Default plugin options.
	// Options can be overwritten when initializing plugin, by
	// passing an object literal, or after initialization:
	// $('#el').simplegmaps('option', 'key', value);
	$.fn[pluginName].defaults = {
		GeoLocation: false,
		MapOptions: {
			draggable: true,
			zoom: 8,
			scrollwheel: false,
			streetViewControl: false,
			panControl: true,
			zoomControl: true,
			zoomControlOptions: {
				style: 'DEFAULT'
			}
		},
		AppleMapLink: 'http://maps.apple.com/',
		AndroidMapLink: 'http://maps.google.com/maps',
		GenericMapLink: 'http://www.google.com/maps',
		getRouteButton: '#simplegmaps-getroute',
		getTravelMode: '#simplegmaps-travelmode',
		routeDirections: '#simplegmaps-directions',
		externalLink: '#simplegmaps-external',
		getFromAddress: '#simplegmaps-fromaddress',
		defaultTravelMode: 'DRIVING',
		onInit: function () {},
		onLoad: function () {},
		onDestroy: function () {},
		onRouteDrawn: function () {},
		onMapDrawn: function () {}
	};

})(jQuery);
