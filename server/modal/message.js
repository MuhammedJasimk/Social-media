const mongoose = require ('mongoose')

const messageSchema = new mongoose.Schema({
   
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    },
},{timestamps: true})

const message = mongoose.model('message',messageSchema)
module.exports =message