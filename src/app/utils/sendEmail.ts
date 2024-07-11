import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'ijaz.hossain35@gmail.com',
      pass: 'okum npfr vbdr rxln',
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: 'ijaz.hossain35@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten minutes', // Subject line
    text: '', // plain text body
    html,
  });
};
