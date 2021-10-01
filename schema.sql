DROP DATABASE IF EXISTS products_database;
CREATE DATABASE products_database;

\c products_database;

CREATE TABLE product (
  id integer PRIMARY KEY,
  name varchar,
  slogan varchar,
  description varchar,
  category varchar,
  default_price integer
);

CREATE TABLE related (
  id integer,
  current_product_id integer,
  related_product_id integer,
  PRIMARY KEY (id),
    FOREIGN KEY (current_product_id)
      REFERENCES product(id)
);

CREATE TABLE styles (
  id integer,
  product_id integer,
  name varchar,
  sale_price varchar,
  original_price varchar,
  default_style integer,
  PRIMARY KEY (id),
    FOREIGN KEY (product_id)
      REFERENCES product(id)
);

CREATE TABLE photos (
  id integer,
  style_id integer,
  url varchar,
  thumbnail_url varchar,
  PRIMARY KEY (id),
    FOREIGN KEY (style_id)
      REFERENCES styles(id)
);

CREATE TABLE skus (
  id integer,
  style_id integer,
  size varchar,
  quantity integer,
  PRIMARY KEY (id),
    FOREIGN KEY (style_id)
      REFERENCES styles(id)
);

CREATE TABLE feature (
  id integer,
  product_id integer,
  feature varchar,
  value varchar,
  PRIMARY KEY (id),
    FOREIGN KEY (product_id)
      REFERENCES product(id)
);

COPY product FROM '/Users/Rhoads/hackreactor/SDC/Products/csv-files/product.csv' DELIMITER ',' CSV HEADER;
COPY related FROM '/Users/Rhoads/hackreactor/SDC/Products/csv-files/related.csv' DELIMITER ',' CSV HEADER;
COPY styles FROM '/Users/Rhoads/hackreactor/SDC/Products/csv-files/styles.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/Rhoads/hackreactor/SDC/Products/csv-files/photos.csv' DELIMITER ',' CSV HEADER;
COPY skus FROM '/Users/Rhoads/hackreactor/SDC/Products/csv-files/skus.csv' DELIMITER ',' CSV HEADER;
COPY feature FROM '/Users/Rhoads/hackreactor/SDC/Products/csv-files/feature.csv' DELIMITER ',' CSV HEADER;