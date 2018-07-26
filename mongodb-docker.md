## Instanciar una base de datos MongoDB con Docker
Primero creamos un directorio para montar como volumen, a modeo de tener persistencia con los datos de la base de datos.

```bash
mkdir -p /var/docker-volumes/mongodb/db
```

### docker-compose-mongodb.yml
```yaml
version: "3.3"
services:
  mongodb:
    image: mongo:3.6
    container_name: mongodb

    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secr3t

    ports:
      - "27017:27017"

    volumes:
      - /var/docker-volumes/mongodb/db:/data/db

```
## Creamos y corremos el contenedor
```
docker-compose -f docker-compose-mongodb.yml up -d
```
