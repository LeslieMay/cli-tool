'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('./templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () =>{
	co(function *(){
		// 分步接收用户输入的参数
		let tplName = yield prompt('Template name: ');
   		
   		if(!config.tpl[tplName]){
   			console.log(chalk.red('sorry,Template is not existed!'))
     		process.exit()
   		}else{
   			let gitUrl = yield prompt('Git https link: ');
   			let branch = yield prompt('Branch: ');
   			config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
   			config.tpl[tplName]['branch'] = branch;
   		}
   		 fs.writeFile(__dirname + '/templates.json', JSON.stringify(config), 'utf-8', (err) => {
		     if (err) console.log(err)
		     console.log(chalk.green('New template edited!\n'))
		     console.log(chalk.grey('The last template list is: \n'))
		     console.log(config)
		     console.log('\n')
		     process.exit()
		})
	})
	
}
