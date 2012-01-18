# SpringbokJS

## Introduction

SpringbokJS aims to simplify the installation of modules in a "progressive enhancement" style. It is not a script or module loader, yet it instantiates modules and binds them to HTML elements. It partners great with traditional `<script src="">` loading, script or (AMD) module loaders.

Note: This project uses the word "module", but you could read "(web) widget", "gadget" or even "controller" just as well.

## API

The Springbok binds the module to the specified HTML element:

	<div data-module="myNamespace.myWidget">
		<p>Initial widget content</p>
	</div>

This `<div>` is send to the constructor of your module, and should become the view root of the widget.

By default, this is what your application needs to call to install widgets referred to in the HTML:

	springbok.initModules();

In most cases the "DOMContentLoaded" (or "load") event would be appropriate. You can also install widgets one at a time:

	springbok.initModule(viewNode, moduleName);

To uninstall modules you would use:

	springbok.destructModules();

This will call the `destruct()` method on each of the modules it finds (which makes the module itself responsible for cleaning up).

## AMD

SpringbokJS is compatible with AMD setups. This means you can also write HTML like this:

	<div data-module="modules/myWidget"></div>

When the `define` function is detected (i.e. AMD is supported), it will use it to load your AMD compliant modules.

## Installation

* Include springbok.js
* Put `data-module` with module references in HTML
* Make sure module references return objects that can be instantiated using `new`

## Configuration options

	<script>
		window.springbok = {
			autoload: true,
			context: document.getElementById('container'),
			anchor: 'data-widget',
			loader: Duck.loadScript
		}
	</script>

**autoload**: have Springbok initialize the modules as soon as it is running (default: `false`)

**context**: the DOM element within modules are looked after (default: `document.body`)

**anchor**: the attribute (default: `data-module`)

**loader**: (usually not recommended) your custom script loader will be called in case both the traditional module definition and an AMD compliant loader are unavailable; it will be called with arguments (1) value of `anchor` (reference to module) and (2) internal callback to install module when script is loaded (default: `undefined`)
