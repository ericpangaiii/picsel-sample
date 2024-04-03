-- database creation
CREATE DATABASE picsel;

-- install uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create user table
-- 'user' is a reserved word, hence 'user_account'
CREATE TABLE user_account (
	user_id 			    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),     
	user_type			    text NOT NULL,
	first_name 			    text NOT NULL,
	middle_name			    text,
	last_name			    text NOT NULL,
	email				    text NOT NULL,
	username			    text NOT NULL,
	contact_number		    varchar(13) NOT NULL,	
	display_picture		    text NOT NULL,
	password			    text NOT NULL,
	student_number		    varchar(10),			
	organization_name   	text,
	college				    text,
	department			    text
);

-- create room table
CREATE TABLE room (
    room_id                 uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_type			    text NOT NULL,
    room_name               text NOT NULL,
    capacity                smallint NOT NULL,
    rate                    numeric(4, 2) NOT NULL,
    images                  text[] NOT NULL,
    videos                  text[] NOT NULL
);

-- create class schedule table
-- '0' indicates 'Sunday' and '6' indicates 'Saturday'
CREATE TABLE schedule (
    schedule_id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id                 uuid NOT NULL,
    course_code             text NOT NULL,
    course_title            text NOT NULL,
    faculty                 text NOT NULL,
    day_of_week             smallint NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    class_start_time        time NOT NULL,
    class_end_time          time NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
);

-- create reservation request table
CREATE TABLE request (
    request_id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                 uuid NOT NULL,
    room_id                 uuid NOT NULL,
    purpose                 text NOT NULL,
    reservation_date        date NOT NULL,
    reservation_start_time  time NOT NULL,
    reservation_end_time    time NOT NULL,
    request_status          text NOT NULL,
    letter                  text,
    form                    text,
    receipt                 text,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
);

-- create activity log table
CREATE TABLE log (
    log_id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                 uuid NOT NULL,
    request_id              uuid NOT NULL,
    log_type			    text NOT NULL,
    date_stamp              date NOT NULL,
    time_stamp              date NOT NULL,
    remarks                 text NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES request(request_id) ON DELETE CASCADE
);