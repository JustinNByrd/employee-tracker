const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
const pressAnyKey = require('press-any-key');

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
				'View Employees',
				'View Departments',
				'View Roles',
				'Add Department',
				'End Program'
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
				case 'View Departments':
					viewDepartments();
					break;
				case 'View Roles':
					viewRoles();
					break;
				case 'Add Department':
					addDepartment();
					break;
				case 'End Program':
					process.exit();
			}
		})
}

function viewEmployees() {
	const sqlStmt = `select concat(a.first_name, ', ', a.last_name) as Employee, c.title as Title, c.salary as Salary, d.name as Department, concat(b.first_name, ', ', b.last_name) as Manager
							from employee a left join employee b on a.manager_id = b.id
								inner join role c on a.role_id = c.id
								inner join department d on c.department_id = d.id`;
	connection.query(sqlStmt, (err, res) => {
		if (err) throw err;
		console.table(res);
		pressAnyKey()
			.then( () => {
				mainMenu();
			});
	});
}

function viewDepartments() {
	const sqlStmt = `select name as Name from department order by name`;
	connection.query(sqlStmt, (err, res) => {
		if (err) throw err;
		console.table(res);
		pressAnyKey()
			.then( () => {
				mainMenu();
			});
	});
}

function viewRoles() {
	const sqlStmt = `select a.title as Title, a.salary as Salary, b.name as Department
							from role a inner join department b on a.department_id = b.id
							order by salary desc`;
	connection.query(sqlStmt, (err, res) => {
		if (err) throw err;
		console.table(res);
		pressAnyKey()
			.then( () => {
				mainMenu();
			});
	});
}

function addDepartment() {
	const question = [
		{
			type: 'input',
			message: 'What is the name of the new department?',
			name: 'department'
		}
	];
	inquirer
		.prompt(question)
		.then((response) => {
			connection.query('INSERT INTO department (name) VALUES (?)', [response.department], (err, res) => {
				if (err) throw err;
				console.log('Department Added!');
				pressAnyKey()
					.then( () => {
						mainMenu();
					});
			});
		});
}

mainMenu();