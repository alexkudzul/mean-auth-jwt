const express = require('express');
const { json } = require('express');
const app = express();

const cors = require('cors');

require('./database');

// Agrega cabeceras para poder hacer la peticion entre servidores externos
app.use(cors());

// Convierte los datos que recibe el servidor en json
app.use(express.json());

app.use('/api',require('./routes/index'));

app.listen(3000);
console.log('server on port', 3000);