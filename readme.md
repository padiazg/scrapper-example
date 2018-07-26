# Ejemplo de scrapper con Node.js
Nos valemos de un endpoint descubierto por la comunidad para realizar algunas consultas.

# ADVERTENCIA
Este código es con fines didácticos, no tiene otra finalidad mas que enseñar diferentes aspectos de programación con un ejemplo préctico.

# Puntos de interes
Todos los ejemplos se basan en un módulo (```get-cedula```) el cual define una función que retorna una promesa.

Las versiones ```simple.js``` y ```rango.js``` muestran como utilizar [commander.js](https://github.com/tj/commander.js/) para crear una interfaz de linea de comandos.

Los ejemplos ```rango.js``` y ```basedato.js``` muestran como manejar asincronía con JS.

En ```basedatos.js``` usamos un módulo llamado ```mongodb``` para instanciar una conexión a una base de datos MongoDB, definimos una colección y el esquema de un documento para guardar los datos recuperados.

> En [mongodb-docker.md](mongodb-docker.md) hay instrucciones para correr un servidor en Docker.

## Simple
Realiza una sola consulta, despliega resultados en consola.
```bash
$ node simple.js

  Usage: simple [options]

  Options:

    -V, --version     output the version number
    -c --cedula <ci>  Cédula a consultar
    -h, --help        output usage information
```
Ejemplo

```bash
$ node simple.js -c 1001
$ node simple.js --cedula 1002
```

## Rango
Consulta un rango de números, despliega resultados en consola.
```bash
$ node rango.js

  Usage: rango [options]

  Options:

    -V, --version         output the version number
    -i --inicio <inicio>  Número inicial
    -f --fin <fin>        Número final
    -h, --help            output usage information
```
Ejemplo

```bash
$ node rango.js -i 1001 -f 1002
$ node simple --inicio 1001 --fin 1002
```

## Basedatos
Este ejemplo es mas complejo, realiza prácticamente lo mismo que el ejemplo anterios, pero guarda los datos recuperados en una colección de un serdidor MongoDB.   
No lo diseñé para recibir parámetros, sino que los valores para el rango de la consulta debemos especificarlos directamente en el código.
```javascript
const rango = {
    inicio: 1000,
    fin: 1500
};
```
Para correr la consulta
```bash
node basedatos.js
```
