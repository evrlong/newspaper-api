import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Newspaper API',
      version: '1.0.0',
      description: 'REST API documentation for auth and articles'
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'test@example.com' },
            password: { type: 'string', example: 'Passord123' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'test@example.com' },
            password: { type: 'string', example: 'Passord123' }
          }
        },
        SafeUser: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', format: 'email', example: 'test@example.com' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/SafeUser' }
          }
        },
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'My first article' },
            body: { type: 'string', example: 'Article body text' },
            category: { type: 'string', nullable: true, example: 'Tech' },
            submitted_by: { type: 'integer', example: 1 },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        ArticleCreateRequest: {
          type: 'object',
          required: ['title', 'body'],
          properties: {
            title: { type: 'string', example: 'My first article' },
            body: { type: 'string', example: 'Article body text' },
            category: { type: 'string', example: 'Tech' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Invalid or expired token' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };