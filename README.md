# SpringbokJS

## Introduction

SpringbokJS installs modules (traditional object or AMD-style) based on HTML attributes.

## API

To install modules:

	springbok.initModules();

Modules are bound to the specified node in the DOM:

	<div data-module="myNamespace.myWidget">
		<p>Initial widget content</p>
	</div>

This `<div>` is send to the constructor of the module (so it can be set as view node).

Modules can also be installed one at a time:

	springbok.initModule(viewNode, moduleName);

To uninstall modules:

	springbok.destructModules();

This will call the `destruct()` method on each of the modules it finds (which makes the module itself responsible for cleaning up).

## AMD

SpringbokJS is compatible with AMD setups:

	<div data-module="modules/myWidget"></div>

Bring your own AMD loader: the `require()` function will be used to load the module.

## Installation

* Include springbok.js
* Put `data-module` with module references in HTML
* Make sure modules are objects that can be instantiated using `new`

## Configuration options

	<script>
		window.springbok = {
			autoload: true,
			context: document.getElementById('container'),
			anchor: 'data-widget',
			loader: Duck.loadScript
		}
	</script>

**autoload**: have Springbok initialize the modules after it is initialized (default: `false`)

**context**: the DOM node within modules are looked after (default: `document.body`)

**anchor**: the attribute referencing module (default: `data-module`)

**loader**: (usually not recommended) your custom script loader will be called in case both the traditional module definition and an AMD compliant loader are unavailable; it will be called with arguments (1) value of `anchor` (reference to module) and (2) internal callback to install module when script is loaded (default: `undefined`)
