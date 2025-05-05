import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});