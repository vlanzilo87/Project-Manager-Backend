
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    inProgress: {type: Boolean, default: true},
    description: {type: String},
},
{
timestamp: true
}
)

module.exports = mongoose.model('Blog', blogSchema)
