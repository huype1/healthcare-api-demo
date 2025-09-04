import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Health Care API',
      version: '1.0.0',
      description: 'API for managing patients, facilities, facility groups, users (doctors/nurses), and appointments',
      contact: {
        name: 'API Support',
        email: 'support@healthcare.com'
      }
    },
    servers: [
      { 
        url: 'https://healthcare-api-demo-3954ebc70eae.herokuapp.com',
        description: 'Test Api server'
      }
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            status: {
              type: 'integer',
              description: 'HTTP status code'
            }
          }
        }
      }
    }
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'src/models/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;



