const Email = require('email-templates');
const path = require('path'),
nodemailer = require('nodemailer');


let transport = nodemailer.createTransport({
host: 'smtp.office365.com',
port: 587,
secure: true, // true for 465, false for other ports
auth: {
    user: 'noreply.nipex@nipex.com.ng', // generated ethereal user
    pass: 'Kad65759' // generated ethereal password
}
})

exports.email = (emailAddress, password, name, template) =>{

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
    template: template,
    message: {
      to: emailAddress
    },
    locals: {
      password,
      name
    }
  })
  .then()
  .catch(console.error);

}