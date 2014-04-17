var kitUtils = {
	debug: false,

	init: function () {
		if (typeof $('body').data('debug') === 'boolean' && $('body').data('debug') === true) {
			this.debug = true;
		}
		this.episerverIframeCheck();
	},

	isAndroid: function () {
		if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
			return true;
		} else {
			return false;
		}
	},

	isIOS: function () {
		if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
			return true;
		} else {
			return false;
		}
	},

	// Add class to body tag if page is in episerver edit mode
	episerverIframeCheck: function () {
		var isInIframe = (window.location !== window.parent.location) ? true : false;
		if (isInIframe) {
			$('body').addClass('episerver');
		}
	},

	// Adds class .last-child on all elements with :last-child. A fix for IE8
	lastChildFix: function () {
		if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
			$('*:last-child').addClass('last-child');
		}
	},

	log: function (message) {

		// Check if debug is enabled
		if (this.debug) {

			// Check for console
			if (window.console) {
				console.log(message);
			}
		}
	}
};