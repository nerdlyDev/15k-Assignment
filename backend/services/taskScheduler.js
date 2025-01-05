const cron = require('node-cron');
const Task = require('../models/Task');
const emailService = require('./emailService');   

const updateDueTasks = async () => {
  try {
    const now = new Date();
    console.log('Current time:', now.toISOString());


    const dueTasks = await Task.find({
      status: 'pending',
      scheduledTime: { $lte: now }
    }).populate('user'); 

    console.log(`Found ${dueTasks.length} due tasks`);

  
    for (const task of dueTasks) {
      task.status = 'due';
      await task.save();
      console.log(`Updated task ${task._id} to 'due'`);

      // Send email
      await emailService.sendTaskDueNotification(task);
    }
  } catch (error) {
    console.error('Error updating tasks:', error.message);
  }
};


const start = () => {
  console.log('Starting cron job');
  
  // Running every minute (you can adjust this schedule if needed)
  cron.schedule('* * * * *', () => {
    console.log('Cron job triggered at', new Date().toISOString()); // Logging when cron job is triggered
    updateDueTasks(); 
  });
};

module.exports = { start };

