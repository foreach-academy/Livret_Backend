import { Router } from 'express';
const router = Router();
import authenticateController from '../controllers/authenticateController.js';
import BruteForceSecurity from '../middleware/BruteForceSecurity.js';

// Limiteur pour la connexion (login)
const loginLimiter = BruteForceSecurity({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de 5 tentatives
    message: 'Trop de tentatives de connexion, veuillez réessayer dans quelques minutes.'
});


router.post('/login', loginLimiter, (req, res) =>  authenticateController.login(req,res));



export default router;