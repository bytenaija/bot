const EmailService = require('../services/EmailService');

var generator = require('generate-password');


module.exports = {
    metadata: () => ({
        name: 'PasswordRecovery',
        properties: {
            SupplierID: {
                required: true,
                type: 'string'
            },
        }
    }),
    invoke: (conversation, done) => {


        let {
            email
        } = conversation.properties();

         
        var password = generator.generate({
            length: 15,
            numbers: true
        });
        EmailService.email(email, password)
        conversation.keepTurn(true);
        conversation.transition('lifePolicyRenewalFailure')
        done()

    }
};