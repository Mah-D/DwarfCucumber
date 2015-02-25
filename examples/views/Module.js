var Module = View.extend({
    goto: View.chain(function(module, done) {
        var me = this;
        me._validateAndFail(module, me.driver, me.url);

        me.module = module;

        me.driver.url(me.url + '/logon.do?topNav=' + module, done)
    }),
    ready: View.chain(function(done) {
        // wait for the loading mask element to fadeout and get removed
        check.call(this, 5000, done);
    })
});

function check(timeout, done) {
    this.driver
        .timeouts('script', timeout)
        .executeAsync(function (cb) {
            var checker = function() {
                var found = !document.getElementById('loading');
                if(found) {
                    cb(found);
                } else {
                    setTimeout(checker, 100);
                }
            };
            checker();
        }, done);
}

module.exports = Module;
