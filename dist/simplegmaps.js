/*! simplegmaps - v2.0.0 - 2016-02-02
* https://github.com/SubZane/simplegmaps
* Copyright (c) 2016 Andreas Norman; Licensed MIT */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.simplegmaps = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var simplegmaps = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, eventTimeout;
	var el;

	var bicycleLayer, trafficLayer, transitLayer = false;

	var TravelModes = {
		Driving: google.maps.TravelMode.DRIVING,
		Bicycling: google.maps.TravelMode.BICYCLING,
		Transit: google.maps.TravelMode.TRANSIT,
		Walking: google.maps.TravelMode.WALKING
	};
	var UnitSystems = {
		Metric: google.maps.UnitSystem.METRIC,
		Imperial: google.maps.UnitSystem.IMPERIAL
	};

	var DirectionsRequest = {
		travelMode: TravelModes.Driving,
		unitSystem: UnitSystems.Metric
	};

	var map;
	var mapdata; // Element copy. Used to read map settings
	var markerData = {
		markers: []
	};
	var markers = [];

	// Default settings. zoom and center are required to render the map.
	var defaults = {
		debug: true,
		GeoLocation: false,
		ZoomToFitBounds: false,
		jsonsource: false, // if set to "false". Load from HTML markup.
		MapOptions: {
			draggable: true,
			zoom: 2,
			center: '55.604981,13.003822',
			scrollwheel: false,
			streetViewControl: false,
			panControl: true,
			zoomControl: true,
			zoomControlOptions: {
				style: 'DEFAULT'
			}
		},
		onDestroy: function () {}
	};


	//
	// Private Methods
	//

	var drawMap = function () {
		mapdata = el.cloneNode(true);
		map = new google.maps.Map(el, settings.MapOptions);

		map.addListener('bounds_changed', function () {
			hook('bounds_changed');
		});

		map.addListener('click', function () {
			hook('click');
		});

		map.addListener('dblclick', function () {
			hook('dblclick');
		});

		map.addListener('drag', function () {
			hook('drag');
		});

		map.addListener('dragend', function () {
			hook('dragend');
		});

		map.addListener('dragstart', function () {
			hook('dragstart');
		});

		map.addListener('heading_changed', function () {
			hook('heading_changed');
		});

		map.addListener('idle', function () {
			hook('idle');
		});

		map.addListener('maptypeid_changed', function () {
			hook('maptypeid_changed');
		});

		map.addListener('mousemove', function () {
			hook('mousemove');
		});

		map.addListener('mouseout', function () {
			hook('mouseout');
		});

		map.addListener('mouseover', function () {
			hook('mouseover');
		});

		map.addListener('projection_changed', function () {
			hook('projection_changed');
		});

		map.addListener('resize', function () {
			hook('resize');
		});

		map.addListener('rightclick', function () {
			hook('rightclick');
		});

		map.addListener('tilesloaded', function () {
			hook('tilesloaded');
		});

		map.addListener('tilt_changed', function () {
			hook('tilt_changed');
		});

		map.addListener('zoom_changed', function () {
			hook('zoom_changed');
		});

	};

	var getMapMarkersFromJSON = function (done) {
		if (settings.jsonsource === false) {
			log('settings.jsonsource === false');
			return false;
		}
		var request = new XMLHttpRequest();

		request.open('GET', settings.jsonsource, true);

		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				var JSONmarkers = parseJSON(request.response);
				forEach(JSONmarkers, function (marker, value) {
					getPosition(marker, function (markerposition) {
						marker.position = markerposition;
						createMarkerIcon(marker.iconpath, marker.iconpath2x, function (markerIcon) {
							marker.icon = markerIcon;
							markerData.markers.push(marker);

							// Do not leave until all markers has been loaded.
							if (markerData.markers.length === JSONmarkers.length) {
								done();
							}
						});
					});
				});
			} else {
				// We reached our target server, but it returned an error
				if (settings.debug) {
					console.log('An error occured when trying to load data from ' + settings.datasource);
				}
			}
		};
		request.onerror = function () {
			// There was a connection error of some sort
			if (settings.debug) {
				console.log('A connection error occured when trying to access ' + settings.datasource);
			}
		};
		request.send();
	};

	var parseJSON = function (jsonString) {
		try {
			var o = JSON.parse(jsonString);
			// Handle non-exception-throwing cases:
			// Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
			// but... JSON.parse(null) returns 'null', and typeof null === "object",
			// so we must check for that, too.
			if (o && typeof o === 'object' && o !== null) {
				return o;
			}
		} catch (e) {}
		console.warn('Error parsing JSON file');
		return false;
	};

	var getMapMarkersFromMarkup = function (done) {
		var markerList = mapdata.querySelectorAll('.map-marker');

		forEach(markerList, function (markerElement, value) {
			var marker = {};
			marker.title = markerElement.getAttribute('data-title');
			if (markerElement.querySelector('.map-infowindow')) {
				marker.infoWindowContent = markerElement.querySelector('div.map-infowindow').parentElement.innerHTML;
				marker.CustominfoWindowContent = null;
			} else if (markerElement.querySelector('.map-custom-infowindow')) {
				marker.CustominfoWindowContent = markerElement.querySelector('.map-custom-infowindow').parentElement.innerHTML;
				marker.infoWindowContent = null;
			}

			if (markerElement.hasAttribute('data-center')) {
				marker.center = true;
			} else {
				marker.center = false;
			}

			if (markerElement.hasAttribute('data-latlng')) {
				marker.latlng = markerElement.getAttribute('data-latlng');
			} else {
				marker.latlng = null;
			}
			if (markerElement.hasAttribute('data-address')) {
				marker.address = markerElement.getAttribute('data-address');
			} else {
				marker.address = null;
			}

			if (markerElement.hasAttribute('data-icon')) {
				marker.iconpath = markerElement.getAttribute('data-icon');
			} else {
				marker.iconpath = null;
			}
			if (markerElement.hasAttribute('data-icon2x')) {
				marker.iconpath2x = markerElement.getAttribute('data-icon2x');
			} else {
				marker.iconpath2x = null;
			}

			getPosition(marker, function (markerposition) {
				marker.position = markerposition;
				createMarkerIcon(marker.iconpath, marker.iconpath2x, function (markerIcon) {
					marker.icon = markerIcon;
					markerData.markers.push(marker);

					// Do not leave until all markers has been loaded.
					if (markerData.markers.length === markerList.length) {
						done();
					}
				});
			});
		});
	};

	var placeMarkers = function () {
		log('-- placeMarkers --');
		forEach(markerData.markers, function (markerObj, value) {
			log(markerObj);
			var markerOptions = {};

			// Create new marker object
			var marker = new google.maps.Marker({
				title: markerObj.title,
				center: markerObj.center
			});
			markers.push(marker);

			// Create infowindow object
			marker = setInfoWindow(marker, markerObj);

			markerOptions.position = markerObj.position;
			markerOptions.icon = markerObj.icon;
			marker.setOptions(markerOptions);
			marker.setMap(map);
			log(marker.title);
			log('lat: ' + marker.getPosition().lat());
			log('lng: ' + marker.getPosition().lng());
		});

		log('-- map idle --');
		var bounds = new google.maps.LatLngBounds();
		var position = {};
		if (markers.length > 0) {
			if (settings.ZoomToFitBounds === true) {
				log('ZoomToFitBounds');
				zoomToFitBounds();
			} else {
				log('NO - ZoomToFitBounds');
				// Find all markers that has the value center==true
				var centeredmarker = markers.filter(function (obj) {
					return (obj.center === true || obj.center === 'true');
				});

				if (hasValue(centeredmarker)) {
					log('centeredmarker:', centeredmarker);
					map.setCenter(centeredmarker[0].getPosition());
				} else {
					map.setCenter(markers[0].getPosition()); // Use the first marker to center the map.
				}
			}
		} else if (!settings.MapOptions.center) {
			map.setCenter(bounds.getCenter());
		}

		if (settings.GeoLocation) {
			geoLocation(map);
		}
	};

	var setInfoWindow = function (marker, markerData) {
		if (markerData.infoWindowContent) {
			var infowindow = new google.maps.InfoWindow({
				content: markerData.infoWindowContent
			});
			marker.addListener('click', function () {
				infowindow.open(map, marker);
			});
		} else if (markerData.CustominfoWindowContent) {
			var customInfowindow = markerData.CustominfoWindowContent;
			google.maps.event.addListener(marker, 'click', function () {
				var ciw = document.querySelector('#simplegmaps-c-iw');
				if (ciw !== null) {
					ciw.parentNode.removeChild(ciw);
				}
				el.insertAdjacentHTML('afterend', '<div id="simplegmaps-c-iw"></div>');
				document.querySelector('#simplegmaps-c-iw').innerHTML = customInfowindow;
				document.querySelector('#simplegmaps-c-iw .close').addEventListener('click', function (event) {
					event.preventDefault();
					var ciw = document.querySelector('#simplegmaps-c-iw');
					if (ciw !== null) {
						ciw.parentNode.removeChild(ciw);
					}
				});
			});
		}
		return marker;
	};


	// Asynchronous method to fetch latitude and longitude from address
	var getPosition = function (markerObj, callback) {
		if (hasValue(markerObj.latlng)) {
			callback(parseLatLng(markerObj.latlng));
		} else if (hasValue(markerObj.address)) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address': markerObj.address
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					callback(results[0].geometry.location);
				}
			});
		}
	};

	var createMarkerIcon = function (icon, icon2x, callback) {
		var imageElement = new Image();

		// At least imagepath must be assigned. Return null if undefined.
		if ((icon === null && icon2x === null) || (icon === '' && icon2x === '')) {
			callback(null);
		} else {
			if (window.devicePixelRatio > 1.5) {
				if (typeof icon2x !== null && icon2x !== '') {
					imageElement.onload = function () {
						var markerIcon = {
							url: icon2x,
							size: new google.maps.Size(imageElement.naturalWidth / 2, imageElement.naturalHeight / 2),
							scaledSize: new google.maps.Size((imageElement.naturalWidth / 2), (imageElement.naturalHeight / 2)),
							origin: new google.maps.Point(0, 0),
						};

						callback(markerIcon);
					};
					imageElement.src = icon2x;
				} else {
					if (typeof icon !== null && icon !== '') {
						imageElement.onload = function () {
							var markerIcon = {
								url: icon,
								size: new google.maps.Size(imageElement.naturalWidth, imageElement.naturalHeight),
							};

							callback(markerIcon);
						};
						imageElement.src = icon;
					} else {
						callback(null);
					}
				}
			} else {
				if (typeof icon !== null && icon !== '') {
					imageElement.onload = function () {
						var markerIcon = {
							url: icon,
							size: new google.maps.Size(imageElement.naturalWidth, imageElement.naturalHeight),
						};

						callback(markerIcon);
					};
					imageElement.src = icon;
				} else {
					callback(null);
				}
			}
		}
	};

	// Zooms map enough to fit all markers. But not too much. Just enough to be perfect!
	//
	// Array: markers
	var zoomToFitBounds = function () {
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
	};

	// Takes a string with latlng in this format "55.5897407,13.012268899999981" and makes it into a latlng object
	var parseLatLng = function (latlngString) {
		var bits = latlngString.split(/,\s*/);
		var latlng = new google.maps.LatLng(parseFloat(bits[0]), parseFloat(bits[1]));
		return latlng;
	};

	var hasClass = function (element, classname) {
		if (typeof element.classList !== 'undefined' && element.classList.contains(classname)) {
			return true;
		} else {
			return false;
		}
	};

	var hasValue = function (input) {
		if (typeof input !== 'undefined' && input !== null && input !== '' && input.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	var isAndroid = function () {
		if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
			return true;
		} else {
			return false;
		}
	};

	var isIOS = function () {
		if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
			return true;
		} else {
			return false;
		}
	};

	var isBlackBerry = function () {
		if (navigator.userAgent.match(/BlackBerry/i)) {
			return true;
		} else {
			return false;
		}
	};

	var isWindowsPhone = function () {
		if (navigator.userAgent.match(/Windows Phone/i)) {
			return true;
		} else {
			return false;
		}
	};

	var toggleTrafficLayer = function () {
		if ((trafficLayer) && (trafficLayer.map !== null)) {
			trafficLayer.setMap(null);
		} else {
			trafficLayer = new google.maps.TrafficLayer();
			trafficLayer.setMap(map);
		}
	};

	var toggleTransitLayer = function () {
		if ((transitLayer) && (transitLayer.map !== null)) {
			transitLayer.setMap(null);
		} else {
			transitLayer = new google.maps.TransitLayer();
			transitLayer.setMap(map);
		}
	};

	var toggleBicycleLayer = function () {
		if ((bicycleLayer) && (bicycleLayer.map !== null)) {
			bicycleLayer.setMap(null);
		} else {
			bicycleLayer = new google.maps.BicyclingLayer();
			bicycleLayer.setMap(map);
		}
	};

	var geoLocation = function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(pos);
			}, function () {
				geolocationExceptionHandler(true);
			});
		} else {
			// Browser doesn't support Geolocation
			geolocationExceptionHandler(false);
		}
	};

	var geolocationExceptionHandler = function (errorFlag) {
		if (errorFlag) {
			console.console.warn('SimpleGMaps: The Geolocation service failed.');
		} else {
			console.console.warn('SimpleGMaps: Your browser doesn\'t support geolocation.');
		}
	};
	/**
	 * Callback hooks.
	 * Usage: In the defaults object specify a callback function:
	 * hookName: function() {}
	 * Then somewhere in the plugin trigger the callback:
	 * hook('hookName');
	 */
	var hook = function (hookName) {
		if (settings[hookName] !== undefined) {
			// Call the user defined function.
			// Scope is set to the jQuery element we are operating on.
			settings[hookName].call(el);
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function (defaults, options) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	var log = function (message, data, type) {
		// Change log type if provided, else default to log
		type = typeof type !== 'undefined' ? type : 'log';

		// Check if debug is enabled
		if (settings.debug) {

			// Check for console
			if (window.console) {

				// Check for provided data
				if (typeof data !== 'undefined' && data !== null && data.length > 0) {
					console[type](message, data);
				} else {
					console[type](message);
				}
			}
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	simplegmaps.destroy = function () {

		// If plugin isn't already initialized, stop
		if (!settings) {
			return;
		}

		// Remove init class for conditional CSS
		document.documentElement.classList.remove(settings.initClass);

		// @todo Undo any other init functions...

		// Remove event listeners
		document.removeEventListener('click', eventHandler, false);

		// Reset variables
		settings = null;
		eventTimeout = null;
		hook('onDestroy');
	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options§ User settings
	 */
	simplegmaps.init = function (options) {
		// feature test
		if (!supports) {
			return;
		}

		// Destroy any existing initializations
		simplegmaps.destroy();

		// Merge user options with defaults
		settings = extend(defaults, options || {});

		el = document.querySelector(settings.container);

		if (settings.MapOptions.center) {
			settings.MapOptions.center = parseLatLng(settings.MapOptions.center);
		}

		if (!settings.MapOptions.zoom) {
			settings.MapOptions.zoom = 4;
		}

		drawMap();
		log(settings);

		// Unless there is a datasource specified, read markers from HTML markup
		log('init');
		if (settings.jsonsource === false) {
			log('getMapMarkersFromMarkup');
			getMapMarkersFromMarkup(function (done) {
				placeMarkers();
			});
		} else {
			log('getMapMarkersFromJSON');
			getMapMarkersFromJSON(function (done) {
				placeMarkers();
			});
		}


		hook('onInit');
	};

	//
	// Public APIs
	//
	simplegmaps.Markers = {
		get: function() {
			return markers;
		}
	};

	simplegmaps.Map = {
		get: function() {
			return map;
		}
	};

	simplegmaps.Directions = {
		travelMode: {
			get: function () {
				return DirectionsRequest.TravelMode;
			},
			set: function (travelMode) {
				DirectionsRequest.TravelMode = travelMode;
			}
		},
		unitSystem: {
			get: function () {
				return DirectionsRequest.UnitSystem;
			},
			set: function (unitSystem) {
				DirectionsRequest.UnitSystem = unitSystem;
			}
		},
		route: function (directionsRequest) {
			DirectionsRequest = extend(DirectionsRequest, directionsRequest || {});
			var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
      });
			directionsDisplay.setMap(map);
			// Writes direction to a panel
      //directionsDisplay.setPanel($(options.routeDirections)[0]);
			directionsService.route(DirectionsRequest, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
		}
	};

	simplegmaps.TrafficLayer = {
		toggle: function () {
			toggleTrafficLayer();
		}
	};

	simplegmaps.TransitLayer = {
		toggle: function () {
			toggleTransitLayer();
		}
	};

	simplegmaps.BicycleLayer = {
		toggle: function () {
			toggleBicycleLayer();
		}
	};

	simplegmaps.GeoLocation = {
		set: function () {
			geoLocation();
		}
	};

	return simplegmaps;
});
