import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import itemRoutes from './routes/item.routes.js';
import userRoutes from './routes/user.routes.js';
// Cargar variables de entorno
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
// Rutas base para prueba
app.get('/', (req, res) => {
    res.json({
        name: 'Backend Educativo Node.js',
        version: '1.0.0',
        message: 'Servidor funcionando correctamente. Usa /api/login para obtener un token.'
    });
});
// Rutas de la API
app.use('/api', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
