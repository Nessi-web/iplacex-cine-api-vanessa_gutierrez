import { MongoClient, ServerApiVersion } from "mongodb";

// cadena de conexion
const uri = 'mongodb+srv://eva3_express:XkCnlJP8tBcmS5nH@cluster-express.m8lr0cp.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express';

// cliente mongo
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

// exportar cliente
export default client;