const mongoose = require("mongoose");

let connected = false;
let connection;
let Cedula;

const initialize = (uri, options) =>
  new Promise((resolve, reject) => {
    connection = mongoose
      .connect(uri, options)
      .then(() => {
        connected = true;
        console.log("Conectado");

        // definimos un esquema para las cédulas
        const cedulaSchema = mongoose.Schema({
          cedula: { type: Number, unique: true },
          nombres: { type: String },
          apellidoPaterno: { type: String },
          apellidoMaterno: { type: String },
          fechaNacimiento: { type: String }
        });

        // Definimos un modelo como una interfaz a la base de datos
        Cedula = mongoose.model("Cedula", cedulaSchema);

        return resolve();
      })
      .catch(e => {
        console.log("Cedula/error =>", e);
        return reject(e);
      });
  });

const add = datos => new Promise((resolve, reject) => {
  Cedula.findOne({ cedula: datos.cedula })
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
          .catch(e => {
            reject(e);
            return;
          });
      }
    })
    .catch(e => {
      reject(e);
    });
}); // Promise ...

const disconnect = () => mongoose.disconnect()

module.exports = {
  initialize,
  add,
  disconnect
}
