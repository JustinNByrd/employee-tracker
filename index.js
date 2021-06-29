const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
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
					viewEmployees();
					break;
			}
		})
}

function viewEmployees() {
	const sqlStmt = `select CONCAT(a.last_name, ', ', a.first_name) as Employee, b.title as Title, b.salary as Salary, c.name as Department, CONCAT(d.last_name, ', ', d.first_name) as Manager from employee a, role b, department c, employee d where a.role_id = b.id and b.department_id = c.id and a.manager_id = d.id`;
	connection.query(sqlStmt, (err, res) => {
		if (err) throw err;
		console.table(res);
	});
}

mainMenu();