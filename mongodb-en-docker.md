# Docker for Linux / Mac

## Persistencia
Para persistir los datos debemos montar un volúmen en nuestro contenedor, con mongodb debemos tomar ciertos recaudos si lo estamos corriendo en Docker for Windows

### Linux / Mac
Creamos un directorio el cual montaremos como volumen

```bash
$ mkdir -p /var/docker-volumes/mongodb/db
```

Usaremos el archivo  `mongodb-linux-mac.yml`
```yaml
version: "3.3"
services:
  mongodb:
    image: mongo:3.7
    container_name: mongodb

    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secr3t

    ports:
      - "27017:27017"

    volumes:
      - /var/docker-volumes/mongodb/db:/data/db

```
Creamos el contenedor
```
$ docker-compose -f mongodb-linux-mac.yml up -d
```

### Docker for Windows
Al tratar de correr MongoDB con datos persistentes en un volúmen se da un error que está bien identificado y discutido en los foros, por lo que usaremos un archivo docker-compose un poco diferente.

`mongodb-win.yml`
```yaml
version: "3.3"
services:
  mongodb:
    image: mongo:3.7
    container_name: mongodb

    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secr3t

    ports:
      - "27017:27017"

    volumes:
      - mongodata:/data/db

volumes:
    mongodata:
```

Creamos el contenedor
```
$ docker-compose -f mongodb-win.yml up -d
```

## Credenciales
Una vez tengamos corriendo nuestro contenedor, pasamos a definir las credenciales que usaremos en este proyecto

Iniciamos un cliente mongo
```bash
$ docker exec -it mongodb mongo localhost:27017 -u admin -p secr3t --authenticationDatabase "admin"
```
Debemos definir las credenciales en la base de datos `admin`
```
> use admin
> db.createUser({ user: 'usuario', pwd: 'secr3t', roles: [{role: "readWrite", db: "cedulas"}]});
```
