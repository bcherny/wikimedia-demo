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
			console.log ('data', data);

			var title = data.topictitle ? '<span class="title">' + data.topictitle + '</span>' : ''
			  , template = '<li data-id="<%= id %>"><%= title %><%= tree %></li>'
			  , branches = toTree(data.responses);

			console.log('tree', branches)

			return _.template(template, {
				id: data.id
			  , title: title
			  , tree: branches
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

	// helpers
	
	function toTree (array) {

		var map = {}
		  , tree;

		array.forEach(function (datum) {

			datum.children = [];
			map[datum.id] = datum;

			if (datum.parentid === 0) {
				tree = datum;
			} else {
				map[datum.parentid].children.push(datum);
			}
			
		});

		return tree;

	}


})();