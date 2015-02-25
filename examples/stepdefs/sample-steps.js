require('./common-steps.js');

When(/^I use getElementSize\(\) on the element "([^"]*)"$/, function(className, done) {
    this.driver
        .getElementSize(className, function(err, result) {
            expect(err === null, 'command getElementSize() returns with an error').to.be.ok;
            tmpResult = result;
            done();
        });
});

When(/^I use getTitle\(\) to get the title of this website$/, function(done) {
    this.driver
        .getTitle(function(err, title) {
            expect(err === null, 'command getTitle() returns with an error').to.be.ok;
            tmpResult = title;
            done();
        });
});

When(/^I use getElementCssProperty\(\) to get the "([^"]*)" attribute of an element with "([^"]*)" "([^"]*)"$/, function(attribute, findBy, cssSelector, done) {
    this.driver
        .getElementCssProperty(findBy, cssSelector, attribute, function(err, result) {
            expect(err === null, 'command getElementCssProperty() returns with an error').to.be.ok;
            tmpResult = result;
            done();
        });
});

Then(/^I should get a width of "$NUM" and height of "$NUM"$/, function(width, height, done) {
    expect(+width).to.be.within(tmpResult.width-1,tmpResult.width);
    expect(+height).to.eql(tmpResult.height);
    done();
});

Then(/^the command should return "([^"]*)"$/, function(result, done) {
    expect(tmpResult == result , ' result of command is "'+ tmpResult + '" but should be "'+ result).to.be.ok;
    done();
});


Given(/^I enter the login credentials. Username: "([^"]*)" and Password: "([^"]*)"/, function(username, password, done) {
    this.driver.setValue('#username', username);
    this.driver.setValue('#password', password);
    this.driver.buttonClick('#Login', done);
});