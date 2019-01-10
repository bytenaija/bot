const Email = require('email-templates');
const path = require('path'),
nodemailer = require('nodemailer');


let transport = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true, // true for 465, false for other ports
auth: {
    user: 'bytenaija@gmail.com', // generated ethereal user
    pass: 'skywalk09@1984' // generated ethereal password
}
})

exports.email = (emailAddress, password) =>{

    console.log(__dirname)
const templateDir = path.join(__dirname, 'Emails')
 
const emailService = new Email({
views: { root: templateDir },
  message: {
    from: 'niftylettuce@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  // send: true
send: true,
transport: transport,

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
  .then()
  .catch(console.error);

}