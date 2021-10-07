const express = require('express');
const axios = require('axios');
const path = require('path');

const db = require('../Database');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', () => {
  console.log('Test Endpoint');
});

app.get('/products', (req, res) => {
  db.query('SELECT * FROM product LIMIT 5')
    .then(({ rows }) => res.send(rows));
});

app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params;
  db.query(`SELECT * FROM product WHERE id = ${product_id}`)
    .then(({ rows }) => {
      return rows;
    })
    .then((prod) => {
      db.query(`SELECT * FROM feature WHERE product_id = ${product_id}`)
        .then(({ rows }) => {
          prod[0].features = [];
          rows.map((element) => {
            prod[0].features.push({feature: element.feature, value: element.value});
          })
          res.send(prod[0]);
        })
    })
    .catch((err) => console.log('Error: ', err));
});

const styleQuery = () => {

}

app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;
  let text =
    `SELECT
      product_id,

      JSON_AGG( JSON_BUILD_OBJECT(
        'style_id', styles.id,
        'name', name,
        'sale_price', sale_price,
        'original_price', original_price,
        'default?', styles.default_style,
        'photos', (SELECT JSON_AGG(JSON_BUILD_OBJECT(
          'thumbnail_url', thumbnail_url,
          'url', url
        ))
        FROM photos
        WHERE photos.style_id = styles.id),
        'skus', (SELECT JSON_OBJECT_AGG(
          id, JSON_BUILD_OBJECT(
            'quantity', quantity,
            'size', size
          ))
          AS skus
          FROM skus
          WHERE skus.style_id = styles.id
          GROUP by style_id
        ))
      )
      AS results
      FROM styles
      WHERE styles.product_id = $1
      GROUP BY product_id;`;

      db.query(text, [product_id])
            .then(({ rows }) => res.send(rows))
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});