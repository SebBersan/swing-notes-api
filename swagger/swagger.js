import swaggerJsdoc from 'swagger-jsdoc';

const options = {
definition: {
    openapi: '3.0.0',
    info: {
    title: 'Swing Notes API',
    version: '1.0.0',
    description: 'API for handling notes with authentication and documentation using Swagger',
    },
    servers: [
    {
        url: 'http://localhost:3000/api',
        description: 'Local development server',
    },
    ],
    components: {
    securitySchemes: {
        bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        },
    },
},
    security: [
    {
        bearerAuth: [],
    },
    ],
},
apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
