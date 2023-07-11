import { getDatabase} from "firebase/database";
import { initializeApp } from "firebase/app";

import logger from "../utils/logger.js";

export  const connectToDatabase =  () => {

    try {

        const firebaseConfig = {
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            databaseURL: 'https://projeto-bonfire-default-rtdb.firebaseio.com',
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.apiId,
            measurementId: process.env.measurementId
          };
          

          const app = initializeApp(firebaseConfig);
          const database = getDatabase();

         logger.info('successful database connection')
          return ({
            status: "successful connection",
        })

        
    } catch (error){

        return ({
            status: "unsuccessful connection",
            error: error,
        })
    }
}