import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
const router = Router();
// Función auxiliar para generar la imagen basada en el id y género
const getPictureUrl = (id, gender) => {
    const type = gender === 'male' ? 'men' : 'women';
    // Usamos el id para el número de la imagen (randomuser.me acepta números de 0 a 99)
    const picId = id % 100;
    return `https://randomuser.me/api/portraits/${type}/${picId}.jpg`;
};
// Mock database
let users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@test.com',
        role: 'admin',
        gender: 'male',
        picture: getPictureUrl(1, 'male'),
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        username: 'user1',
        email: 'user1@test.com',
        role: 'user',
        gender: 'female',
        picture: getPictureUrl(2, 'female'),
        createdAt: new Date().toISOString()
    }
];
// GET: Listar todos
router.get('/', (req, res) => {
    const usersResponse = users.map(({ password, ...user }) => user);
    res.json(usersResponse);
});
// GET: Detalle por ID
router.get('/:id', (req, res) => {
    const idStr = req.params.id;
    const user = users.find(u => u.id === Number.parseInt(idStr));
    if (!user)
        return res.status(404).json({ message: 'Usuario no encontrado' });
    const { password, ...userResponse } = user;
    res.json(userResponse);
});
// POST: Crear (Protegido)
router.post('/', authenticateJWT, (req, res) => {
    const { username, email, role, password, gender } = req.body;
    if (!username || !email || !gender) {
        return res.status(400).json({ message: 'Username, email y gender (male/female) son obligatorios' });
    }
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
        id: nextId,
        username,
        email,
        role: role || 'user',
        gender,
        picture: getPictureUrl(nextId, gender),
        password: password || 'default123',
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    const { password: pw, ...userResponse } = newUser;
    res.status(201).json(userResponse);
});
// PUT: Reemplazo total (Protegido)
router.put('/:id', authenticateJWT, (req, res) => {
    const idStr = req.params.id;
    const userId = Number.parseInt(idStr);
    const index = users.findIndex(u => u.id === userId);
    if (index === -1)
        return res.status(404).json({ message: 'Usuario no encontrado' });
    const { username, email, role, password, gender } = req.body;
    if (!username || !email || !gender) {
        return res.status(400).json({ message: 'Username, email y gender son obligatorios para PUT' });
    }
    users[index] = {
        id: userId,
        username,
        email,
        role: role || 'user',
        gender,
        picture: getPictureUrl(userId, gender),
        password: password || users[index].password,
        createdAt: users[index].createdAt
    };
    const { password: pw, ...userResponse } = users[index];
    res.json(userResponse);
});
// PATCH: Actualización parcial (Protegido)
router.patch('/:id', authenticateJWT, (req, res) => {
    const idStr = req.params.id;
    const userId = Number.parseInt(idStr);
    const index = users.findIndex(u => u.id === userId);
    if (index === -1)
        return res.status(404).json({ message: 'Usuario no encontrado' });
    const updatedData = { ...users[index], ...req.body, id: userId };
    // Si cambió el género, actualizamos la foto automáticamente
    if (req.body.gender && req.body.gender !== users[index].gender) {
        updatedData.picture = getPictureUrl(userId, req.body.gender);
    }
    users[index] = updatedData;
    const { password, ...userResponse } = users[index];
    res.json(userResponse);
});
// DELETE: Eliminar (Protegido)
router.delete('/:id', authenticateJWT, (req, res) => {
    const idStr = req.params.id;
    const userId = Number.parseInt(idStr);
    const initialLength = users.length;
    users = users.filter(u => u.id !== userId);
    if (users.length === initialLength) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
});
export default router;
