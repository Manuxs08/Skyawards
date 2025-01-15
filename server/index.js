const express = require('express');
const app = express();

require('dotenv').config()

const categoriaRouter = require('./routes/categoria.router')

app.use(express.urlencoded({extended: false}));
app.use(express.json);

app.use("/get/categoria", categoriaRouter)

const PORT = process.env.PORT || 16696

app.listen(PORT, () => {
    console.log('Server running...')
})