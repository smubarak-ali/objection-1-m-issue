
create table content (
	id serial not null primary key,
	category varchar(50) not null CHECK (category IN ('fiveSteps', 'music', 'empowerment', 'advance')),
	ref_id int not null,
	title varchar(100) null,
	content varchar(1000) null,
	info_message varchar(2000) null
	-- primary key (id, ref_id)
) with (oids=false);

create table content_images (
	id serial not null primary key,
	content_id int not null references content(id),
	content_ref_id int not null,
	image varchar(500) null
	-- foreign key (content_id, content_ref_id) references content(id, ref_id)
) with (oids=false);

create table content_music (
	id serial not null primary key,
	music_type varchar(50) null CHECK (music_type IN ('express', 'spectral', 'space')),
	music_file_url varchar(500) not null
) with (oids=false);

create table music_in_content (
	id serial not null,
	content_id int not null references content(id),
	content_music_id int not null references content_music(id),
	primary key (id, content_id, content_music_id)
) with (oids=false);

ALTER TABLE "content" ADD CONSTRAINT "content_unique_0" unique ("id");


-- SEED DATA
-- Breathing
insert into content (category, ref_id, title, content, info_message) values ('fiveSteps', 1, 'Breathing', 'This guided meditation will focus on your breathing and help you sense your breath.', 'Breathing - This guided meditation will focus on your breathing and help you sense your breath');
insert into content_images (content_id, content_ref_id, image) values (1, 1, 'five-steps/images/breathing.png');
insert into content_music (music_type, music_file_url) values ('express', 'five-steps/music/breathing-express.mp3');
insert into content_music (music_type, music_file_url) values ('spectral', 'five-steps/music/breathing-spectral.mp3');
insert into content_music (music_type, music_file_url) values ('space', 'five-steps/music/breathing-space.mp3');
insert into music_in_content (content_id, content_music_id) values (1, 1), (1, 2), (1, 3);

-- Eyefocus
insert into content (category, ref_id, title, content, info_message) values ('fiveSteps', 2, 'Eye Focus', 'Now, we will focus on the movement of your eyes which will prepare them for deeper meditation.', 'Eye Focus - Now , we will focus on the movement of your eyes which will prepare them for deeper meditation');
insert into content_images (content_id, content_ref_id, image) values (2, 2, 'five-steps/images/eye_focus.png');
insert into content_music (music_type, music_file_url) values ('express', 'five-steps/music/eye-focus-express.mp3');
insert into content_music (music_type, music_file_url) values ('spectral', 'five-steps/music/eye-focus-spectral.mp3');
insert into content_music (music_type, music_file_url) values ('space', 'five-steps/music/eye-focus-space.mp3');
insert into music_in_content (content_id, content_music_id) values (2, 4), (2, 5), (2, 6);

-- MuscleRelaxation
insert into content (category, ref_id, title, content, info_message) values ('fiveSteps', 3, 'Muscle Relaxation', 'Next, you are going to learn to focus on your muscles. We will be working on your whole nervous system to bring about total relaxation.', 'Music Relaxation - Next you are going to learn to focus on your muscles. We will be working on your whole nervous system to bring about total relaxation');
insert into content_images (content_id, content_ref_id, image) values (3, 3, 'five-steps/images/relaxation.png');
insert into content_music (music_type, music_file_url) values ('express', 'five-steps/music/relaxation-express.mp3');
insert into content_music (music_type, music_file_url) values ('spectral', 'five-steps/music/relaxation-spectral.mp3');
insert into content_music (music_type, music_file_url) values ('space', 'five-steps/music/relaxation-space.mp3');
insert into music_in_content (content_id, content_music_id) values (3, 7), (3, 8), (3, 9);

-- Thoughts
insert into content (category, ref_id, title, content, info_message) values ('fiveSteps', 4, 'Thoughts', 'This next guided meditation will help you focus on your thoughts.', 'Thought - This next guided meditation will help you focus on your thoughts');
insert into content_images (content_id, content_ref_id, image) values (4, 4, 'five-steps/images/thoughts.png');
insert into content_music (music_type, music_file_url) values ('express', 'five-steps/music/thoughts-express.mp3');
insert into content_music (music_type, music_file_url) values ('spectral', 'five-steps/music/thoughts-spectral.mp3');
insert into content_music (music_type, music_file_url) values ('space', 'five-steps/music/thoughts-space.mp3');
insert into music_in_content (content_id, content_music_id) values (4, 10), (4, 11), (4, 12);

-- Mind Focus
insert into content (category, ref_id, title, content, info_message) values ('fiveSteps', 5, 'Mind Focus', 'We will now coach you how you can achieve deep mind focus.', 'Mind Focus - We will now coach you how you can achieve deep mind focus');
insert into content_images (content_id, content_ref_id, image) values (5, 5, 'five-steps/images/mind_focus.png');
insert into content_music (music_type, music_file_url) values ('express', 'five-steps/music/mind_focus-express.mp3');
insert into content_music (music_type, music_file_url) values ('spectral', 'five-steps/music/mind_focus-spectral.mp3');
insert into content_music (music_type, music_file_url) values ('space', 'five-steps/music/mind_focus-space.mp3');
insert into music_in_content (content_id, content_music_id) values (5, 13), (5, 14), (5, 15);

