const program = require("commander");
const getCedula = require('./get-cedula');

program
    .version("1.0.0")
    .option("-c --cedula <ci>", "Cédula a consultar")
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}

if (program.cedula) {
    getCedula(Number(program.cedula))
        .then(data => console.log(data))
        .catch(e => console.error(e));
}
