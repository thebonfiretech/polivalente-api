import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    food: {
        type: String,
    },
    fruit: {
        type: String 
    },
    drink:{
        type: String
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('menu', MenuSchema);