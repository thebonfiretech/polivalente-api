import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    name:{
        type: String
    },
    yearly: {
        type: Number
    },
    identifier:{
        type: String 
    },
    shift: {
        type: String
    },
    description: {
        type: String
    },
    teachers:{
        type: Object
    },
    students:{
        type: Object

    },
    schedule:{
        type: Object,

    }
})

export default mongoose.model('class', ClassSchema);