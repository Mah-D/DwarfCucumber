
var tmpResult = null;

Given(/^I go on the website "([^"]*)"$/, function(url, next) {
    this.driver
        .get(url)
        .then(next);
});

When(/^I use getElementSize\(\) on the element "([^"]*)"$/, function(className, next) {
    this.driver
        .getElementSize(className, function(err, result) {
            expect(err).to.be.null;// === null, 'command getElementSize() returns with an error');
            tmpResult = result;
            next();
        });
});

When(/^I use getTitle\(\) to get the title of this website$/, function(next) {
    this.driver
        .getTitle(function(err, title) {
            expect(err).to.be.null;// === null, 'command getTitle() returns with an error');
            tmpResult = title;
            next();
        });
});

When(/^I use getElementCssProperty\(\) to get the "([^"]*)" attribute of an element with "([^"]*)" "([^"]*)"$/, function(attribute, findBy, cssSelector, next) {
    this.driver
        .getElementCssProperty(findBy, cssSelector, attribute, function(err, result) {
            expect(err).to.be.null;// === null, 'command getElementCssProperty() returns with an error');
            tmpResult = result;
            next();
        });
});

Then(/^I should get a width of "$NUM" and height of "$NUM"$/, function(width, height, next) {
    expect(tmpResult.width).to.be.closeTo(+width, 1); //  == width , 'width of element is ' + tmpResult.width + ' but should be ' + width);
    expect(tmpResult.height).to.equal(+height); // == height, 'height of element is ' + tmpResult.width + ' but should be ' + height);
    next();
});

Then(/^the command should return "([^"]*)"$/, function(result, next) {
    expect(tmpResult).to.equal(result); // == result , ' result of command is "'+ tmpResult + '" but should be "'+ result);
    next();
});
