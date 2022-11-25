# Express Server with GraphQL

## Pre-requisits
To run server correctly you need to run a docker image from MongoDB.
The instructions to use docker is [here](https://docs.docker.com/engine/install/). 
You can run the following commands to pull and run docker image from docker oficial image.

```
    docker pull mongo:lastest
    docker run -d -p 27017:27017 --name test-mongo mongo:latest

```

## How to use?

```
    node run start
```

## Installation and configuration
```
    git clone git@github.com:alancruzblancas/graphql-express.git
    npm install
```

### Trouble shoottings
If you have problems with dependencies run following command
```
    npm install --force
```