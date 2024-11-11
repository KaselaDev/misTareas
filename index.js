const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors');
const api = express();
require('dotenv').config();

api.use(cors());

api.use(express.json());

// api.use(session({
//     secret: 'mi_secreto',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
//   }));

// // Ejemplo: ruta para establecer una sesión
// api.get('/login', (req, res) => {
//   req.session.username = 'usuarioEjemplo';
//   res.send('Sesión iniciada');
// });

// // Ejemplo: ruta para acceder a la sesión
// api.get('/dashboard', (req, res) => {
//   if (req.session.username) {
//     res.send(`Bienvenido, ${req.session.username}`);
//   } else {
//     res.send('No has iniciado sesión');
//   }
// });

const idUsuario = 2;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if (error) {
        console.error('Error al conectar:', error);
        process.exit(1);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
}); 

api.get('/', (req, res) => {
    res.status(200).json({ "message": "¡Conexión exitosa!" });
});

api.get('/getTareasByID', (req, res) => {
    db.query('CALL `getTareasByID`(?)', [idUsuario], (err, resultados) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "message": err.message });
            return;
        }
        res.json(resultados[0])
    });
});

api.put('/toggleStar', (req, res) => {
    const {idStar} = req.body
    db.query('CALL`toggleStar`(?)', [idStar], (err, resultados) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "message": err.message });
            return;
        }
        res.json('se modifico correctamente')
    })
})

api.put('/updateTask', (req, res) => {
    const {content, idTarea} = req.body
    
    db.query('CALL`updateTask`(?,?)', [idTarea,content], (err, resultados) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "message": err.message });
            return;
        }
        res.json('se modifico correctamente')
    })
})

api.delete('/deleteTask/:idTarea', (req, res) => {
    const { idTarea } = req.params;
    
    db.query('CALL deleteTask(?)', [idTarea], (err, resultados) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "message": err.message });
            return;
        }
        res.json('La tarea se eliminó correctamente');
    });
});

api.post('/setTask', (req, res) => {
    const { titulo, contenido } = req.body;
    
    db.query('CALL setTask(?,?)', [titulo, contenido], (err, resultados) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "message": err.message });
            return;
        }
        res.json('La tarea se eliminó correctamente');
    });
});

const PORT = 3000;
api.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
