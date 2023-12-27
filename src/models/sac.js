import mongoose from "mongoose";

const SacSchema = new mongoose.Schema({
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
    }
});

export default mongoose.model('sac', SacSchema);