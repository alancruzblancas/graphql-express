const mongoose = require('mongoose')

const MSchema = mongoose.Schema

const hobbySchema = new MSchema({
    //id: String,
    title: String,
    description: String,
    userId: String

})

module.exports = mongoose.model('Hobby', hobbySchema)