// var Yadda = require('yadda');
// var English = Yadda.localisation.English;
// var dictionary = require('./dictionary');
// var Wall = require('./wall');
// var assert = require('assert');
// 
// module.exports = (function() {
// 
//     var library = English.library(dictionary)
// 
//     // Define common steps here
// 
//     return library;
// })();
var db = require('./db-operations.js');

Given(/^I go on the website "([^"]*)"$/, function(url, done) {
    //db.addUser('supportops@operative.com', 'some password');
    this.driver.url(url, done);
});

