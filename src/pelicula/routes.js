import express from 'express';
import controller from './controller.js';

// enrutador
const peliculaRoutes = express.Router();

// rutas
peliculaRoutes.post('/pelicula', controller.handleInsertPeliculaRequest);
peliculaRoutes.get('/peliculas', controller.handleGetPeliculasRequest);
peliculaRoutes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest);
peliculaRoutes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/pelicula/:id', controller.handleDeletePeliculaByIdRequest);

// exportar enrutador
export default peliculaRoutes;