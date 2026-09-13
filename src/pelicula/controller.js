import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { Pelicula } from './pelicula.js';

// coleccion de base de datos
const peliculaCollection = client.db('cine-db').collection('peliculas');

// insertar pelicula
async function handleInsertPeliculaRequest(req, res) {
    let data = req.body;
    let pelicula = {
        nombre: data.nombre,
        generos: data.generos,
        anioEstreno: data.anioEstreno
    };
    
    await peliculaCollection.insertOne(pelicula)
        .then((data) => {
            if (data === null) return res.status(400).send('error al guardar pelicula');
            return res.status(201).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

// obtener todas las peliculas
async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find().toArray()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

// obtener pelicula por id
async function handleGetPeliculaByIdRequest(req, res) {
    let id = req.params.id;
    
    try {
        let oid = ObjectId.createFromHexString(id);
        
        await peliculaCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) return res.status(404).send('pelicula no encontrada');
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (error) {
        return res.status(400).send('id mal formado');
    }
}

// actualizar pelicula por id
async function handleUpdatePeliculaByIdRequest(req, res) {
    let id = req.params.id;
    let pelicula = req.body;
    
    try {
        let oid = ObjectId.createFromHexString(id);
        let query = { $set: pelicula };
        
        await peliculaCollection.updateOne({ _id: oid }, query)
            .then((data) => {
                if (data === null || data.modifiedCount === 0) return res.status(404).send('no encontrada o no actualizada');
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (error) {
        return res.status(400).send('id mal formado');
    }
}

// eliminar pelicula por id
async function handleDeletePeliculaByIdRequest(req, res) {
    let id = req.params.id;
    
    try {
        let oid = ObjectId.createFromHexString(id);
        
        await peliculaCollection.deleteOne({ _id: oid })
            .then((data) => {
                if (data === null || data.deletedCount === 0) return res.status(404).send('no encontrada o no eliminada');
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (error) {
        return res.status(400).send('id mal formado');
    }
}

// exportar metodos
export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
};