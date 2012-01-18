define(function() {

	function Widget(viewNode) {
		this.viewNode = viewNode;
		this.init();
	};

	Widget.prototype.init = function() {
		this.viewNode.innerHTML += '<p>Widget C initialized</p>';
	};

	return Widget;
});
