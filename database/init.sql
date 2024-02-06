CREATE TABLE logs (
    "path" varchar(256),
    "route" varchar(256),
    "data" varchar(256),
    "timeStamp" timestamp
);

CREATE TABLE health_check (
	"on"  bool
);

INSERT INTO health_check ("on") VALUES (true)
