const nodemailer = require("nodemailer");
const config = require('./../config.json');

const sendEmail = async (id, subject, message, send_to, reply_to) => {
  const selectedConfig = config.find(obj => obj.id === id)
  console.log(selectedConfig)
  const transporterConfig = {
    host: selectedConfig.EMAIL_HOST,
    secure: selectedConfig.SECURE,
    port: selectedConfig.PORT,
    auth: {
      user: selectedConfig.EMAIL_USER,
      pass: selectedConfig.EMAIL_PASS
    },
    logger: true,
    debug: true,
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2"
    },
    direct: true,
  }

  console.log(transporterConfig)

  let mailTransporter = nodemailer.createTransport(transporterConfig);

  const options = {
    from: "gonzalolovo@gmail.com",
    to: selectedConfig.EMAIL_USER,
    subject: subject,
    html: message,
  };

  console.log(options)


  // Send Email
  mailTransporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};


module.exports = sendEmail;
