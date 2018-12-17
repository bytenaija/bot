const Email = require('email-templates');

exports.email = (email, password) =>{


 
const email = new Email({
  message: {
    from: 'niftylettuce@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  // send: true
  transport: {
    jsonTransport: true
  }
});
 
email
  .send({
    template: 'PasswordRecovery',
    message: {
      to: email
    },
    locals: {
      password
    }
  })
  .then(console.log)
  .catch(console.error);

}