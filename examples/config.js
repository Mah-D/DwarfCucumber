module.exports = function(dc) {

    dc.setConfig({
        "browsers": [
            {
                "desiredCapabilities": {
                    "browserName": "chrome"
                },
                "driver": "webdriver"
            },
            {
                "desiredCapabilities": {
                    "browserName": "safari"
                },
                "driver": "webdriver"
            }
        ],
        "reporters": [
            "console",
            "html",
            {
                "name": "testrail",
                "host": "http://testrail.nyc.operative.com",
                "username": "api@operative.com",
                "password": "Oper@t1ve"
            }
        ]
    });    
};