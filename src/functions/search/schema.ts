export default {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        table: {
          type: 'string',
          enum: ['Customers', 'Products'],
        },
      },
      required: ['q', 'table'],
      additionalProperties: false,
    },
  },
  required: ['queryStringParameters'],
} as const;
