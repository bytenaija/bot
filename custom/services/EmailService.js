const Email = require('email-templates');

exports.email = (emailAddress, password) =>{


 
const emailService = new Email({
views: { root: './emails' },
  message: {
    from: 'niftylettuce@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  // send: true
  transport: {
    jsonTransport: true
  }
});
 
emailService
  .send({
    template: 'PasswordRecovery',
    message: {
      to: emailAddress
    },
    locals: {
      password
    }
  })
  .then(console.log)
  .catch(console.error);

}