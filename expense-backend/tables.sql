CREATE TABLE category (
    id char(36) PRIMARY KEY,
    name TEXT NOT NULL,
    color varchar(16),
    icon varchar(16)
)

ALTER TABLE category 
ADD COLUMN color varchar(16),
ADD COLUMN icon varchar(16)

CREATE TABLE transaction (
  id char(36) PRIMARY KEY,
  amount decimal(10,2),
  categoryId char(36),
  type varchar(10),
  date Date,
  payee varchar(),
  note TEXT
)


SELECT id,name FROM category

CREATE TABLE IF NOT EXISTS playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
SELECT * FROM playing_with_neon;