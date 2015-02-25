Feature: Create new Sales order

    Scenario: Creation of a Sales Order fails with missing data.

        Given a user is in the "Sales Orders" tab in the "Sales" module
        When the user attempts to create an invalid Sales order
        Then the Sales order creation fails with a validation message

    Scenario: Successful creation of a Sales Order.

        When the user creates a valid Sales order
        Then the Sales order creation is successful