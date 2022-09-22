import type { Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { Like } from 'typeorm';
import middyfy from '../../libs/lambda';
import dataSource from '../../db/db';
import schema from './schema';
import { ProductRepository, CustomerRepository } from '../../db/repositories';

const search: Handler<FromSchema<typeof schema>> = async (event) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const { q, table } = event.queryStringParameters;
  if (table === 'Products') {
    const products = await ProductRepository.findBy({
      ProductName: Like(`%${q}%`),
    });
    return products;
  }
  const customers = await CustomerRepository.find({
    where: [
      {
        CompanyName: Like(`%${q}%`),
      },
      {
        ContactName: Like(`%${q}%`),
      },
      {
        ContactTitle: Like(`%${q}%`),
      },
      {
        Address: Like(`%${q}%`),
      },
    ],
  });
  return customers;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(search, schema);
