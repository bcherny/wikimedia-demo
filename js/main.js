/* global $, _, define, require, exports, module */
;(function(){

	"use strict";

	var config = {
		element: document.body,
		url: 'data.json'
	};

	var template = {

		topic: function (data) {
			console.log (data);

			return ''
		},

		tree: function (html) {

			return '<ul class="tree">' + html + '</ul>';

		}

	};

	function process (data) {

		var html = template.tree(
			_.reduce(data.topics, function (accumulator, datum) {
				return accumulator += template.topic(datum);
			}, '')
		);

		config.element.innerHTML += html;

		console.log (html);

	}

	function error (err) {
		console.error(err);
	}


	function initialize() {

		// fetch data
		$.ajax(config.url)
		.done(process)
		.fail(error);

	}

	initialize();


})();