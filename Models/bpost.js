const mongoose = require('mongoose')

const postschema = mongoose.Schema(
    {
        department: {type: String, required:true},
        location: {type: String, required:true},
        complaint: {type: String, required:true}
    }
)

module.exports = mongoose.model('Posts', postschema)
