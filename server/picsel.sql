-- create database
CREATE DATABASE picsel;

-- make sure to install uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create user table
-- 'user' is a reserved word, hence 'user_account'
CREATE TABLE user_account (
	user_id 			uuid PRIMARY KEY DEFAULT uuid_generate_v4(),     
	user_type			text NOT NULL,
	first_name 			text NOT NULL,
	middle_name			text,
	last_name			text NOT NULL,
	email				text NOT NULL,
	username			text NOT NULL,
	contact_number		varchar(13) NOT NULL,	
	display_picture		text NOT NULL,
	password			text NOT NULL,
	student_number		varchar(10),			
	organization_name	text,
	college				text,
	department			text
);