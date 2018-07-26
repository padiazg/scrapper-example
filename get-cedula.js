const rp = require("request-promise-native");

module.exports = cedula => rp({
    uri: "https://servicios.set.gov.py/eset-publico/ciudadano/recuperar",
    qs: { cedula }
});
