/*! simplegmaps - v2.0 - 2016-01-25
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

	var map;
	var mapdata; // Element copy. Used to read map settings

	// Default settings. zoom and center are required to render the map.
	var defaults = {
		debug: true,
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
		onInit: function () {},
		onDestroy: function () {}
	};


	//
	// Private Methods
	//

	var drawMap = function () {
		mapdata = el.cloneNode(true);
		map = new google.maps.Map(el, settings.MapOptions);
	};

	var getMapData = function () {
		var markers = [];
		var markerList = mapdata.querySelectorAll('.map-marker');
		forEach(markerList, function (markerData, value) {
			var markerOptions = {};

			// Create new marker object
			var marker = new google.maps.Marker({
			    title: markerData.getAttribute('title')
			});

			// Create infowindow object
			if (markerData.querySelector('.map-infowindow')) {
				var infowindow = new google.maps.InfoWindow({
					content: markerData.querySelector('div.map-infowindow').parentElement.innerHTML
				});
				marker.addListener('click', function() {
					infowindow.open(map, marker);
			  });
			} else if (markerData.querySelector('.map-custom-infowindow')) {
				var customInfowindow = markerData.querySelector('.map-custom-infowindow').parentElement.innerHTML;
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

			// Set marker position
			getPosition(markerData, function(markerposition) {
				markerOptions.position = markerposition;

				var imageurl = markerData.getAttribute('data-icon');
				var imageurl2x = markerData.getAttribute('data-icon2x');
				createMarkerIcon(imageurl, imageurl2x, function(markerIcon) {
					markerOptions.icon = markerIcon;
					//markers.push(marker);
					marker.setOptions(markerOptions);
					marker.setMap(map);

				});
			});
		});
	};


	// Asynchronous method to fetch latitude and longitude from address
	var getPosition = function (markerData, callback) {
		if (markerData.hasAttribute('data-latlng')) {
			callback(parseLatLng(markerData.getAttribute('data-latlng')));
		} else if (markerData.hasAttribute('data-address')) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': markerData.getAttribute('data-address')}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					callback(results[0].geometry.location);
				}
			});
		}
	};

	var createMarkerIcon = function (imagepath, x2imagepath, callback) {
		var imageElement = new Image();

		// At least imagepath must be assigned. Return null if undefined.
		if (typeof imagepath === 'undefined' || imagepath === null) {
			callback(null);
		} else {
			if (window.devicePixelRatio > 1.5) {
				if (typeof x2imagepath !== 'undefined' || imagepath === null) {
					imageElement.onload = function() {
						var markerIcon = {
							url: x2imagepath,
							size: new google.maps.Size(imageElement.naturalWidth / 2, imageElement.naturalHeight / 2),
							scaledSize: new google.maps.Size((imageElement.naturalWidth / 2), (imageElement.naturalHeight / 2)),
							origin: new google.maps.Point(0,0),
						};

						callback(markerIcon);
					};
					imageElement.src = x2imagepath;
				} else {
					imageElement.onload = function() {
						var markerIcon = {
							url: imagepath,
							size: new google.maps.Size(imageElement.naturalWidth, imageElement.naturalHeight),
						};

						callback(markerIcon);
					};
					imageElement.src = imagepath;
				}
			} else {
				imageElement.onload = function() {
					var markerIcon = {
						url: imagepath,
						size: new google.maps.Size(imageElement.naturalWidth, imageElement.naturalHeight),
					};

					callback(markerIcon);
				};
				imageElement.src = imagepath;
			}
		}
	};

  // Zooms map enough to fit all markers. But not too much. Just enough to be perfect!
  //
  // Array: markers
  var zoomToFitBounds = function (map, markers) {
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
  var parseLatLng = function(latlngString) {
    var bits = latlngString.split(/,\s*/);
    var latlng = new google.maps.LatLng(parseFloat(bits[0]), parseFloat(bits[1]));
    return latlng;
  };

  var guid = function() {
    var strguid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return strguid;
  };

  var drawRoute = function(from) {
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
  };

  var setTravelMode = function (travelmode) {
    var length = TravelModes.length;
    currentTravelmode = options.defaultTravelMode;
    for (var i = 0; i < length; i++) {
      if (TravelModes[i] === travelmode) {
        currentTravelmode = travelmode;
      }
    }
  };

  var setupRouting = function () {
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
  };

	var hasClass = function (element, classname) {
		if (typeof element.classList !== 'undefined' && element.classList.contains(classname)) {
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
				if(typeof data !== 'undefined' && data !== null && data.length > 0) {
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
	 * @param {Object} options User settings
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
		getMapData();
		hook('onInit');
	};

	simplegmaps.publicMethod = function () {

	};
	//
	// Public APIs
	//

	return simplegmaps;
});
