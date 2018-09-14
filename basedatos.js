const mongoose = require("mongoose");
const addCedula = require("./mongodb");
const getCedula = require("./get-cedula");

const rango = {
    inicio: 1000,
    fin: 1500
};

// debemos crear una función async para usar await
const main = async () => {
    for (let i = rango.inicio; i <= rango.fin; i++) {
        try {
            const { presente, resultado } = JSON.parse(await getCedula(i));
            if (presente) {
                // eliminamos algunos datos redundantes o irrelevantes
                delete resultado["id"];
                delete resultado["nombreCompleto"];

                // agregamos los datos a la colección
                await addCedula(resultado);
            } else {
                console.log(`${i} no registrada`);
            }
        } catch (e) {
            console.log("error =>", e);
        } // try ... catch ...
    } // for ...

    mongoose.disconnect(() => {
        console.log('Conexión a la base de datos cerrada');
    })
}; // main ...

main();
