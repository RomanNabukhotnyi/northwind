import 'reflect-metadata';
import type { Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import schema from './schema';
import middyfy from '../../libs/lambda';
import { CustomerRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getCustomer: Handler<FromSchema<typeof schema>> = async (event) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const { Id } = event.queryStringParameters;
  const customer = await CustomerRepository
    .createQueryBuilder('Customers')
    .select('Customers.CustomerID', 'Id')
    .addSelect('Customers.CompanyName', 'CompanyName')
    .addSelect('Customers.ContactName', 'ContactName')
    .addSelect('Customers.ContactTitle', 'ContactTitle')
    .addSelect('Customers.Address', 'Address')
    .addSelect('Customers.City', 'City')
    .addSelect('Customers.Region', 'Region')
    .addSelect('Customers.PostalCode', 'PostalCode')
    .addSelect('Customers.Country', 'Country')
    .addSelect('Customers.Phone', 'Phone')
    .addSelect('Customers.Fax', 'Fax')
    .where('Customers.CustomerID = :Id', { Id })
    .getRawOne();
  return customer;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getCustomer, schema);
