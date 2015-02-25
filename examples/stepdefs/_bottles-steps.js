var Wall = require('./wall.js');
var wall;

Given("$NUM green bottles are standing on the wall", function(number_of_bottles, next) {
    wall = new Wall(number_of_bottles);
    next();
});

When("$NUM green bottle accidentally falls", function(number_of_falling_bottles, next) {
    wall.fall(number_of_falling_bottles);
    next();
});

Then("there (?:are|are still) $NUM green bottles standing on the wall", function(number_of_bottles, next) {
    expect(number_of_bottles).to.eql(wall.items);
    next();
});
