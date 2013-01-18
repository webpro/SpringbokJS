(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['../springbok'], factory);
	} else {
		root.App = factory(root.springbok);
	}
}(this, function (springbok) {

	var d = window.document;

	d.getElementById('init').addEventListener('click', function() {

		springbok.initModules();

	}, false);

	d.getElementById('destruct').addEventListener('click', function() {

		springbok.destructModules();

	}, false);

}));
