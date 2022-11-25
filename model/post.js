const mongoose = require('mongoose')

const MSchema = mongoose.Schema

const postSchema = new MSchema({
    //id: String,
    comment: String,
    userId: String
})

module.exports = mongoose.model('Post', postSchema)