const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000

const hostMongo = process.env.MONGO_URL || 'localhost'
const portMongo = process.env.MONGO_PORT || '27017'
const dataBaseMongo = process.env.MONGO_DATABASE || '27017'

const urlMongoDb = `mongodb://${hostMongo}:${portMongo}/${dataBaseMongo}`

app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

mongoose.connect(urlMongoDb,
)
    .then(() => {
        app.listen(port, () => {
            console.log('Listening for requests')
        })
    })
    .catch(err => console.log(err))



