CREATE DATABASE my_db;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  number int,
  price bigint
);