var MyNamespace = MyNamespace || {};

MyNamespace.WidgetB = function (viewNode) {
	this.viewNode = viewNode;
	this.init();
};

MyNamespace.WidgetB.prototype = {

	init: function() {
		this.viewNode.innerHTML += '<p>Widget B initialized</p>';
	},

	destruct: function() {
		this.viewNode.innerHTML += '<p>Widget B destructed</p>';
	}
};
