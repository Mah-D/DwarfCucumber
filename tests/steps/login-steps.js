var browser = driver.client;
// Given I am a registered user
Given(/I am a registered user/, function(done) {
    done();
});

// When I go to github.com
When(/I go to github\.com/, function(done) {
    browser.get('https://github.com/login', done)
});

// And I enter my credentials and submit the login form
And(/I enter my credentials and submit the login form/, function(done) {
    var username = 'username';
    var password = 'pass';

    browser
        .elementByCss('#login_field').type(username)
        .elementByCss('#password').type(password)
        .elementByCss('input[name="commit"]').click(done)
});

// Then I should see a welcome page
Then(/I should see a welcome page/, function(done) {

    browser.elementByCss('.selected').text(function(err, val) {
        expect(val).to.eql('News Feed');
        done(err);
    });

});