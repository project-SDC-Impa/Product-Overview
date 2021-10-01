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

app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;

  db.query(`SELECT * FROM styles WHERE product_id = ${product_id}`)
    .then(({ rows }) => {
      console.log('STEP 1');
      return rows;
    })
    .then((styles) => {
      console.log('STEP 2'); //an array of style objects
      let newStyles = {
        product_id: product_id,
        results: [], // [{},{},{}]
      };

      styles.map((style) => {
        newStyles.results.push({
          "style_id": style.id,
          "name": style.name,
          "original_price": style.original_price,
          "sale_price": style.sale_price,
          "default?": style.default_style ? true : false,
          "photos": [],
          "skus": {},
        })
      })
      return newStyles;
    })
    .then((newStyles) => {
      console.log('STEP 3');

      

      return newStyles;
    })
    .then((newStyles) => {
      console.log('END');
      res.send(newStyles);
    })
    .catch((err) => console.log(err));
});
//   db.query(`SELECT * FROM styles WHERE product_id = ${product_id}`)
//     .then(({ rows }) => {
//       rows.map((style) => {
//         newStyles.results.push({
//           "style_id": style.id,
//           "name": style.name,
//           "original_price": style.original_price,
//           "sale_price": style.sale_price,
//           "default?": style.default_style ? true : false,
//           "photos": [],
//           "skus": {},
//         });
//       })
//       console.log('STEP 1');
//     })
//     .then(console.log(newStyles))
//     .then((styles) => res.send(styles))
//     .catch((err) => console.log(err));
// });

// app.get('/products/:product_id/related', async (req, res) => {
//   res.send('GET Product/id/related Success!');
// });

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});