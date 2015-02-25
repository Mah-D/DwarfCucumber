/*jshint node:true*/
'use strict';

var repl = require('repl');
var vm = require('vm');
var tint = require('../lib/tint');
var DriverFactory = require('../runner/drivers');
var Driver = DriverFactory.get('webdriver');

var driver; // make these accessible at module level

var inspector = module.exports;

inspector.start = function start(config) {

    var profile = {
        "desiredCapabilities": {
            'browserName': config.browser || 'firefox',
            'chromeOptions': {
                args: ['--test-type']
            }
        }
    };

    driver = new Driver({
        session: null,
        options: null,
        profile: profile
    });

    driver.start(function() {
        startRepl(driver);
    });
    
    console.log('  Browser Inspector\n\n');
    showSummary();
};



var AVAILABLE_COMMANDS = ['browser.get(\'\')', '$(\'selector\')', 'browser.elementById(\'\'))', 'element(by.binding(\'\'))', 'element(by.xpath(\'\'))', 'element(by.tagName(\'\'))', 'element(by.className(\'\'))'];

var showSummary = function showSummary() {
        var text = [];
        text = [
            '  Available commands:', 
            '  `browser` - the browser object. e.g. browser.get(\'http://mah-d.com\')', 
            '  `$`       - single css element locator function. e.g. $(\'selector\').type(\'dc[Enter]\')', 
            '  `$$`      - css element list locator function', 
            '  `show`    - use as callback handler to show returned values. e.g. browser.url().then(show)', 
            '  `clear`   - clear the screen', 
            '  `exit`    - exit the inspector', 
            ''
        ];
        console.log(tint.gray(text.join('\n')));
    };

var startRepl = function(driver) {
    var dcRepl = repl.start({
        prompt: 'dc> ',
        ignoreUndefined: true,
        useGlobal: false
        //eval: flowEval
    });
    // set up context properties to be available in the repl session.
    var client = driver.getClient();
    var context = dcRepl.context;

    context.driver = driver;
    context.browser = client;
    //utils.apply(context, client);
    context.$ = client.elementByCss.bind(client);
    context.$$ = client.elementsByCss.bind(client);
    context.show = function show(d) {
        var args = arguments;
        if (args[0] instanceof Error) {
            return console.log('Error:', args[0].message);
        }
        console.log(args[args.length - 1]);
    };
    Object.defineProperties(context, {
        'clear' : {
            get: clear
        },
        'exit': {
            get: function() {
                exit(0);
            }
        },
        'quit': {
            get: function() {
                exit(0);
            }
        },
        'help': {
            get: showSummary
        }
    });

    var origCb = dcRepl.complete;

    dcRepl.complete = function(line, cb) {
        if (line) {
            origCb.apply(this, arguments);
        } else {
            cb(null, [getAvailableCommands(client), '']);
        }
    };

    dcRepl.on('exit', exit);

    process.on('unhandledException', function () {
        driver.stop(function() {
            return process.exit(1);
        });
    });
};

function getAvailableCommands(client) {
    var methods = [], 
        properties = Object.keys(client),
        prop;

    for (var i = 0, len = properties.length; i < len; i++) {
        prop = properties[i];
        if (typeof client[prop] === 'function') {
            methods.push(prop);
        }
    }
    return methods.sort();
}

function exit(exitCode) {
    console.log('Stopping...');
    driver.stop(function () {
        return process.exit(exitCode);
    });
}

function clear() {
    // clear the console
    process.stdout.write('\u001B[2J');
    // Move the cursor to the top
    process.stdout.write('\u001B[f');
}


