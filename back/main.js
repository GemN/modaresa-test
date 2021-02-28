const express = require('express');
var cors = require('cors')
const bodyparser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors())
app.use(bodyparser.json())
global.brands = [];

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  next()
})

app.get('/brands', (req, res) => {
  res.status(200).send(global.brands);
})

app.post('/brand', (req, res) => {
  if (!req.body.name || !req.body.country || !req.body.sneakers) {
    res.status(400).send({message: "Missing brand informations"})
  } else {
    if (req.body.update) {
      const index = global.brands.findIndex(brand => brand.id === req.body.id)
      global.brands[index] = req.body;
      res.status(200).send({message: "Success"});
    } else {
      var newBrand = {...req.body, id: global.brands.length + 1, createdAt: new Date()};
      global.brands.push(newBrand)
      res.status(200).send(newBrand)
    }
  }
})

app.delete('/brand', (req, res) => {
  const { query } = req;

  if (query.id) {
    const index = global.brands.findIndex(elem => elem.id === parseInt(query.id))
    if (index === -1) {
      res.status(400).send({message: "Unknown brand, not deleted"})
    } else {
      global.brands.splice(index, 1);
      res.status(200).send({message: "Brand deleted"})
    }
  } else
    res.status(200).send({message: "Missing brand id"})
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})