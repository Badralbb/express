CREATE TABLE category (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color varchar(16),
    icon varchar(16)
)

ALTER TABLE category 
ADD COLUMN color varchar(16),
ADD COLUMN icon varchar(16)

SELECT id,name FROM category

CREATE TABLE IF NOT EXISTS playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
SELECT * FROM playing_with_neon;