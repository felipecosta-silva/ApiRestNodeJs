//config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler o JSON / meddlewares
app.use(
  express.urlencoded({
    extend: true,
  }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// rota inicial / endopoint

app.get('/', (req, res) => {
  // mostrar req

  res.json({message: 'hello man'})
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.tn3ey.mongodb.net/ApiRestDatabase?retryWrites=true&w=majority`
)
.then(() => {
  console.log('connected man');
  app.listen(3000)
})
.catch((err) => console.log(err))
