
const projectsRepo = require("./projects-repo");
const pug = require('pug');
const fs = require('fs');

// Compile the source code
const compiledMenu = pug.compileFile('./view/index.pug');

module.exports.load = () => {
	const categories = projectsRepo.getAll();
	const menuHtml = compiledMenu({
		categories: categories
	});
	fs.writeFileSync('./site-root/index.html', menuHtml);
}