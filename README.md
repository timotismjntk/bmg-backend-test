## Getting Started

Follow this steps.

1. Install Redis on your system.
2. Install [postgreSQL](https://www.postgresql.org/) on your system
3. Clone this boilerplate

```bash
$ git clone  https://github.com/timotismjntk/bmg-backend-test.git
```

4. Install dependencies

```bash
$ npm install
or
$ yarn install
```
5. create postgreSQL databases
```bash
$ yarn sequelize db:create
```

6. create migration on databases
```bash
$ yarn sequelize db:migrate
```

7. If U just want test it without docker
you can type
```bash
$ nodemon index.js
```
Now you can test API on server http://localhost:8080/
# -----------------------------------------------------------------------------------------

# Docker
Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``
## Setup

Run `docker-compose build`. It will

* install [nodemon](https://github.com/remy/nodemon) globally in your container
* install all dependencies from the package.json locally
* expose port 3000 to the host
* instruct the container to execute `npm start` on start up.

## Start

Run `docker-compose up` to create and start both `web` and `db` container. The app should then be running on your docker daemon on port 3030 (On OS X you can use `boot2docker ip` to find out the IP address).

You should see a counter on the index page which will be incremented in Redis on every request. See [app/routes/index.js](https://github.com/b00giZm/docker-compose-nodejs-examples/blob/master/02-express-redis-nodemon/app/routes/index.js) to learn how to conect to Redis via [enviroment variables](http://docs.docker.com/compose/env/) exposed to the `web` container.


# API DOCUMENTATION

Request :
- Header :
    - X-Api-Key : "your secret api key"

### Register

- Method : POST
- Endpoint : '/auth/signup'
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "username": "string",
    "password": "string, unique",
    "name": "string",
    "email": "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Login

- Method : POST
- Endpoint : `/auth/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "email": "string, unique",
    "password": "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "token" : "string, unique"
}
```

## Edit User Data

Request :
- Method : POST
- Endpoint : `/user/update`
- Header :
    - Accept: application/json
- Body :

```json 
{
    "username": "string",
    "password": "string, unique",
    "name": "string",
    "email": "string",
}
```

Response :
```json
Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

## Input Refferall code
Request :
- Method : GET
- Endpoint : `/refferal`
- Header :
    - Accept: application/json
- Body :

```json 
{
    "refferall_code": "string",
}
```

Response :
```json
Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

## Search User
Request :
- Method : GET
- Endpoint : `/refferal`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,

Response :
```json
Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "data": [
      {
          "username": "string",
          "password": "string, unique",
          "name": "string",
          "email": "string",
      }
    ]
}
```

## Search Random Single Hero
Request :
- Method : GET
- Endpoint : `/random`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,

Response :
```json
Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "data": {
            "version": "string",
            "id": "string",
            "key": "number",
            "name": "string",
            "title": "string",
            "blurb": "string",
            "info": "array",
            "image": "array",
            "tags": "object",
            "partype": "string",
            "stats": "array"
      }
}
```
