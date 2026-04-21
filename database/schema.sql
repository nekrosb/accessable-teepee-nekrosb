
create table if not exists tags (
    id int generated always as identity primary key,
    title TEXT NOT NULL,
    description TEXT,
    check (trim(title) <> '')
);

create table if not exists projects (
    id int generated always as identity primary key,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    check (trim(title) <> '')
);

create table if not exists entries (
    id int generated always as identity primary key,
    description TEXT DEFAULT '',
    start_time TIMESTAMPTZ DEFAULT now(),
    finish_time TIMESTAMPTZ  default null,
    project_id int,
    foreign key (project_id) references projects(id),

    check (start_time < finish_time)
);
create unique index entries_is_active
on entries ((1))
where finish_time is null;

create table if not exists entry_tags (
    entry_id int,
    tag_id int,
    primary key (entry_id, tag_id),
    foreign key (entry_id) references entries(id) on delete cascade,
    foreign key (tag_id) references tags(id) on delete cascade
);

