window.stubGoogleAPIS = function () {
	return window.google = {
		maps: {
			event: {
				addListener: function () {}
			},
			LatLng: function () {},
			MapTypeId: {
				SATELLITE: '',
				HYBRID: ''
			},
			function Map(value) {
				this.mapTypes = {
					set: function () {
						return true;
					}
				};
			},
			Marker: function () {},
			MaxZoomService: function () {
				return {
					getMaxZoomAtLatLng: function () {}
				};
			},
			ImageMapType: function () {},
			Size: function () {},
			Point: function () {},
			places: {
				AutocompleteService: function () {
					return {
						getPlacePredictions: function () {}
					};
				}
			}
		}
	};
};