# dwarf-cucumber
 
Dwarf-Cucumber(DC) is Tiny and Semi-Automatic BDD Cucumber. DC is based on Guerkin.

Requirements:

[Yadda](https://github.com/acuminous/yadda): Advanced BDD and Gherkin Given/When/Then  parser.
[Chai](http://chaijs.com): Assertion library. 
[Selenium](http://docs.seleniumhq.org/projects/webdriver/): Webdriver based browser automation.
[Mocha](http://visionmedia.github.io/mocha/): BDD Testing framework.  

## Example

Create the following directory structure for your test project:

```
tests
├─ features
└─ steps
```
#### 1st define a feature

create the file `features/login.feature` and add the following content to it.

 ```
Feature: Login
  In order to access my account on Github
  As a registered user
  I need to be able to log in

  Scenario: Successful login

    Given I am a registered user
    When I go to github.com
    And I enter my credentials and submit the login form
    Then I should see a welcome page

```

#### Automated Step-Template generation

From the tests directtory
```
node ./bin/dc.js generate tests/features/login.feature
```

An wizard will direct you to choose the step language path and weather you want to save it or run it through terminal
```
Feature file: tests/functional/features/todomvc.feature
Press Ctrl+C to abort

Choose output
  1. javascript (default)
  2. coffeescript
  ›  javascript

Specify the feature file language
  1. English (default)
  2. French
  3. Norwegian
  4. Polish
  5. Spanish
  ›  English

Generate output
  1. Display output (default)
  2. Save to a file
  ›  Save to a file

Specify a path:
  tests/steps/login-steps.js (default)
  › Saving to tests/steps/login-steps.js

```
A step template according to the feature will be generated for you:

The generated step definition file should look like this:
```javascript
// Given I am a registered user
Given(/I am a registered user/, function(done) {
    done();
});

// When I go to github.com
When(/I go to github.com/, function(done) {
    done();
});

// And I enter my credentials and submit the login form
And(/I enter my credentials and submit the login form/, function(done) {
    done();
});

// Then I should see a welcome page
Then(/I should see a welcome page/, function(done) {
    done();
});

```
Here you find an edited and ready to deploy version of the above step:

```
var browser = driver.client;
// Given I am a registered user
Given(/I am a registered user/, function(done) {
    done();
});

// When I go to github.com
When(/I go to github\.com/, function(done) {
    browser.get('https://github\.com/login', done)

});

// And I enter my credentials and submit the login form
And(/I enter my credentials and submit the login form/, function(done) {
    var username = 'username';
    var password = 'password';

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
```
#### Runing dwarf-cucumber

It's all done! rn `dc.js`  from the `tests` directory.

```
node ./bin/dc.js run
```

If you do everything right accordingly, you must get the following colored output in terminal:

```
 Found 1 feature
----------------------------------------------------------
  Feature: Login  #tests/features/login.feature
  Tested in firefox

    Scenario: Successful login
       ✓ Given I am a registered user
       ✓ When I go to github.com
       ✓ And I enter my credentials and submit the login form
       ✓ Then I should see a welcome page

  ---------- ----------- ------------- -------- --------- -------- 
  Features   Scenarios   Total Steps   Passed   Skipped   Failed 
  ---------- ----------- ------------- -------- --------- --------
  1          1           4             ✓ 4      0         0      
                                                                  
  Completed 1 feature in 1.37s

```
If you want to run dc in a browser like firefix first you must run Selenium thrugh `wdlauncher.js` :
```
node ./bin/wdlauncher.js start --auto-install
```
then 

```
node bin/dc.js run -b firefox
```
If you want to get nice html report and navigate through steps and feature:

```
node bin/dc.js run -b firefox --reporters console,html
```
![DC-Report](http://www.mah-d.com/vpri/dc.png)

### DwarfCucumber available commands 
```
  Usage: dc [options] [command]

  Commands:

    run                    run feature tests found in the [target] path
    watch                  watch for file changes in the [target] path, then run feature tests
    generate               generate step definition templates for the specified feature file <path>

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -c, --config <path>         specify an external config file
    -b, --browsers <names>      comma-delimited <names> of local browsers to use (chrome|firefox|ie|safari|phantomjs)
    -m, --match <pattern>       only run features matching <pattern>
    --match-invert              inverts --match results
    -T, --tags <names>          only run feature tests annotated with one of the comma-delimited tag <names>
    -E, --exclude-tags <names>  exclude feature tests annotated with one of the comma-delimited tag <names>
    -t, --timeout <ms>          set per-test timeout in milliseconds [10000]
    -s, --slow <ms>             `slow` test threshold in milliseconds [5000]
    -f, --failfast              stop running tests on the first encoutered failure or timeout
    --test-strategy <name>      `test` runs various tests in parallel. `browser` runs each test against mutiple browsers [test]
    --reporters <names>         comma-delimited report <names> to enable. available options: junit,html
    --report-path <path>        path for the generated reports
    --rerun <path>              rerun failed tests recorded in `failed.dat` from the last test run
    --debug                     enable debug logging
    --log <path>                output a log file to filename

  Run dc [command] --help to see description and available options for a particular command

```

#### Options for the watch command
```
  Usage: watch [options] [path ...]

  Options:

    -h, --help              output usage information
    -d, --watch-delay <ms>  Buffers multiple changes into a single run using a delay in milliseconds [500]
```


### The Selenium Launcher command
```
Usage: wdlauncher [command]

  Commands:

    start                  start the selenium standalone server
    install                install or update missing selenium driver binaries
    status                 display the current available driver binaries

  Options:

    -h, --help       output usage information
    --output <path>  path to the location of the binaries
    -p,--port <num>  optional port for the selenium standalone server
    --auto-install   auto install missing binaries before starting the selenium server
    --overwrite      force download existing binaries
    --debug          enable debug logging
    --log <path>     path including file name to create a file log
```

## Examples

More examples are in [examples](./examples) directory.
