import { ObjectId } from 'mongodb';

// definicion del esquema
export const Pelicula = {
    _id: ObjectId,
    nombre: String,
    generos: Array,
    anioEstreno: Number
};