/* global $, _, define, require, exports, module */
;(function(){

	"use strict";

	var config = {
		element: document.body,
		url: 'data.json'
	};

	var template = {

		comment: function (data) {

			console.log ('data', data);

			var author = data.author ? '<span class="author"><a href="#">' + data.author + '</a></span>' : ''
			  , date = data.age ? '<span class="date">' + pretty(+new Date - data.age) + '</span>' : ''
			  , comment = data.posttext ? '<span class="comment">' + data.posttext + '</span>' : ''
			  , template = '<li data-id="<%= id %>"><%= author %><%= date %><%= comment %>';

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
			  , branches = arrayToTree(data.responses)
			  , branchesHtml = treeToHtml(branches);

			console.log('tree', branches);

			return _.template(template, {
				id: data.id
			  , title: title
			  , tree: branchesHtml
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
	
	function treeToHtml (tree) {

		var html = '';

		_recurse(tree);

		return html;

		function _recurse (branch) {

			var children = branch.children;

			html += template.comment(branch);

			if (children.length) {
				html += '<ul>';
				_.each (children, _recurse);
				html += '</ul>';
			} else {
				html += '</li>';
			}
		}

	}
	
	function arrayToTree (array) {

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