INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Software Development');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Executive');

INSERT INTO role (title, salary, department_id) VALUES 
	('Head Legal Council', 200000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES 
	('Legal Council', 120000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES 
	('JR Developer', 55000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES 
	('SR Developer', 100000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES 
	('Sales Manager', 95000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES 
	('Sales Associate', 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES 
	('Sales Intern', 25000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES 
	('CEO', 350000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES 
	('CTO', 275000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES 
	('CFO', 250000.00, 4);
	
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Mildred', 'Quimby', 8, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Rebecca', 'Hook', 9, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Helen', 'Dalton', 10, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('John', 'Earley', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Marie', 'Jones', 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Christian', 'Davis', 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Ruth', 'Walker', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Vickie', 'Cox', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Norma', 'Perry', 3, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Alex', 'Tribble', 3, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Steve', 'Wheatley', 3, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('David', 'Bailey', 3, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Essie', 'Bare', 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Winnifred', 'Fletcher', 6, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Lisa', 'Clancy', 6, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	('Jennifer', 'Shoults', 7, 13);
