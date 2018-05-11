var wd = require('wd'),
    chai = require('chai'),
    expect = chai.expect,
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid-js');

var VARS = {};

// This assumes that selenium is running at http://127.0.0.1:4444/wd/hub/
var noop = function() {},
    b = wd.promiseChainRemote();

describe('Max app functional testing', function() {

  this.timeout(60000);

  it('Coordinator care must be able to send msgs to a patient', function(done) {

    b.chain(function(err) {
      done(err);
    })
    .init({
      browserName: 'firefox'
    })
    .get("http://localhost:3000/")
    .elementById("//div[@id='app']/div/div/div[2]/div/form/div[1]/div/input", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "coordinator", noop);
      });
    })
    .elementById("//div[@id='app']/div/div/div[2]/div/form/div[2]/div/input", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "coordinator", noop);
      });
    })
    .elementById("//div[@id='app']//button[.='Submit']", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementById("//div[@id='app']//td[.='Zara L']", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementById("//div[@class='center']/div/div[2]/div[1]/div[2]/div[1]/div[2]/p/i", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByCssSelector("textarea", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "appointment assigned to sunil kumar", noop);
      });
    })
    .elementById("//div[6]/div/div/div/div[1]/div[2]/div/div[2]/i", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .close(function(err) {
      done(err);
    });

  });
});

afterEach(function() {
  b.quit();
});
