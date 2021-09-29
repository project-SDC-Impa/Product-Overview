CREATE TABLE "product" (
  "id" integer,
  "name" varchar,
  "slogan" varchar,
  "description" varchar,
  "category" varchar,
  "default_price" integer,
  PRIMARY KEY ("id")
);

CREATE TABLE "related" (
  "id" integer,
  "current_product_id" integer,
  "related_product_id" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_related.current_product_id"
    FOREIGN KEY ("current_product_id")
      REFERENCES "product"("id")
);

CREATE TABLE "styles" (
  "id" integer,
  "product_id" integer,
  "name" varchar,
  "sale_price" varchar,
  "original_price" varchar,
  "default_style" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_styles.product_id"
    FOREIGN KEY ("product_id")
      REFERENCES "product"("id")
);

CREATE TABLE "photos" (
  "id" integer,
  "style_id" integer,
  "url" varchar,
  "thumbnail_url" varchar,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_photos.style_id"
    FOREIGN KEY ("style_id")
      REFERENCES "styles"("id")
);

CREATE TABLE "skus" (
  "id" integer,
  "style_id" integer,
  "size" varchar,
  "quantity" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_skus.style_id"
    FOREIGN KEY ("style_id")
      REFERENCES "styles"("id")
);

CREATE TABLE "feature" (
  "id" integer,
  "product_id" integer,
  "feature" varchar,
  "value" varchar,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_feature.product_id"
    FOREIGN KEY ("product_id")
      REFERENCES "product"("id")
);

