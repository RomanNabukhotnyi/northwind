import 'reflect-metadata';
import middyfy from '../../libs/lambda';
import { CustomerRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getCustomers = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const customers = await CustomerRepository
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
    .getRawMany();
  return customers;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getCustomers);
