const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  }
});

exports.sendTaskDueNotification = async (task) => {
  try {
    if (!task.user || !task.user.username) {
      throw new Error('User or email is not defined');
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: task.user.username, 
      subject: 'Task Due Notification',
      text: `Your task "${task.title}" is due.`
    });

    console.log(`Email sent to: ${task.user.username} for task: ${task.title}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

