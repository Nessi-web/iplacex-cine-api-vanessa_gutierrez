// dependencias
import express from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

// app y puerto
const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ruta raiz
app.get('/', (req, res) => {
    res.send('Bienvenido al cine Iplacex');
});

// rutas api
app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

// iniciar bd y server
client.connect()
    .then(() => {
        console.log('conexion exitosa a atlas');
        app.listen(port, () => {
            console.log(`servidor en puerto ${port}`);
        });
    })
    .catch((err) => {
        console.log('error al conectar', err);
    });