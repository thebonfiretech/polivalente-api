import { Router } from 'express';
 


export const router = Router();


router.get('/ping', (req,res) => {
    res.sendStatus(200)
});
