CREATE KEYSPACE tweets
WITH durable_writes = true
AND replication = {
	'class' : 'SimpleStrategy',
	'replication_factor' : 1};
CREATE TABLE tweets.count (
	year int,
	month int,
	day int,
	hour int,
	count counter,
	PRIMARY KEY (year, month, day, hour)
) WITH CLUSTERING ORDER BY ( month DESC, day DESC, hour DESC );
CREATE TABLE tweets.langs (
	hastag text,
	lang_pt counter,
	PRIMARY KEY (hastag));
CREATE TABLE tweets.posts (
	hastag text,
	post_id bigint,
	post text,
	PRIMARY KEY (hastag, post_id));
CREATE TABLE tweets.users (
	screen_name text,
	followers_count int,
	created_at timestamp,
	description text,
	friends_count int,
	location text,
	name text,
	profile_image_url text,
	PRIMARY KEY (screen_name, followers_count)
) WITH CLUSTERING ORDER BY ( followers_count DESC )
