(function(define, window) {

	define(['springbok'], function(springbok) {

		var d = window.document;

		d.getElementById('init').addEventListener('click', function() {

			springbok.initModules();

		}, false);

		d.getElementById('destruct').addEventListener('click', function() {

			springbok.destructModules();

		}, false);

	});

})(typeof define !== 'undefined' ? define : function(deps, factory) { factory(this.springbok); }, this);
