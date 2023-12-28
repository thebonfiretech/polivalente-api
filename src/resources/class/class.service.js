import classModel from "../../models/class.js";

export default class classService {

    async createClass({name, yearly, identifier, shift, description}){
        try {
            const findClass = await classModel.findOne({name});
            if (findClass) return { error: "class_already_exists"};

            var classe = new classModel({
                name, 
                yearly,
                identifier, 
                shift, 
                description
            }, { new: true});

            await classe.save();

            return { class: classe }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async updateClass({id, data}){
        try {
            const findClass = await classModel.findById(id);
            if (!findClass) return { error: "class_not_found"};

            const newClass = await classModel.findByIdAndUpdate(id, {$set: {...data}}, {new: true, upsert: true});
            return { class: newClass }

        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getClass({id}){
        try {
            const findClass = await classModel.findById(id);
            if (!findClass) return { error: "class_not_found"};
            return { class: findClass}
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getAllClasses({}){
        try {
            return await classModel.find().sort({date: -1});
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async deleteClass({id}){
        try {
            const findClass = await classModel.findById(id);
            if (!findClass) return { error: "class_not_found"};
            await classModel.findByIdAndDelete(id);
            return {}
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }

}