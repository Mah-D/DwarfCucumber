var Wall = require('./wall.js');
var wall;
Given("$NUM green vases are standing on the wall", function(number_of_vases, next) {
    wall = new Wall(number_of_vases);
    next();
});

When("$NUM green vase accidentally falls", function(number_of_falling_vases, next) {
    wall.fall(number_of_falling_vases);
    next();
})

Then("there (?:are|are still) $NUM green vases standing on the wall", function(number_of_vases, next) {
    expect(+number_of_vases).to.equal(wall.items);
    next();
});
