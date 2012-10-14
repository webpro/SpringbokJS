(function(define, window, document) {

    define([], function() {

		var userConfig = window.springbok || {};

		var config = {
			context: userConfig.context || document.body,
			anchor: userConfig.anchor || 'data-module',
			loader: userConfig.loader || undefined,
			global: window
		};

		/**
		 * We need our own define() function when an AMD compliant loader
		 * is unavailable; mainly to resolve the module name.
		 *
		 * If all else fails, we can try to call some custom script loader,
		 * and see if the module is available afterwards.
		 */

		var require = config.global.require || function(moduleNames, callback, flag) {

			var modulePrototype = resolveFromString(moduleNames[0]);

			if(modulePrototype) {

				callback.call(config.global, modulePrototype);

			} else if(config.loader && typeof flag === 'undefined') {

				config.loader.call(config.global, moduleNames[0], function() {

					require(moduleNames, callback, true);

				});

			}
		};

		/**
		 * Tries to resolve a string to an existing object/property.
		 * E.g. the string "foo.bar" returns the window.foo.bar object (if it exists).
		 * When '/' is found, it uses only what comes after the last '/'.
		 *
		 * @param stringReference
		 */

		var resolveFromString = function(stringReference) {

			var spaces = stringReference.split('/').pop().split('.'), currentNode = config.global;
			for(var i = 0, l = spaces.length; i < l; i++) {
				if(typeof(currentNode[spaces[i]]) === 'undefined') {
					return null;
				}
				currentNode = currentNode[spaces[i]];
			}
			return currentNode === config.global ? null : currentNode;
		};

		/**
		 * Query the DOM for elements with the specified attribute,
		 * and instantiate the module using this attribute value.
		 *
		 * @param {object} context
		 */

		var initModules = function(context, anchor) {

			anchor = anchor || config.anchor;
			context = context || config.context;

			var viewNodeList = context.querySelectorAll('*['+anchor+']');

			var moduleNames, viewNodes = Array.prototype.slice.call(viewNodeList);

			viewNodes.forEach(function(viewNode) {
				moduleNames = viewNode.getAttribute(anchor).split(',');
				initModule(viewNode, moduleNames);

			});
		};

		/**
		 * Install a module based on its name and DOM node
		 * by creating a new instance.
		 *
		 * @param {object} viewNode
		 * @param {array} moduleNames
		 */

		var initModule = function(viewNode, moduleNames) {

			if(!viewNode || !moduleNames) {
				return;
			}

			moduleNames.forEach(function(moduleName) {

				require([moduleName], function(modulePrototype) {

					var moduleInstance = new modulePrototype(viewNode);

					if(moduleInstance) {

						viewNode._modules = viewNode._modules || [];
						viewNode._modules.push(moduleInstance);
					}
				});
			});
		};

		var destructModules = function(context, anchor) {

			anchor = anchor || config.anchor;
			context = context || config.context;

			var viewNodeList = context.querySelectorAll('*['+anchor+']');

			var viewNodes = Array.prototype.slice.call(viewNodeList);

			viewNodes.forEach(function(viewNode) {

				if(viewNode._modules && viewNode._modules.length) {

					viewNode._modules.forEach(function(moduleInstance) {

						destructModule(viewNode, moduleInstance);

					});

					viewNode._modules = [];
				}
			});
		};

		var destructModule = function(viewNode, moduleInstance) {

			if(typeof moduleInstance.destruct === 'function') {
				moduleInstance.destruct.call(moduleInstance);
			}
		};

		if(!!userConfig.autoload) {
			initModules();
		};

		return {
			initModules: initModules,
			initModule: initModule,
			destructModules: destructModules
		};

	});

})(typeof define !== 'undefined' ? define : function(deps, factory) { this.springbok = factory(); },
	this, // window
	this.document // document
);
