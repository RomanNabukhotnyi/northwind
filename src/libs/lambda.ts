import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import validator from '@middy/validator';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';

const middleware = (): middy.MiddlewareObj<
APIGatewayProxyEvent,
APIGatewayProxyResult
> => {
  const after: middy.MiddlewareFn<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
  > = async (request): Promise<void> => {
    request.response = {
      statusCode: 200,
      body: JSON.stringify(request.response),
    };
  };
  return {
    after,
  };
};

export default (handler: Handler, schema?: object) => {
  if (schema) {
    return middy(handler)
      .use(httpErrorHandler())
      .use(cors())
      .use(middleware())
      .use(validator({
        inputSchema: schema,
      } as const));
  }
  return middy(handler)
    .use(httpErrorHandler())
    .use(cors())
    .use(middleware());
};
