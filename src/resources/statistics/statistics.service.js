import { get, getDatabase, ref, update, set, remove } from "firebase/database";

import sendError from "../../utils/error.js";

export default class StatisticsService {

    async avaliation(userId, avaliation ,res){
        const database = getDatabase();
        var amount = await get(ref(database, `statistics/avaliation/amount`)).then(
          (x) => x.val()
        );
        if (!amount) amount = 0;
        const reference = ref(database, `statistics/avaliation/` + (amount+1));
        await update(reference, { 
            stars: avaliation.stars,
            observation: avaliation.observation?avaliation.observation: null,
            authorId: userId, 
            matery: avaliation.matery,
            teacher: avaliation.teacher,
            id: (amount+1)
         });
         await update(ref(database, `statistics/avaliation`), {amount: (amount+1)})
    
        return {
          id: (amount+1),
        };

    }


    async chat(userId, chat, res){
        const database = getDatabase();
        var amount = await get(ref(database, `statistics/chat/amount`)).then(
          (x) => x.val()
        );
        if (!amount) amount = 0;
        const reference = ref(database, `statistics/chat/` + (amount+1));
        await update(reference, { 
            type: chat.type,
            title: chat.title,
            description: chat.description,
            authorId: userId, 
            id: (amount+1)
         });
 

         await update(ref(database, `statistics/chat`), {amount: (amount+1)})
    
        return {
          id: (amount+1),
        };

    }


}