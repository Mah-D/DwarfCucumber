var Module = require('./Module');

var Login = View.extend({
    login: View.chain(function(username, password, done) {
        var me = this;
        
        me._validateAndFail(username, password, me.driver, me.url);
        
        me.username = username;
        me.password = password;

        me.driver
            .setValue('[name="j_username"]', username)
            .setValue('[name="j_inp_password"]', password)
            .buttonClick('#loginbutton')
            .waitFor('.op-logo', function(err) {
                var module = Module.create({ driver: me.driver, url: me.url });
                done(err, module);
            });
    })
});

module.exports = Login;