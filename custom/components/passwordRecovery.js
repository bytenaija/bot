const EmailService = require('../services/EmailService');

module.exports = {
    metadata: () => ({
        name: 'PasswordRecovery',
        properties: {
            email: {
                required: true,
                type: 'string'
            },
        }
    }),
    invoke: (conversation, done) => {


        let {
            email
        } = conversation.properties();


        EmailService.email(email, "hdfshfsuhfeufhw784944")
        conversation.keepTurn(true);
        conversation.transition('lifePolicyRenewalFailure')
        done()

    }
};