var Dialog = View.extend({
    
    getData: View.chain(function(done) {
        var me = this;

        me._validateAndFail(me.driver, me.cls);

        me.driver.getText(me.cls + ' .ext-mb-text', function(err, text) {
            if(err) {
                done(err);
                return;
            }
            me.driver.getText(me.cls + ' .x-window-header-text', function(err, title) {
                if(err) {
                    done(err);
                    return;
                }
                done(null, { title: title, message: text });
            });
        });
    }),

    close: View.chain(function(done) {
        this.driver.buttonClick(this.cls + ' .x-tool-close', done);
    })

});

module.exports = Dialog;
