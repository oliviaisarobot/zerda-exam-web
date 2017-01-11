'use strict';

var test = require('tape');
var validate = require('./validator.js');

test('validator accepts valid email, a scale of 15 and positive feedback', function (t) {
  t.equal(validate.run('splendid incredible ultimate experience', '15', 'email@email.com'), true);
  t.end();
})

test('validator rejects unfilled email, a scale of 15 and positive feedback', function (t) {
  t.equal(validate.run('splendid incredible ultimate experience', '15', ''), false);
  t.end();
})

test('validator rejects valid email, a scale of 9 and positive feedback', function (t) {
  t.equal(validate.run('splendid incredible ultimate experience', '9', 'email@email.com'), false);
  t.end();
})

test('validator rejects valid email, a scale of 100 and feedback with fewer than 3 positive words', function (t) {
  t.equal(validate.run('splendid incredible experience', '100', 'email@email.com'), false);
  t.end();
})

test('validator rejects invalid email, a scale of 100 and positive feedback', function (t) {
  t.equal(validate.run('splendid incredible ultimate experience', '100', 'emailemailcom'), false);
  t.end();
})

test('validator rejects valid email, a negative scale and positive feedback', function (t) {
  t.equal(validate.run('splendid incredible ultimate experience', '-10', 'emailemailcom'), false);
  t.end();
})
