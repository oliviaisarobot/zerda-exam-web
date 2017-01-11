var Ajax = function (){

	this.APIEndpoint = 'http://localhost:3008/';

  this.postFeedback = function(data, callback) {
    this.open('POST', 'exam', data, callback);
  };

  this.getProjects = function(callback) {
    this.open('GET', 'exam', false, callback);
  };

	this.open = function(method, resource, data, callback) {
		var xhr = new XMLHttpRequest();
		data = (data) ? data : null;
		xhr.open( method, this.APIEndpoint + resource )

		if( method !== 'DELETE' ) {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}

		xhr.send( JSON.stringify(data) );
		xhr.onreadystatechange = function (rsp) {
			if( xhr.readyState === XMLHttpRequest.DONE ) {
				callback( JSON.parse(xhr.response) );
			}
		}
	};
};
