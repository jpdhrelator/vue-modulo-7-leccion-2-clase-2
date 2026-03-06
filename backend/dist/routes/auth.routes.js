import { Router } from 'express';
import jwt from 'jsonwebtoken';
const router = Router();
// Endpoint de login (simulado)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Login simple para propósitos educativos
    if (username === 'admin' && password === 'admin123') {
        const payload = {
            username,
            role: 'admin'
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        return res.json({
            message: 'Login exitoso',
            token
        });
    }
    return res.status(401).json({ message: 'Credenciales inválidas (intenta con admin/admin123)' });
});
export default router;
