import express from 'express';
import controller from './controller.js';

// enrutador
const ActorRoutes = express.Router();

// rutas
ActorRoutes.post('/actor', controller.handleInsertActorRequest);
ActorRoutes.get('/actores', controller.handleGetActoresRequest);
ActorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest);
ActorRoutes.get('/actor/:pelicula', controller.handleGetActoresByPeliculaIdRequest);

// exportar enrutador
export default ActorRoutes;