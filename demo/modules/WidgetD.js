(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.WidgetD = factory();
	}
}(this, function () {

	function Widget(viewNode) {
		this.viewNode = viewNode;
		this.init();
	}

	Widget.prototype.init = function() {
		this.viewNode.innerHTML = '<p>Widget D initialized</p>';
	};

	Widget.prototype.destruct = function() {
		this.viewNode.innerHTML = '<p>Widget D destructed</p>';
	};

	return Widget;

}));
