function WidgetA(viewNode) {
	this.viewNode = viewNode;
	this.init();
};

WidgetA.prototype.init = function() {
	this.viewNode.innerHTML += '<p>Widget A initialized</p>';
};
