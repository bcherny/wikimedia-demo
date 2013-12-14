/* global $, define, require, exports, module */
;(function(){

	"use strict";

	var config = {
		url: 'data.json'
	};


	// fetch data
	$.ajax({
		url: config.url
	})
	.done(function(data) {
		console.log ('data', data);
	})
	.fail(function(err) {
		console.error(err);
	});


})();