export default {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        Id: {
          type: 'string',
        },
      },
      required: ['Id'],
      additionalProperties: false,
    },
  },
  required: ['queryStringParameters'],
} as const;
