import sacModel from "../../models/sac.js";

export default class sacService {

    async createSac({author, type, description}){
        try {
            const sac = new sacModel({
                author, type, description
            })
            await sac.save();
            return { sac }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getSac({id}){
        try {
            const findSac = await sacModel.findById(id);
            console.log(id, findSac)
            if (!findSac) return { error: "sac_not_found"}
            return { sac: findSac }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getAllSac({}){
        try {
             return await sacModel.find().sort({date:-1});
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }

}