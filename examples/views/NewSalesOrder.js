var Dialog = require('./Dialog');


var NewSalesOrder = View.extend({

    save: View.chain(function(done) {
        
        var me = this;
        
        me._validateAndFail(me.driver, this.url);
        
        me.driver.buttonClick('.auto_sales_new_saveandcontinueediting', function(err) {
            if(err) {
                throw new Error(err);
            }

            var dialog = Dialog.create({ driver: me.driver, cls: '.x-window-dlg' });
            dialog.visible(function(err, visible) {

                if(visible) {

                    dialog.getData(function(err, data) {                        
                        done(data && data.message); // the message displayed to the user is passed as error message
                    });

                } else {
                    done(null); // TODO pass an instance of the new sales order
                }
            });
        });

    }),
    
    getValues: View.chain(function(done) {
        
        done();

    }),

    setValues: View.chain(function(data, done) {
        
        done();

    }),

    closeDialog: View.chain(function(done) {
        
        var me = this;
        me._validateAndFail(me.driver);
        var dialog = Dialog.create({ driver: me.driver, cls: '.x-window-dlg' });
        dialog.close(done);

    })

});

module.exports = NewSalesOrder;
