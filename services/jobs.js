const schedule = require('node-schedule');
const loadChangelogs = require('./load-changelogs');

module.exports.scheduleAll = () => { 
	var j = schedule.scheduleJob('* * * * * *', loadChangelogs.load);
};