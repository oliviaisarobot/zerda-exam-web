'use strict';

var Proccess = function() {
  var submitButton = document.querySelector('#submit');
  var resultBox = document.querySelector('#result');
  var projects = [];
  var ajax = new Ajax();

  function sendForm() {
    var feedback = document.querySelector('#feedback');
    var scale = document.querySelector('#scale');
    var email = document.querySelector('#email');
    var status = document.querySelector('#status');

    var input = {"feedback": feedback.value, "scale": parseInt(scale.value), "email": email.value};

    ajax.postFeedback(input, function() {
      resultBox.className = 'show';
      status.className = 'show';
    });

    ajax.getProjects(function(res){
      projects = res.projects;
      status.className = 'hide';

      displayResult();
    })
  };

  function displayResult() {
    var projectList = document.querySelector('ol');

    projects.forEach(function(e) {
      var li = document.createElement('li');
      li.innerHTML = e;
      projectList.appendChild(li);
    })
  };

  return {
    init: function() {
      submitButton.addEventListener('click', sendForm);

      window.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
          displayResult();
        }
      })

    }
  }

}();
