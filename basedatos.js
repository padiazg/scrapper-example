const mongoose = require("mongoose");
const {initialize, add, disconnect} = require("./mongodb");
const getCedula = require("./get-cedula");

const rango = {
  inicio: 1000,
  fin: 1010
};

// creamos una conexión a la base de datos
initialize('mongodb://localhost:27017/cedulas?authSource=admin', {
  useNewUrlParser: true,
  user: 'usuario',
  pass: 'secr3t',
  dbName: 'cedulas',
})
.then(async () => {
  try {
    for (let i = rango.inicio; i <= rango.fin; i++) {
      // getCedula nos retorna un JSON plano, lo convertimos con parse,
      // recuperamos presente y resultado por destructuracion
      const { presente, resultado } = JSON.parse(await getCedula(i));
      if (presente) {
        // eliminamos algunos datos redundantes o irrelevantes
        delete resultado["id"];
        delete resultado["nombreCompleto"];

        // agregamos los datos a la colección
        await add(resultado);
      } else {
        console.log(`${i} no registrada`);
      }
    } // for ...
    disconnect()
    .then(() => console.log("Desconectado"))
    .catch(e => console.log("Error al desconectar:", e))
  } catch (e) {
    console.log("error =>", e);
  }
})
.catch(e => {
  console.log("No conectado");
})
;
