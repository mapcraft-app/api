CREATE TABLE IF NOT EXISTS "User" (
	"ID"			INTEGER,
	"Username"		TEXT,
	"UUID"			TEXT,
	"IsConnected"	INTEGER DEFAULT 0,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
