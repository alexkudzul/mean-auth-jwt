const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Hola');
});

// Password falta cifrarlo
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Guarda el user
    const newUser = new User({ email, password });
    await newUser.save();

    // Crea el token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey');

    res.status(200).json({ token });
});

// Nota: secret tiene que ser igual cada vez que se cree un token
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Busca un correo con lo que viene en el body
    const user = await User.findOne({ email });

    // Validando si existe user
    if (!user) return res.status(401).send("The mail doesn´t exist");
    // Validando si la contraseña es correcta o no
    if (user.password !== password) return res.status(401).send("Wrong password");

    // Crea el token
    const token = jwt.sign({ _id: user._id }, 'secretKey');

    res.status(200).json({ token });

});

// Datos publicos
// Devuelve posts en json
router.get('/posts', (req, res) => {
    res.json([
        {
            _id: '1',
            title: 'Title 1',
            content: 'Content 1',
            date: '2020-07-27T17:55:35.482Z'
        },
        {
            _id: '2',
            title: 'Title 2',
            content: 'Content 2',
            date: '2020-07-27T17:55:35.482Z'
        },
        {
            _id: '3',
            title: 'Title 3',
            content: 'Content 3',
            date: '2020-07-27T17:55:35.482Z'
        }
    ]);
});

// Datos privados
router.get('/posts-private', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            title: 'Title 1',
            content: 'Content 1 - Private',
            date: '2020-07-27T17:55:35.482Z'
        },
        {
            _id: '2',
            title: 'Title 2',
            content: 'Content 2 - Private',
            date: '2020-07-27T17:55:35.482Z'
        },
        {
            _id: '3',
            title: 'Title 3',
            content: 'Content 3 - Private',
            date: '2020-07-27T17:55:35.482Z'
        }
    ]);
});

// Valida el token en cada ruta, si existe un token entra en try, caso contrario en catch
async function verifyToken(req, res, next) {
    try {
        // Si no existe en headers un authorization(como prueba se asigna en el headers de Postman y como value(el token))
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }

        /**
         * Si existe el authorization, comprobar si existe el token
         * Por default "value = Bearer token"
         * Value es un array =  ["Bearer", "token"]
         * Se toma la posicion 1 = [0][1]
         */
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }
        /**
         * Verifica el token que se le esta pasando con el secretKey
         * Contenido del token payload(Carga valida o util)
         */
        const payload = await jwt.verify(token, 'secretKey');

        // console.log(payload); // obtiene el id del user y el iat
        if (!payload) {
            return res.status(401).send('Unauthorized request');;
        }

        // Guarda el id del payload en userId
        req.userId = payload._id;
		next();

    } catch (error) {
        res.status(401).send('Unauthorized request');
    }
}


module.exports = router;