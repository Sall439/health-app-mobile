const mongoose = require("mongoose")

const specialtySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    desc: {
        type:String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Specialty", specialtySchema)