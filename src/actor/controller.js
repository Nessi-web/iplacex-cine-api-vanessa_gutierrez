import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { Actor } from './actor.js';

// colecciones
const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

// insertar actor
async function handleInsertActorRequest(req, res) {
    let data = req.body;
    
    try {
        // validacion de pelicula
        let pelicula = await peliculaCollection.findOne({ nombre: data.idPelicula });
        
        if (!pelicula) {
            try {
                let oid = ObjectId.createFromHexString(data.idPelicula);
                pelicula = await peliculaCollection.findOne({ _id: oid });
            } catch (err) {}
        }

        if (!pelicula) return res.status(400).send('pelicula no existe');

        let actor = {
            idPelicula: data.idPelicula,
            nombre: data.nombre,
            edad: data.edad,
            estaRetirado: data.estaRetirado,
            premios: data.premios
        };

        await actorCollection.insertOne(actor)
            .then((result) => {
                if (result === null) return res.status(400).send('error al guardar actor');
                return res.status(201).send(result);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

// obtener todos los actores
async function handleGetActoresRequest(req, res) {
    await actorCollection.find().toArray()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

// obtener actor por id
async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);
        await actorCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) return res.status(404).send('actor no encontrado');
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (error) {
        return res.status(400).send('id mal formado');
    }
}

// obtener actores por id de pelicula
async function handleGetActoresByPeliculaIdRequest(req, res) {
    let idPelicula = req.params.pelicula;
    await actorCollection.find({ idPelicula: idPelicula }).toArray()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

// exportar metodos
export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};