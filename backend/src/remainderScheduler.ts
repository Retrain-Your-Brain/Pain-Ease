import cron from 'node-cron';
import Reminder from '../model/reminder'; // adjust path if needed

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g. smtp.gmail.com for Gmail
  port: 587,
  secure: false,
  auth: {
    user: "navdishabhakri@gmail.com",
    pass: "ivqf qopb izmu lbyx",
  },
});

export const sendReminderEmail = async (to: string, message: string) => {
  const mailOptions = {
    to,
    subject: "Reminder Notification",
    text: message,
    html: "<b>" + message + "</b>", 
  };

  await transporter.sendMail(mailOptions);
};

export const startReminderEmailJob = () => {
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const dueReminders = await Reminder.find({
    reminderTime: { $lte: now },
    notified: false,
  }).populate('userId');

  for (const reminder of dueReminders) {
    const user = reminder.userId ;
    const userEmail = (user as any).email;
    const message = reminder.message;

    try {
      await sendReminderEmail(userEmail, message);
      reminder.notified = true;
      await reminder.save();
      console.log(`✅ Email sent to ${userEmail}`);
    } catch (err) {
      console.error('Failed to send reminder email:', err);
    }
  }
});
}
export default transporter;