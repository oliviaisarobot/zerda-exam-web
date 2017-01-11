'use strict';

var validate = {
  run: function(feedback, scale, email) {
    var result = false;

    function checkWords(input) {
      var result = false;
      var counter = 0;

      var allowed = ["amazing", "awesome", "blithesome", "excellent", "fabulous", "fantastic", "favorable", "fortuitous", "great", "incredible", "ineffable", "mirthful", "outstanding", "perfect", "propitious", "remarkable", "smart", "spectacular", "splendid", "stellar", "stupendous", "super", "ultimate", "unbelievable", "wondrous"];

      allowed.forEach(function(e) {
        if (input.includes(e)) {
          counter++;
          if (counter >= 3) {
            result = true;
          }
        }
      });

      return result;
    }

    if (checkWords(feedback) && parseInt(scale) >= 10 && email.includes("@", ".") && feedback != "" && scale != "" && email != "") {
      result = true;
    }

    return result;
  }
};

module.exports = validate

// console.log(validate.run('amazing awesome perfect text', 'lala', 'this@this.com')); // false because of scale
// console.log(validate.run('amazing awesome perfect text', '3', 'thisthis.com')); // false because of email and scale
// console.log(validate.run('amazing awesome perfect text', '13', 'thisthis.com')); // false because of email and scale
// console.log(validate.run('perfect text', '13', 'thi@sthis.com')); // false because of feedback
// console.log(validate.run('amazing awesome perfect text', '10', 'this@this.com')); // true
