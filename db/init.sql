CREATE TABLE IF NOT EXISTS project (
		id INT AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(255) NOT NULL
	);

CREATE TABLE IF NOT EXISTS status (
		id INT AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(255) NOT NULL
	);


CREATE TABLE IF NOT EXISTS jobs (
		id INT AUTO_INCREMENT PRIMARY KEY,
		project_id INT NOT NULL,
		status_id INT NOT NULL,
		price FLOAT NOT NULL,
		created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (project_id) REFERENCES project(id),
		FOREIGN KEY (status_id) REFERENCES status(id) 
	);


-- insert data to tables project and status
INSERT INTO project (title) VALUES ('project 1');


INSERT INTO status (title) VALUES ('in preparation'), ('in progress'), ('delivered'), ('cancelled');



-- insert data to table jobs
INSERT INTO jobs (project_id, status_id, price, created_at ) VALUES (1, 1, 100, '2020-01-01 00:00:00'), (1, 2, 200, '2020-01-02 00:00:00'), (1, 3, 300, '2020-01-03 00:00:00');
