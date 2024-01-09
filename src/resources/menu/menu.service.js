import menuModel from "../../models/menu.js";

export default class menuService {
  async getMenu({}) {
    try {
      return await menuModel.findOne();
    } catch (err) {
      return { error: "internal_error" };
    }
  }
  async updateMenu({ food, drink, fruit }) {
    try {
      const findMenu = await menuModel.findOne();
      if (!findMenu) {
        let newMenu = new menuModel({
          food,
          drink,
          fruit,
          lastUpdate: Date.now(),
        });

        newMenu = await newMenu.save();
        return { menu: newMenu };
      }
      var newMenu = await menuModel.findOneAndUpdate(
        {
          $set: {
            food,
            drink,
            fruit,
            lastUpdate: Date.now(),
          },
        },
        { new: true, setDefaultsOnInsert: true }
      );
      return { menu: newMenu };
    } catch (err) {
        console.log(err)
      return { error: "internal_error" };
    }
  }
}
