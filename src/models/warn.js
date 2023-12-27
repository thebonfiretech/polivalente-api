import mongoose from "mongoose";

const WarnSchema = new mongoose.Schema({
    author:{
        name: {
            type: String
        },
        id: {
            type: String 
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
    },
    description: {
        type: String
    },
    title:{
        type: String 
    }
});

export default mongoose.model('warn', WarnSchema);