const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-auth',{
    // Parametros para no mostrar warnings de mongoose por consola
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('databse is connected'))
.catch(err => console.log(err));;