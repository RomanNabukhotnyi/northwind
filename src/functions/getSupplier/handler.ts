import 'reflect-metadata';
import type { Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import middyfy from '../../libs/lambda';
import { SupplierRepository } from '../../db/repositories';
import dataSource from '../../db/db';
import schema from './schema';

const getSupplier: Handler<FromSchema<typeof schema>> = async (event) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const { Id } = event.queryStringParameters;
  const supplier = await SupplierRepository
    .createQueryBuilder('Suppliers')
    .select('Suppliers.SupplierID', 'Id')
    .addSelect('Suppliers.CompanyName', 'CompanyName')
    .addSelect('Suppliers.ContactName', 'ContactName')
    .addSelect('Suppliers.ContactTitle', 'ContactTitle')
    .addSelect('Suppliers.Address', 'Address')
    .addSelect('Suppliers.City', 'City')
    .addSelect('Suppliers.Region', 'Region')
    .addSelect('Suppliers.PostalCode', 'PostalCode')
    .addSelect('Suppliers.Country', 'Country')
    .addSelect('Suppliers.Phone', 'Phone')
    .addSelect('Suppliers.Fax', 'Fax')
    .addSelect('Suppliers.HomePage', 'HomePage')
    .where('Suppliers.SupplierID = :Id', { Id })
    .getRawOne();
  return supplier;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getSupplier, schema);
