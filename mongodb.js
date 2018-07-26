const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/cedulas');

// definimos un esquema para las cédulas
const cedulaSchema = mongoose.Schema({
    cedula: { type: Number, unique: true },
    nombres: { type: String },
    apellidoPaterno: { type: String },
    apellidoMaterno: { type: String },
    // nombreCompleto: { type: String },
    fechaNacimiento: { type: String }
});

// Definimos un modelo como una interfaz a la base de datos
const Cedula = mongoose.model('Cedula', cedulaSchema);

// agregamos el docuemnto si no existe previamente
module.exports = datos => new Promise((resolve, reject) => {
    Cedula.findOne({cedula: datos.cedula})
    .then(doc => {
        if (doc) {
            console.log(`= ${datos.cedula}`);
            resolve();
            return;
        } else {
            Cedula.create(datos)
            .then(result => {
                console.log(`+ ${datos.cedula}`);
                resolve();
            })
            .catch(e => { reject(e); return; })
        }
    })
    .catch(e => { reject(e); })
})
