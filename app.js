const express = require('express')
//const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./server/schema/schema')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 4000

app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

mongoose.connect('mongodb://localhost:27017/GraphqlClusterDB',
)
    .then(() => {
        app.listen(port, () => {
            console.log('Listening for requests')
        })
    })
    .catch(err => console.log(err))



