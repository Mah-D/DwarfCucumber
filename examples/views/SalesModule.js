var Module = require('./Module');
var NewSalesOrder  = require('./NewSalesOrder')

var SalesModule = Module.extend({
    gotoNewScreen: Module.chain(function(done) {
        var me = this;
        
        me._validateAndFail(me.driver, me.url);

        me.driver
            .buttonClick('.auto_sales_new', function(err) {
                if(err) {
                    throw new Error(err);
                }
                done(err, NewSalesOrder.create({ driver: me.driver, url: me.url }));
            }, 5000);
    })
});

module.exports = SalesModule;
