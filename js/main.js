/* global $, define, require, exports, module */
;(function(){

	"use strict";

	var config = {
		url: 'data.json'
	};

	function process (data) {

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