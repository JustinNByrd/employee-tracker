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
				'Add Role',
				'Add Employee',
				'Update Employee Role',
				'View Utilized Budget by Department',
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
				case 'Add Role':
					addRole();
					break;
				case 'Add Employee':
					addEmployee();
					break;
				case 'Update Employee Role':
					updateEmployee();
					break;
				case 'View Utilized Budget by Department':
					viewUtilizedBudget();
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
			message: 'What is the name of the new Department?',
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

function addRole() {
	const departmentArr = [];
	const sqlStmt = 'select id, name from department order by name';
	connection.query(sqlStmt, (err, res) => {
		if (err) throw err;
		for (let i = 0; i < res.length; i++) {
			departmentArr.push({value: res[i].id, name: res[i].name});
		}
		const questions = [
			{
				type: 'input',
				message: "What is the new Role's title?",
				name: 'roleTitle'
			},
			{
				type: 'list',
				message: 'What Deparment does the new Role belong to?',
				choices: departmentArr,
				name: 'department'
			},
			{
				type: 'input',
				message: "What is the new Role's salary?",
				name: 'salary'
			}
		];
		inquirer
			.prompt(questions)
			.then((answers) => {
				connection.query('INSERT INTO role SET ?',
					{
						title: answers.roleTitle,
						salary: answers.salary,
						department_id: answers.department
					},
					(err, res) => {
						if (err) throw err;
						console.log('Role Added!');
						pressAnyKey()
							.then( () => {
								mainMenu();
							});
					})
			});
	});
}

function addEmployee() {
	const roleArr = [];
	const empArr = [];
	connection.query('select id, title from role order by title', (err, res) => {
		if (err) throw err;
		for (let i = 0; i < res.length; i++) {
			roleArr.push({value: res[i].id, name: res[i].title});
		}
		connection.query("select id, concat(last_name, ', ', first_name) as manager from employee order by last_name, first_name", (err, res) => {
			if (err) throw err;
			for (let i = 0; i < res.length; i++) {
				empArr.push({value: res[i].id, name: res[i].manager});
			}
			const questions = [
				{
					type: 'input',
					message: "What is the Employee's first name?",
					name: 'empFirstName'
				},
				{
					type: 'input',
					message: "What is the Employee's last name?",
					name: 'empLastName'
				},
				{
					type: 'list',
					message: "What is the Employee's Role?",
					choices: roleArr,
					name: 'role'
				},
				{
					type: 'list',
					message: "Who is the Employee's Manager?",
					choices: empArr,
					name: 'manager'
				}
			];
			inquirer
				.prompt(questions)
				.then((answers) => {
					connection.query('INSERT INTO employee SET ?',
					{
						first_name: answers.empFirstName,
						last_name: answers.empLastName,
						role_id: answers.role,
						manager_id: answers.manager
					},
					(err, res) => {
						if (err) throw err;
						console.log('Employee Added!');
						pressAnyKey()
							.then( () => {
								mainMenu();
							});
					}
				)});
		});
	});
}

function updateEmployee() {
	const roleArr = [];
	const empArr = [];
	connection.query("select id, concat(last_name, ', ', first_name) as Employee from employee order by last_name, first_name", (err, res) => {
		if (err) throw err;
		for (let i = 0; i < res.length; i++)
			empArr.push({value: res[i].id, name: res[i].Employee});
		connection.query('select id, title from role order by title', (err, res) => {
			for (let i = 0; i < res.length; i++)
				roleArr.push({value: res[i].id, name: res[i].title});
			const questions = [
				{
					type: 'list',
					message: 'Which Employee would you like to update?',
					choices: empArr,
					name: 'employee'
				},
				{
					type: 'list',
					message: "What is the Employee's new Role?",
					choices: roleArr,
					name: 'role'
				}
			];
			inquirer
				.prompt(questions)
				.then((answers) => {
					connection.query('UPDATE employee SET ? WHERE ?',
						[
							{
								role_id: answers.role
							},
							{
								id: answers.employee
							}
						],
						(err, res) => {
							console.log("Employee Updated!");
							pressAnyKey()
								.then( () => {
									mainMenu();
								});
						}
					);
				});
		});
	});
}

function viewUtilizedBudget() {
	connection.query(`select c.name as Department, sum(b.salary) as Salary
							from employee a inner join role b on a.role_id = b.id
								inner join department c on b.department_id = c.id
							group by c.name
							order by c.name`, 
		(err, res) => {
			console.table(res);
			pressAnyKey()
				.then( () => {
					mainMenu();
				});
		});
}

mainMenu();