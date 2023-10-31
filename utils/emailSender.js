'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  //   secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'postmaster@sandboxd556f5dbf94d4df8ac2a4063944c0e9a.mailgun.org',
    pass: 'd0f7ae8724f750c047424fe7a921d59b-7ca144d2-777621ad',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'angwayah@yahoo.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    // text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);

// module.exports = async function () {
//   try {
//     main();
//   } catch (err) {
//     console.log(err);
//   }
// };
