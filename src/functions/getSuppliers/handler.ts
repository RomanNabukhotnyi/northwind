import 'reflect-metadata';
import middyfy from '../../libs/lambda';
import { SupplierRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getSuppliers = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const suppliers = await SupplierRepository
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
    .getRawMany();
  return suppliers;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getSuppliers);
