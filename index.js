const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});

function mainMenu() {
	const question = [
		{
			type: 'list',
			message: 'Enter an option:',
			choices: [
				'View Employees'
			],
			name: 'mainMenu'
		}
	];
	inquirer
		.prompt(question)
		.then((answer) => {
			switch (answer.mainMenu) {
				case 'View Employees':
					console.log('view employees');
					break;
			}
		})
}

mainMenu();