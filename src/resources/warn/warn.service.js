import warnModel from "../../models/warn.js";

export default class WarnService {

    async createWarn({author, flags, description, title}){
        try {
            const warn = new warnModel({
                author, flags, description, title
            }, {new: true}) 
            await warn.save();
            return { warn }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async updateWarn({id, data}){
        try {
            const findWarn = await warnModel.findById(id);
            if (!findWarn) return { error: "warn_not_found"};

            const newWarn = await warnModel.findByIdAndUpdate(id, {$set: {...data}}, {new: true, upsert: true});
            return { warn: newWarn }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async deleteWarn({id}){
        try {   
            const findWarn = await warnModel.findById(id);
            if (!findWarn) return { error: "warn_not_found"};

            await warnModel.findByIdAndDelete(id);
            return {}
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getWarn({id}){
        try {
            const findWarn = await warnModel.findById(id);
            if (!findWarn) return { error: "warn_not_found"};

            return { warn: findWarn }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getAllWarns({}){
        try {
            return await warnModel.find().sort({date: -1})
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }

}