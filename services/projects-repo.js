const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./storage/db/projects.json');
const db = low(adapter);

module.exports.getAll = () => {
	return db.get('categories')
			.value();
}