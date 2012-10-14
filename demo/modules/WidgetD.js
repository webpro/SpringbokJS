(function(define) {

	define([], function() {

		function Widget(viewNode) {
			this.viewNode = viewNode;
			this.init();
		};

		Widget.prototype.init = function() {
			this.viewNode.innerHTML = '<p>Widget D initialized</p>';
		};

		Widget.prototype.destruct = function() {
			this.viewNode.innerHTML = '<p>Widget D destructed</p>';
		};

		return Widget;
	});

})(typeof define !== 'undefined' ? define : function(deps, factory) { this.WidgetD = factory(); });
