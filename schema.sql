CREATE DATABASE niche;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(600),
    password_digest VARCHAR(600),
    first_name VARCHAR(600),
    last_name VARCHAR (600),
    school VARCHAR (600),
    year_level VARCHAR (600)
);

CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(600),
    icon TEXT,
    length INTEGER,
    user_limit INTEGER,
    num_enrollments INTEGER
);


CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    track_id INTEGER,
    completed BOOLEAN
);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL,
    name VARCHAR(600),
    description VARCHAR(600),
    order_num INTEGER,
    FOREIGN KEY (track_id) REFERENCES tracks (id)
);

CREATE TABLE sub_lessons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(600),
    type VARCHAR(20),
    lesson_id INTEGER,
    content TEXT,
    order_num INTEGER,
    FOREIGN KEY (lesson_id) REFERENCES lessons (id)
):

@track = Track.new
@track.name = "Introductions that stand out"
@track.length = 3
@track.date_available = "2019-04-01"
@track.track_category_id = 1
@track.description = "Learn different introduction styles, prepare your own template, and successfully tackle any essay topic from your very first sentence"
@track.save

@track_category = Track_Category.new
@track_category.name = "Fundamentals"
@trac.save