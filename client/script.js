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

    var response = 'error';

    ajax.postFeedback(input, function(res) {
      resultBox.className = 'show';
      status.className = 'show';
      response = res.status;
      console.log(response);
      if (response === 'ok') {
        ajax.getProjects(function(res){
          projects = res.projects;
          status.className = 'hide';
          displayResult();
        })
      } else {
        status.innerHTML = 'Oooops! Could you have made a mistake? Hint: make sure your feedback is overwhelmingly positive, and your e-mail address contains a @ and a . character as well. Don\'t leave any fields unfilled.'
      }
    });

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
