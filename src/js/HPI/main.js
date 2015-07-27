/**
 * @requires HBS
 */
(function() {
	/**
	 * @exports HPI.main
	 */
	var module = {};

	/**
	 * Global init code for the whole application
	 */
	module.init = function() {
		console.log('Hi from main.init()');
	};

	/**
	 * Initialize the app and run the bootstrapper
	 */
	$(document).ready(function() {
		module.init();
		HBS.initPage();
	});
	HBS.namespace('HPI.main', module);
}());
