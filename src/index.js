import app from './app.js';
import { connectDB } from './db.js';

const startServer = async () => {
    await connectDB();
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
};

startServer();
