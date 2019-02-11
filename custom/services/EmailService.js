const Email = require('email-templates');
const path = require('path');


const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'noreply.nipex@nipex.com.ng', // generated ethereal user
    pass: 'Kad65759', // generated ethereal password
  },
});

exports.email = (emailAddress, password, name, template) => {
  console.log(__dirname);
  const templateDir = path.join(__dirname, 'Emails');

  const emailService = new Email({
    views: { root: templateDir },
    message: {
      from: 'noreply.nipex@nipex.com.ng',
    },

    send: true,
    transport,

  });

  emailService
    .send({
      template,
      message: {
        to: emailAddress,
      },
      locals: {
        password,
        name,
      },
    })
    .then(console.dir)
    .catch(err => console.error('Error', err));
};
