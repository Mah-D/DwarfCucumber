var Login = require('../views/Login');
var Module = require('../views/Module');
var SalesModule = require('../views/SalesModule');

var data = require('../data/data.json');
var error;


// Given a user is in the "Sales Orders" tab in the "Sales" module
Given(/a user is in the "Sales Orders" tab in the "$STR" module/, function(name, done) {
    
    var login = Login.create({ driver: this.driver, cls:'.login', url: data.url });
    var module = Module.create({ driver: this.driver, url: data.url, cls: '.auto_sales_salesgrid' });

    module.visible(function(err, visible) {

        if(!visible) {
            module.goto(name);
        }

    });

    login.visible(function(err, visible) {
        
        if(visible) {
            login.login(data.username, data.password);
            module.goto(name).ready(done);
        } else {
            done();
        }

    });

});

// When user attempts to create an invalid Sales order
When(/the user attempts to create an invalid Sales order/, function(done) {
    
    var salesModule = SalesModule.create({ driver: this.driver, url: data.url });
    
    salesModule.gotoNewScreen(function(err, newSalesOrder) {

        newSalesOrder
            .save(function(err, salesOrder) {
                error = err;
                newSalesOrder.closeDialog(done);
            })
            //.closeDialog(done);
    });

});

// Then the Sales order creation fails with a validation message
Then(/the Sales order creation fails with a validation message/, function(done) {

    expect(error).to.equal('Please fill in all required fields.');
    done();

});

// When the user creates a valid Sales order
When(/the user creates a valid Sales order/, function(done) {
    error = null;
    var data = {
        name: 'Test Sales Order',
        
    };
    newSalesOrder.setValues(data).save(function(err, salesOrder) {
        error = err;
        done();
    });

});

// Then the Sales order creation is successful
Then(/the Sales order creation is successful/, function(done) {

    expect(error).to.equal('Please fill in all required fields.');
    done();

});