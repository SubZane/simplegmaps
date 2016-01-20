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
	// Default settings
	var defaults = {
		onInit: function () {},
		OnAttachEvents: function () {},
		onDestroy: function () {}
	};


	//
	// Private Methods
	//

	var attachEvents = function () {
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
    $latlng = new google.maps.LatLng(parseFloat(bits[0]), parseFloat(bits[1]));
    return $latlng;
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

		attachEvents();

		hook('onInit');
	};

	simplegmaps.publicMethod = function () {

	};
	//
	// Public APIs
	//

	return simplegmaps;
});
