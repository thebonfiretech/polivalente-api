import menuModel from "../../models/menu.js";

export default class menuService {

    async getMenu({}){
        try {
            return await menuModel.findOne();
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async updateMenu({id, data}){
        try {
            const findMenu = await menuModel.findById(id);
            if (!findMenu) return { error: "menu_not_found"}

            const newMenu = await menuModel.findByIdAndUpdate(id, {$set:{ ...data}},{new: true,setDefaultsOnInsert: True});
            return { menu: newMenu }
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
}