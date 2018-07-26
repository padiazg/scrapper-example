const program = require("commander");
const getCedula = require('./get-cedula');

program
    .version("1.0.0")
    .option("-i --inicio <inicio>", "Número inicial")
    .option("-f --fin <fin>", "Número final")
    .parse(process.argv);

if (!program.inicio || !program.fin) {
    program.outputHelp();
    process.exit(1);
}

const rango = {
    inicio: 0,
    fin: 0
}

try {
    rango.inicio = Number(program.inicio);
    rango.fin = Number(program.fin);
} catch(e) {
    console.log('Error en tipo de parámetros\nAsegúrese de pasar solo números válidos.');
    console.log(e);
    process.exit(2);
}

const main = async () => {
    for (let i = rango.inicio; i <= rango.fin; i++ ) {
        try {
            const dato = JSON.parse(await getCedula(i));
            if (dato.presente) {
                console.log(dato.resultado);
            } else {
                console.log(`${i} no registrada`);
            }
        } catch(e) { console.log('error =>', e); }
    }
}

main();
