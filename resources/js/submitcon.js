'use strict';
//checked
const post = function(value){
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/postContent');
	xhrPost.setRequestHeader('Content-Type', 'application/json');
	

	xhrPost.send(JSON.stringify({
		content: value
	}));
};


document.querySelector('#twitter-share-button')
	.addEventListener('submit', function(evt){
		evt.preventDefault();
		let value = document.querySelector('#stateResult').innerHTML;
        const post_string = 'Crime Checker Shows ----'.concat(value);
		post(post_string);
	});