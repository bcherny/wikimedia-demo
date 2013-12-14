/* global $, _, define, require, exports, module */
;(function(){

	"use strict";

	var config = {
		element: document.body,
		url: 'data.json'
	};

	var template = {

		comment: function (data) {

			var author = data.author ? '<span class="author"><a href="#">' + data.author + '</a></span>' : ''
			  , date = data.date ? '<span class="date">' + data.age + '</span>' : ''
			  , comment = data.comment ? '<span class="comment">' + data.posttext + '</span>' : ''
			  , template = '<li data-id="<%= id %>"><%= author %><%= date %><%= comment %></li>';

			return _.template(template, {
				id: data.id
			  , author: author
			  , date: date
			  , comment: comment
			});

		},

		topic: function (data) {
			console.log (data);

			var title = data.topictitle ? '<span class="title">' + data.topictitle + '</span>' : ''
			  , template = '<li><%= title %></li>';

			return _.template(template, {
				title: title
			});
		},

		tree: function (html) {

			return '<ul class="tree">' + html + '</ul>';

		}

	};

	function render (data) {

		var html = template.tree(
			_.reduce(data.topics, function (accumulator, datum) {
				return accumulator += template.topic(datum);
			}, '')
		);

		config.element.innerHTML += html;

	}

	function error (err) {
		console.error(err);
	}


	function initialize() {

		// fetch data
		$.ajax(config.url)
		.done(render)
		.fail(error);

	}

	initialize();


})();